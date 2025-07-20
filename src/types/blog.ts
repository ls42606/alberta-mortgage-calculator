export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: Date;
  lastModified: Date;
  featured: boolean;
  seo: BlogSEO;
  analytics?: BlogAnalytics;
}

export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

export interface BlogAnalytics {
  views: number;
  shares: number;
  timeOnPage: number;
  bounceRate: number;
  conversions: number;
  topReferrers: string[];
  searchQueries: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  postCount: number;
}

export interface BlogMetadata {
  totalPosts: number;
  categories: BlogCategory[];
  tags: string[];
  lastUpdated: Date;
}

export interface ContentGenerationRequest {
  topic: string;
  category: string;
  targetKeywords: string[];
  targetAudience: string;
  contentType: 'blog' | 'guide' | 'faq' | 'landing-page';
  length: 'short' | 'medium' | 'long';
  tone: 'professional' | 'friendly' | 'educational';
}

export interface SEOAnalysis {
  score: number;
  recommendations: string[];
  keywordDensity: Record<string, number>;
  readabilityScore: number;
  structureScore: number;
}

export interface ContentSchedule {
  id: string;
  title: string;
  publishDate: Date;
  category: string;
  status: 'draft' | 'scheduled' | 'published';
  assignedTo: string;
}