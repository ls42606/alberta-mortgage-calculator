const fs = require('fs').promises;
const path = require('path');

// Input validation and sanitization utilities
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  // Accept various phone formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
  const phoneRegex = /^[\+]?[1-9]?[\d\s\-\(\)\.]{10,15}$/;
  return phoneRegex.test(phone);
}

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  
  // Remove potential script tags and dangerous characters
  return str
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>&"']/g, function(match) {
      const escape = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return escape[match];
    })
    .trim()
    .substring(0, 500); // Limit length
}

function validateAndSanitizeLead(lead) {
  const errors = [];
  
  // Check if lead is an object
  if (!lead || typeof lead !== 'object') {
    errors.push('Invalid lead data format');
    return { isValid: false, errors, sanitizedLead: null };
  }
  
  // Validate and sanitize required fields
  const name = sanitizeString(lead.name);
  const email = sanitizeString(lead.email);
  const phone = sanitizeString(lead.phone);
  
  // Required field validation
  if (!name || name.length < 2) {
    errors.push('Name is required and must be at least 2 characters long');
  }
  
  if (!email) {
    errors.push('Email is required');
  } else if (!validateEmail(email)) {
    errors.push('Invalid email format');
  }
  
  if (!phone) {
    errors.push('Phone number is required');
  } else if (!validatePhone(phone)) {
    errors.push('Invalid phone number format');
  }
  
  // Validate optional fields and sanitize
  const sanitizedLead = {
    name,
    email: email.toLowerCase(),
    phone,
    message: lead.message ? sanitizeString(lead.message) : '',
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
  };
  
  // Validate optional numeric fields
  if (lead.loanAmount !== undefined) {
    const loanAmount = parseFloat(lead.loanAmount);
    if (isNaN(loanAmount) || loanAmount < 0 || loanAmount > 10000000) {
      errors.push('Loan amount must be a valid number between 0 and 10,000,000');
    } else {
      sanitizedLead.loanAmount = loanAmount;
    }
  }
  
  if (lead.downPayment !== undefined) {
    const downPayment = parseFloat(lead.downPayment);
    if (isNaN(downPayment) || downPayment < 0 || downPayment > 10000000) {
      errors.push('Down payment must be a valid number between 0 and 10,000,000');
    } else {
      sanitizedLead.downPayment = downPayment;
    }
  }
  
  if (lead.interestRate !== undefined) {
    const interestRate = parseFloat(lead.interestRate);
    if (isNaN(interestRate) || interestRate < 0 || interestRate > 50) {
      errors.push('Interest rate must be a valid number between 0 and 50');
    } else {
      sanitizedLead.interestRate = interestRate;
    }
  }
  
  if (lead.amortization !== undefined) {
    const amortization = parseInt(lead.amortization);
    if (isNaN(amortization) || amortization < 1 || amortization > 50) {
      errors.push('Amortization must be a valid number between 1 and 50 years');
    } else {
      sanitizedLead.amortization = amortization;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedLead: errors.length === 0 ? sanitizedLead : null
  };
}

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 10; // Max requests per window

function checkRateLimit(ip) {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || { count: 0, firstRequest: now };
  
  // Reset if window has passed
  if (now - clientData.firstRequest > RATE_LIMIT_WINDOW) {
    clientData.count = 0;
    clientData.firstRequest = now;
  }
  
  clientData.count++;
  rateLimitMap.set(ip, clientData);
  
  return {
    allowed: clientData.count <= RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - clientData.count),
    resetTime: clientData.firstRequest + RATE_LIMIT_WINDOW
  };
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'leads.json');

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

async function ensureLeadsFile() {
  try {
    await fs.access(leadsFile);
  } catch {
    await fs.writeFile(leadsFile, JSON.stringify([], null, 2));
  }
}

async function getLeads() {
  await ensureDataDir();
  await ensureLeadsFile();
  const data = await fs.readFile(leadsFile, 'utf8');
  return JSON.parse(data);
}

async function saveLead(lead) {
  const leads = await getLeads();
  leads.push(lead);
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
  return lead;
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      // Get client IP for rate limiting
      const clientIp = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
      
      // Check rate limit
      const rateLimitResult = checkRateLimit(clientIp);
      if (!rateLimitResult.allowed) {
        return {
          statusCode: 429,
          headers: {
            ...headers,
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
          },
          body: JSON.stringify({
            error: 'Rate limit exceeded',
            message: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
          }),
        };
      }

      // Parse and validate request body
      let lead;
      try {
        lead = JSON.parse(event.body);
      } catch (parseError) {
        return {
          statusCode: 400,
          headers: {
            ...headers,
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
          },
          body: JSON.stringify({
            error: 'Invalid JSON format in request body'
          }),
        };
      }
      
      // Validate and sanitize input
      const validation = validateAndSanitizeLead(lead);
      if (!validation.isValid) {
        return {
          statusCode: 400,
          headers: {
            ...headers,
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
          },
          body: JSON.stringify({
            error: 'Validation failed',
            details: validation.errors
          }),
        };
      }

      // Add server-side metadata
      validation.sanitizedLead.serverTimestamp = new Date().toISOString();
      validation.sanitizedLead.ip = clientIp;

      const savedLead = await saveLead(validation.sanitizedLead);
      
      return {
        statusCode: 201,
        headers: {
          ...headers,
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString()
        },
        body: JSON.stringify({
          success: true,
          message: 'Lead saved successfully',
          leadId: savedLead.id
        }),
      };
    } catch (error) {
      console.error('Error saving lead:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Internal server error',
          message: 'Failed to save lead'
        }),
      };
    }
  } else if (event.httpMethod === 'GET') {
    try {
      const leads = await getLeads();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          leads: leads,
          count: leads.length
        }),
      };
    } catch (error) {
      console.error('Error retrieving leads:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Internal server error',
          message: 'Failed to retrieve leads'
        }),
      };
    }
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed'
      }),
    };
  }
};