import React, { useState, useEffect } from 'react';
import { AnalyticsService } from '../../services/analyticsService';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyValue: number;
  downPayment: number;
  income: number;
  creditScore: number;
  employmentType: string;
  propertyType: string;
  location: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'unqualified' | 'closed';
  createdAt: Date;
  notes: string[];
}

interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgLeadValue: number;
  topSources: Array<{ source: string; count: number }>;
  monthlyTrend: Array<{ month: string; leads: number }>;
}

export const LeadDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'value'>('score');

  const analyticsService = AnalyticsService.getInstance();

  useEffect(() => {
    loadLeads();
    loadMetrics();
  }, []);

  const loadLeads = async () => {
    // Simulated lead data - would come from your database
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '403-555-0123',
        propertyValue: 450000,
        downPayment: 90000,
        income: 85000,
        creditScore: 720,
        employmentType: 'Full-time',
        propertyType: 'Single Family',
        location: 'Calgary, AB',
        source: 'Google Search',
        score: 92,
        status: 'new',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        notes: []
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@email.com',
        phone: '780-555-0456',
        propertyValue: 320000,
        downPayment: 64000,
        income: 65000,
        creditScore: 680,
        employmentType: 'Self-employed',
        propertyType: 'Condo',
        location: 'Edmonton, AB',
        source: 'Facebook Ad',
        score: 76,
        status: 'contacted',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        notes: ['Called 2pm - interested in pre-approval']
      },
      {
        id: '3',
        name: 'Jennifer Liu',
        email: 'jen.liu@email.com',
        phone: '403-555-0789',
        propertyValue: 580000,
        downPayment: 116000,
        income: 120000,
        creditScore: 750,
        employmentType: 'Professional',
        propertyType: 'Single Family',
        location: 'Calgary, AB',
        source: 'Blog Article',
        score: 95,
        status: 'qualified',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        notes: ['High income, excellent credit', 'Looking to close in 30 days']
      }
    ];
    setLeads(mockLeads);
  };

  const loadMetrics = async () => {
    const mockMetrics: LeadMetrics = {
      totalLeads: 47,
      newLeads: 8,
      qualifiedLeads: 12,
      conversionRate: 25.5,
      avgLeadValue: 425000,
      topSources: [
        { source: 'Google Search', count: 18 },
        { source: 'Facebook Ad', count: 12 },
        { source: 'Blog Article', count: 9 },
        { source: 'Direct', count: 8 }
      ],
      monthlyTrend: [
        { month: 'Oct', leads: 32 },
        { month: 'Nov', leads: 41 },
        { month: 'Dec', leads: 47 },
        { month: 'Jan', leads: 38 }
      ]
    };
    setMetrics(mockMetrics);
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const addNote = (leadId: string, note: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, notes: [...lead.notes, `${new Date().toLocaleString()}: ${note}`] }
        : lead
    ));
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(lead => lead.status === filterStatus);
    }
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'date':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'value':
          return b.propertyValue - a.propertyValue;
        default:
          return 0;
      }
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'unqualified': return 'bg-red-100 text-red-800';
      case 'closed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Lead Dashboard</h2>
        <p className="text-gray-600">Track and manage your mortgage leads</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Leads</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalLeads}</p>
          <p className="text-sm text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">New Leads</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{metrics.newLeads}</p>
          <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Qualified</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{metrics.qualifiedLeads}</p>
          <p className="text-sm text-green-600 mt-1">{metrics.conversionRate}% conversion</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Avg Property Value</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">${(metrics.avgLeadValue / 1000).toFixed(0)}K</p>
          <p className="text-sm text-gray-500 mt-1">Per qualified lead</p>
        </div>
      </div>

      {/* Lead Sources */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Sources</h3>
        <div className="space-y-3">
          {metrics.topSources.map((source, index) => (
            <div key={source.source} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{source.source}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{source.count} leads</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(source.count / metrics.totalLeads) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead List Controls */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="unqualified">Unqualified</option>
              <option value="closed">Closed</option>
            </select>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="score">Sort by Score</option>
              <option value="date">Sort by Date</option>
              <option value="value">Sort by Property Value</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {getFilteredLeads().length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* Lead List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {getFilteredLeads().map(lead => (
            <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{lead.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(lead.score)}`}>
                      Score: {lead.score}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">{lead.email}</p>
                      <p className="font-medium">{lead.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Property</p>
                      <p className="font-medium">${lead.propertyValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{lead.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Financial</p>
                      <p className="font-medium">Income: ${lead.income.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Credit: {lead.creditScore}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Source: {lead.source}</span>
                    <span>Created: {lead.createdAt.toLocaleDateString()}</span>
                    {lead.notes.length > 0 && <span>{lead.notes.length} notes</span>}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    View
                  </button>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="unqualified">Unqualified</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)}
          onAddNote={(note) => addNote(selectedLead.id, note)}
          onUpdateStatus={(status) => updateLeadStatus(selectedLead.id, status)}
        />
      )}
    </div>
  );
};

const LeadDetailModal: React.FC<{
  lead: Lead;
  onClose: () => void;
  onAddNote: (note: string) => void;
  onUpdateStatus: (status: Lead['status']) => void;
}> = ({ lead, onClose, onAddNote, onUpdateStatus }) => {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{lead.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2">
                <p><strong>Email:</strong> {lead.email}</p>
                <p><strong>Phone:</strong> {lead.phone}</p>
                <p><strong>Location:</strong> {lead.location}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Financial Details</h4>
              <div className="space-y-2">
                <p><strong>Property Value:</strong> ${lead.propertyValue.toLocaleString()}</p>
                <p><strong>Down Payment:</strong> ${lead.downPayment.toLocaleString()}</p>
                <p><strong>Annual Income:</strong> ${lead.income.toLocaleString()}</p>
                <p><strong>Credit Score:</strong> {lead.creditScore}</p>
                <p><strong>Employment:</strong> {lead.employmentType}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Lead Score Breakdown</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span>Overall Score</span>
                <span className="font-bold text-lg">{lead.score}/100</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Credit Score</span>
                  <span>{lead.creditScore >= 700 ? '25/25' : lead.creditScore >= 650 ? '15/25' : '5/25'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment %</span>
                  <span>{(lead.downPayment / lead.propertyValue * 100) >= 20 ? '25/25' : '15/25'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Income Ratio</span>
                  <span>{(lead.propertyValue / lead.income) <= 5 ? '25/25' : '15/25'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employment</span>
                  <span>{lead.employmentType === 'Full-time' ? '25/25' : '15/25'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Notes</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {lead.notes.map((note, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                  {note}
                </div>
              ))}
            </div>
            <div className="mt-3 flex space-x-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 p-2 border rounded"
                onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
              />
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <select
              value={lead.status}
              onChange={(e) => onUpdateStatus(e.target.value as Lead['status'])}
              className="px-3 py-2 border rounded"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="unqualified">Unqualified</option>
              <option value="closed">Closed</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Call Lead
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Email Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};