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

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const lead = req.body;
      
      // Validate required fields
      if (!lead.name || !lead.email || !lead.phone) {
        return res.status(400).json({
          error: 'Missing required fields: name, email, and phone are required'
        });
      }

      // Add server-side metadata
      lead.serverTimestamp = new Date().toISOString();
      lead.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      const savedLead = await saveLead(lead);
      
      res.status(201).json({
        success: true,
        message: 'Lead saved successfully',
        leadId: savedLead.id
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to save lead'
      });
    }
  } else if (req.method === 'GET') {
    try {
      const leads = await getLeads();
      res.status(200).json({
        success: true,
        leads: leads,
        count: leads.length
      });
    } catch (error) {
      console.error('Error retrieving leads:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Failed to retrieve leads'
      });
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    });
  }
};