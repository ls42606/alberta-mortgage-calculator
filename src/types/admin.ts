// Admin Dashboard Types
export interface Lead {
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

export interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgLeadValue: number;
  topSources: Array<{ source: string; count: number }>;
  monthlyTrend: Array<{ month: string; leads: number }>;
}

export interface DashboardTab {
  key: 'overview' | 'leads' | 'blog' | 'analytics';
  label: string;
}

export interface ContentMetrics {
  totalPosts: number;
  pageViews: number;
  conversionRate: number;
  scheduledPosts: number;
}

export interface LeadFormData {
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
  notes: string;
}

export interface LeadSortOption {
  value: 'score' | 'date' | 'value';
  label: string;
}

export interface LeadFilterOption {
  value: Lead['status'] | 'all';
  label: string;
}

export interface LeadDetailModalProps {
  lead: Lead;
  onClose: () => void;
  onAddNote: (note: string) => void;
  onUpdateStatus: (status: Lead['status']) => void;
}

export interface AdminFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}