import { BlogAnalytics } from '../types/blog';
import { ConversionEventMetadata, CalculatorUsageInputs, AnalyticsReportMetadata } from '../types/services';

export interface AnalyticsMetrics {
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
  topPages: Array<{ path: string; views: number }>;
  topReferrers: Array<{ source: string; visits: number }>;
  searchQueries: Array<{ query: string; impressions: number; clicks: number }>;
  calculatorUsage: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  locationData: Record<string, number>;
}

export interface ConversionEvent {
  type: 'calculator_use' | 'contact_form' | 'phone_call' | 'email_signup';
  timestamp: Date;
  userId?: string;
  source: string;
  value?: number;
  metadata?: ConversionEventMetadata;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private metrics: AnalyticsMetrics;
  private conversions: ConversionEvent[] = [];

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  constructor() {
    this.metrics = {
      pageViews: 0,
      uniqueVisitors: 0,
      avgTimeOnPage: 0,
      bounceRate: 0,
      conversionRate: 0,
      topPages: [],
      topReferrers: [],
      searchQueries: [],
      calculatorUsage: {},
      deviceBreakdown: {},
      locationData: {}
    };
  }

  async initializeGoogleAnalytics(gaId: string): Promise<void> {
    // Initialize Google Analytics 4
    if (typeof window !== 'undefined') {
      const windowWithGtag = window as Window & { 
        gtag?: { (...args: unknown[]): void; q?: unknown[] }; 
      };
      const gtag = windowWithGtag.gtag || function(...args: unknown[]) {
        (windowWithGtag.gtag as { q?: unknown[] }).q = (windowWithGtag.gtag as { q?: unknown[] }).q || [];
        ((windowWithGtag.gtag as { q?: unknown[] }).q as unknown[]).push(args);
      };
      windowWithGtag.gtag = gtag;
      gtag('js', new Date());
      gtag('config', gaId);
    }
  }

  async trackPageView(path: string, title: string): Promise<void> {
    this.metrics.pageViews++;
    
    if (typeof window !== 'undefined') {
      const windowWithGtag = window as Window & { gtag?: (...args: unknown[]) => void };
      if (windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'page_view', {
          page_title: title,
          page_location: window.location.href,
          page_path: path
        });
      }
    }

    // Update top pages
    const existingPage = this.metrics.topPages.find(page => page.path === path);
    if (existingPage) {
      existingPage.views++;
    } else {
      this.metrics.topPages.push({ path, views: 1 });
    }

    // Sort and keep top 10
    this.metrics.topPages = this.metrics.topPages
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  async trackCalculatorUsage(calculatorType: string, inputs: CalculatorUsageInputs): Promise<void> {
    const event: ConversionEvent = {
      type: 'calculator_use',
      timestamp: new Date(),
      source: calculatorType,
      metadata: inputs
    };

    this.conversions.push(event);
    
    // Update calculator usage metrics
    this.metrics.calculatorUsage[calculatorType] = (this.metrics.calculatorUsage[calculatorType] || 0) + 1;

    if (typeof window !== 'undefined') {
      const windowWithGtag = window as Window & { gtag?: (...args: unknown[]) => void };
      if (windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'calculator_use', {
          calculator_type: calculatorType,
          custom_parameter: JSON.stringify(inputs)
        });
      }
    }
  }

  async trackConversion(event: ConversionEvent): Promise<void> {
    this.conversions.push(event);
    
    // Update conversion rate
    const totalConversions = this.conversions.length;
    this.metrics.conversionRate = (totalConversions / this.metrics.pageViews) * 100;

    if (typeof window !== 'undefined') {
      const windowWithGtag = window as Window & { gtag?: (...args: unknown[]) => void };
      if (windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'conversion', {
          event_type: event.type,
          value: event.value || 0,
          currency: 'CAD'
        });
      }
    }
  }

  async getBlogAnalytics(): Promise<BlogAnalytics> {
    // This would integrate with your analytics provider
    const analytics: BlogAnalytics = {
      views: Math.floor(Math.random() * 1000) + 100,
      shares: Math.floor(Math.random() * 50) + 5,
      timeOnPage: Math.floor(Math.random() * 300) + 120,
      bounceRate: Math.random() * 30 + 20,
      conversions: Math.floor(Math.random() * 10),
      topReferrers: ['google.com', 'facebook.com', 'direct'],
      searchQueries: ['alberta mortgage', 'mortgage calculator', 'home loan alberta']
    };

    return analytics;
  }

  async generateWeeklyReport(): Promise<{
    summary: AnalyticsMetrics;
    insights: string[];
    recommendations: string[];
  }> {
    const insights: string[] = [];
    const recommendations: string[] = [];

    // Analyze calculator usage
    const mostUsedCalculator = Object.entries(this.metrics.calculatorUsage)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (mostUsedCalculator) {
      insights.push(`Most popular calculator: ${mostUsedCalculator[0]} (${mostUsedCalculator[1]} uses)`);
    }

    // Analyze conversion rate
    if (this.metrics.conversionRate < 2) {
      recommendations.push('Consider optimizing call-to-action buttons to improve conversion rate');
    }

    // Analyze bounce rate
    if (this.metrics.bounceRate > 70) {
      recommendations.push('High bounce rate detected - consider improving page load speed and content relevance');
    }

    return {
      summary: this.metrics,
      insights,
      recommendations
    };
  }

  async extractSEOInsights(): Promise<{
    topKeywords: Array<{ keyword: string; position: number; impressions: number }>;
    clickThroughRate: number;
    avgPosition: number;
    recommendations: string[];
  }> {
    // This would integrate with Google Search Console API
    return {
      topKeywords: [
        { keyword: 'alberta mortgage calculator', position: 3, impressions: 1500 },
        { keyword: 'mortgage rates alberta', position: 5, impressions: 890 },
        { keyword: 'home loan calculator', position: 7, impressions: 650 }
      ],
      clickThroughRate: 12.5,
      avgPosition: 5.2,
      recommendations: [
        'Optimize title tags for better click-through rates',
        'Create content targeting long-tail keywords',
        'Improve page loading speed for better rankings'
      ]
    };
  }

  async trackUserJourney(userId: string, events: Array<{
    event: string;
    timestamp: Date;
    metadata?: AnalyticsReportMetadata;
  }>): Promise<void> {
    // Track user journey through the site
    // Store journey data for analysis (implementation would go here)
    console.log('Tracking user journey for:', userId, 'events:', events.length);
  }

  async exportAnalytics(format: 'csv' | 'json' | 'excel'): Promise<string> {
    const data = {
      metrics: this.metrics,
      conversions: this.conversions,
      exportDate: new Date().toISOString()
    };

    switch (format) {
      case 'json':
        return JSON.stringify(data, null, 2);
      case 'csv':
        return this.convertToCSV(data);
      case 'excel':
        // Would generate Excel file
        return 'Excel export not implemented';
      default:
        return JSON.stringify(data);
    }
  }

  private convertToCSV(data: { metrics: AnalyticsMetrics; [key: string]: unknown }): string {
    const csvLines: string[] = [];
    
    // Convert metrics to CSV
    csvLines.push('Metric,Value');
    Object.entries(data.metrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        csvLines.push(`${key},${value}`);
      }
    });

    return csvLines.join('\n');
  }

  getCurrentMetrics(): AnalyticsMetrics {
    return { ...this.metrics };
  }

  getConversions(): ConversionEvent[] {
    return [...this.conversions];
  }
}