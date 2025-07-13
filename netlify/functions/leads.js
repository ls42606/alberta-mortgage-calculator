const fs = require('fs').promises;
const path = require('path');

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
      const lead = JSON.parse(event.body);
      
      // Validate required fields
      if (!lead.name || !lead.email || !lead.phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: name, email, and phone are required'
          }),
        };
      }

      // Add server-side metadata
      lead.serverTimestamp = new Date().toISOString();
      lead.ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';

      const savedLead = await saveLead(lead);
      
      return {
        statusCode: 201,
        headers,
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