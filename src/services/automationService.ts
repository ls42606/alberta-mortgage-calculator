import { ContentManagementService } from './contentManagementService';
import { AnalyticsService } from './analyticsService';
import { DesignService } from './designService';
import { BlogService } from './blogService';
import { AutomationTriggerConfig, AutomationActionConfig, AutomationLogDetails } from '../types/services';

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  triggers: AutomationTrigger[];
  actions: AutomationAction[];
  conditions: AutomationCondition[];
  isActive: boolean;
  lastExecuted?: Date;
  executionCount: number;
  createdAt: Date;
}

export interface AutomationTrigger {
  type: 'schedule' | 'metric_threshold' | 'user_action' | 'external_event';
  config: AutomationTriggerConfig;
}

export interface AutomationAction {
  type: 'generate_content' | 'optimize_design' | 'send_notification' | 'update_settings' | 'run_test';
  config: AutomationActionConfig;
}

export interface AutomationCondition {
  type: 'metric_comparison' | 'time_range' | 'user_segment' | 'content_performance';
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_contains';
  value: string | number | boolean;
  field: string;
}

export interface AutomationLog {
  id: string;
  ruleId: string;
  timestamp: Date;
  status: 'success' | 'failure' | 'skipped';
  message: string;
  details: AutomationLogDetails;
}

export class AutomationService {
  private static instance: AutomationService;
  private rules: AutomationRule[] = [];
  private logs: AutomationLog[] = [];
  private isRunning = false;

  private contentService: ContentManagementService;
  private analyticsService: AnalyticsService;
  private designService: DesignService;
  private blogService: BlogService;

  static getInstance(): AutomationService {
    if (!AutomationService.instance) {
      AutomationService.instance = new AutomationService();
    }
    return AutomationService.instance;
  }

  constructor() {
    this.contentService = ContentManagementService.getInstance();
    this.analyticsService = AnalyticsService.getInstance();
    this.designService = DesignService.getInstance();
    this.blogService = BlogService.getInstance();
    this.initializeDefaultRules();
  }

  private initializeDefaultRules(): void {
    // Weekly content generation rule
    const weeklyContentRule: AutomationRule = {
      id: 'weekly-content',
      name: 'Weekly Content Generation',
      description: 'Automatically generate and publish 3 blog posts every week',
      triggers: [
        {
          type: 'schedule',
          config: { cron: '0 9 * * 1' } // Every Monday at 9 AM
        }
      ],
      actions: [
        {
          type: 'generate_content',
          config: {
            count: 3,
            categories: ['Market Analysis', 'First-Time Buyers', 'Refinancing']
          }
        }
      ],
      conditions: [],
      isActive: true,
      executionCount: 0,
      createdAt: new Date()
    };

    // Low conversion rate optimization rule
    const conversionOptimizationRule: AutomationRule = {
      id: 'conversion-optimization',
      name: 'Conversion Rate Optimization',
      description: 'Optimize design when conversion rate drops below 2%',
      triggers: [
        {
          type: 'metric_threshold',
          config: { metric: 'conversionRate', threshold: 2, operator: 'less_than' }
        }
      ],
      actions: [
        {
          type: 'optimize_design',
          config: { target: 'conversion' }
        },
        {
          type: 'run_test',
          config: { type: 'ab_test', component: 'calculator-button' }
        }
      ],
      conditions: [
        {
          type: 'metric_comparison',
          operator: 'greater_than',
          value: 100,
          field: 'pageViews'
        }
      ],
      isActive: true,
      executionCount: 0,
      createdAt: new Date()
    };

    // SEO optimization rule
    const seoOptimizationRule: AutomationRule = {
      id: 'seo-optimization',
      name: 'SEO Content Optimization',
      description: 'Optimize blog posts with low organic traffic',
      triggers: [
        {
          type: 'schedule',
          config: { cron: '0 10 * * 3' } // Every Wednesday at 10 AM
        }
      ],
      actions: [
        {
          type: 'generate_content',
          config: {
            action: 'optimize_existing',
            criteria: 'low_organic_traffic'
          }
        }
      ],
      conditions: [],
      isActive: true,
      executionCount: 0,
      createdAt: new Date()
    };

    // Performance monitoring rule
    const performanceMonitoringRule: AutomationRule = {
      id: 'performance-monitoring',
      name: 'Performance Monitoring',
      description: 'Monitor and alert on performance issues',
      triggers: [
        {
          type: 'metric_threshold',
          config: { metric: 'bounceRate', threshold: 70, operator: 'greater_than' }
        }
      ],
      actions: [
        {
          type: 'send_notification',
          config: {
            type: 'email',
            subject: 'High Bounce Rate Alert',
            message: 'Bounce rate has exceeded 70%'
          }
        },
        {
          type: 'optimize_design',
          config: { target: 'engagement' }
        }
      ],
      conditions: [
        {
          type: 'time_range',
          operator: 'greater_than',
          value: 24,
          field: 'hours_since_last_check'
        }
      ],
      isActive: true,
      executionCount: 0,
      createdAt: new Date()
    };

    this.rules.push(
      weeklyContentRule,
      conversionOptimizationRule,
      seoOptimizationRule,
      performanceMonitoringRule
    );
  }

  async startAutomation(): Promise<void> {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    // Run every 5 minutes
    setInterval(async () => {
      await this.executeAutomationCycle();
    }, 5 * 60 * 1000);

    // Initial execution
    await this.executeAutomationCycle();
  }

  async stopAutomation(): Promise<void> {
    this.isRunning = false;
  }

  private async executeAutomationCycle(): Promise<void> {
    
    for (const rule of this.rules.filter(r => r.isActive)) {
      try {
        const shouldExecute = await this.evaluateRule(rule);
        
        if (shouldExecute) {
          await this.executeRule(rule);
        }
      } catch (error) {
        console.error(`Error executing rule ${rule.id}:`, error);
        this.logExecution(rule.id, 'failure', `Error: ${error.message}`, {});
      }
    }
  }

  private async evaluateRule(rule: AutomationRule): Promise<boolean> {
    // Check triggers
    for (const trigger of rule.triggers) {
      const triggerMet = await this.evaluateTrigger(trigger);
      if (!triggerMet) return false;
    }

    // Check conditions
    for (const condition of rule.conditions) {
      const conditionMet = await this.evaluateCondition(condition);
      if (!conditionMet) return false;
    }

    return true;
  }

  private async evaluateTrigger(trigger: AutomationTrigger): Promise<boolean> {
    switch (trigger.type) {
      case 'schedule':
        return this.evaluateScheduleTrigger(trigger.config);
      case 'metric_threshold':
        return this.evaluateMetricThreshold(trigger.config);
      case 'user_action':
        return this.evaluateUserAction(trigger.config);
      case 'external_event':
        return this.evaluateExternalEvent(trigger.config);
      default:
        return false;
    }
  }

  private evaluateScheduleTrigger(config: AutomationTriggerConfig): boolean {
    // Simple time-based evaluation (in a real implementation, use a proper cron parser)
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    
    if (config.cron) {
      // Parse cron expression (simplified)
      const cronParts = config.cron.split(' ');
      const minute = parseInt(cronParts[0]);
      const hour = parseInt(cronParts[1]);
      const dayOfWeek = parseInt(cronParts[4]);
      
      return currentHour === hour && currentDay === dayOfWeek;
    }
    
    return false;
  }

  private async evaluateMetricThreshold(config: AutomationTriggerConfig): Promise<boolean> {
    const metrics = this.analyticsService.getCurrentMetrics();
    const metricValue = metrics[config.metric as keyof typeof metrics];
    
    if (typeof metricValue !== 'number') return false;
    
    switch (config.operator) {
      case 'greater_than':
        return metricValue > config.threshold;
      case 'less_than':
        return metricValue < config.threshold;
      case 'equals':
        return metricValue === config.threshold;
      default:
        return false;
    }
  }

  private async evaluateUserAction(config: AutomationTriggerConfig): Promise<boolean> {
    // Check for specific user actions
    const conversions = this.analyticsService.getConversions();
    const recentConversions = conversions.filter(c => 
      Date.now() - c.timestamp.getTime() < 24 * 60 * 60 * 1000
    );
    
    return recentConversions.some(c => c.type === config.action);
  }

  private async evaluateExternalEvent(config: AutomationTriggerConfig): Promise<boolean> {
    // Check for external events (API calls, webhooks, etc.)
    // This would integrate with external services
    return false;
  }

  private async evaluateCondition(condition: AutomationCondition): Promise<boolean> {
    switch (condition.type) {
      case 'metric_comparison':
        return this.evaluateMetricComparison(condition);
      case 'time_range':
        return this.evaluateTimeRange(condition);
      case 'user_segment':
        return this.evaluateUserSegment(condition);
      case 'content_performance':
        return this.evaluateContentPerformance(condition);
      default:
        return true;
    }
  }

  private evaluateMetricComparison(condition: AutomationCondition): boolean {
    const metrics = this.analyticsService.getCurrentMetrics();
    const value = metrics[condition.field as keyof typeof metrics];
    
    if (typeof value !== 'number') return false;
    
    switch (condition.operator) {
      case 'greater_than':
        return value > condition.value;
      case 'less_than':
        return value < condition.value;
      case 'equals':
        return value === condition.value;
      default:
        return false;
    }
  }

  private evaluateTimeRange(condition: AutomationCondition): boolean {
    const now = new Date();
    const hoursAgo = new Date(now.getTime() - condition.value * 60 * 60 * 1000);
    
    // Check if enough time has passed since last execution
    return true; // Simplified implementation
  }

  private evaluateUserSegment(condition: AutomationCondition): boolean {
    // Evaluate user segment conditions
    return true; // Simplified implementation
  }

  private evaluateContentPerformance(condition: AutomationCondition): boolean {
    // Evaluate content performance conditions
    const posts = this.blogService.getAllPosts();
    const poorPerformingPosts = posts.filter(post => {
      // This would check actual performance metrics
      return Math.random() < 0.3; // Simplified
    });
    
    return poorPerformingPosts.length > 0;
  }

  private async executeRule(rule: AutomationRule): Promise<void> {
    for (const action of rule.actions) {
      await this.executeAction(action);
    }
    
    rule.lastExecuted = new Date();
    rule.executionCount++;
    
    this.logExecution(rule.id, 'success', `Rule executed successfully`, {
      actions: rule.actions.length
    });
  }

  private async executeAction(action: AutomationAction): Promise<void> {
    switch (action.type) {
      case 'generate_content':
        await this.executeGenerateContent(action.config);
        break;
      case 'optimize_design':
        await this.executeOptimizeDesign(action.config);
        break;
      case 'send_notification':
        await this.executeSendNotification(action.config);
        break;
      case 'update_settings':
        await this.executeUpdateSettings(action.config);
        break;
      case 'run_test':
        await this.executeRunTest(action.config);
        break;
    }
  }

  private async executeGenerateContent(config: AutomationActionConfig): Promise<void> {
    if (config.action === 'optimize_existing') {
      await this.contentService.optimizeExistingContent();
    } else {
      const count = config.count || 1;
      const categories = config.categories || ['General'];
      
      for (let i = 0; i < count; i++) {
        const category = categories[i % categories.length];
        const topics = this.getTopicsForCategory(category);
        const topic = topics[Math.floor(Math.random() * topics.length)];
        
        await this.blogService.generateBlogPost(topic, category, [
          'alberta mortgage',
          'mortgage calculator',
          topic.toLowerCase()
        ]);
      }
    }
  }

  private async executeOptimizeDesign(config: AutomationActionConfig): Promise<void> {
    const activeDesign = this.designService.getActiveDesign();
    if (!activeDesign) return;
    
    const optimizedDesign = await this.designService.optimizeDesignForConversion(
      activeDesign,
      config.target || 'conversion'
    );
  }

  private async executeSendNotification(config: AutomationActionConfig): Promise<void> {
    // In a real implementation, this would send email, SMS, or push notifications
  }

  private async executeUpdateSettings(config: AutomationActionConfig): Promise<void> {
    // Update application settings
  }

  private async executeRunTest(config: AutomationActionConfig): Promise<void> {
    if (config.type === 'ab_test') {
      const component = this.designService.getComponents().find(c => c.id === config.component);
      if (component && component.variants.length >= 2) {
        const test = await this.designService.startA_BTest(
          component.id,
          component.variants[0].id,
          component.variants[1].id
        );
      }
    }
  }

  private getTopicsForCategory(category: string): string[] {
    const topics: Record<string, string[]> = {
      'Market Analysis': [
        'Calgary housing market trends',
        'Edmonton real estate forecast',
        'Alberta mortgage rate predictions',
        'Rural property market analysis'
      ],
      'First-Time Buyers': [
        'First-time buyer programs in Alberta',
        'Down payment assistance options',
        'Pre-approval process guide',
        'Credit score requirements'
      ],
      'Refinancing': [
        'When to refinance your mortgage',
        'Refinancing costs and benefits',
        'Variable vs fixed rate considerations',
        'Home equity utilization strategies'
      ],
      'General': [
        'Mortgage calculator tips',
        'Understanding mortgage terms',
        'Homeownership costs in Alberta',
        'Investment property financing'
      ]
    };
    
    return topics[category] || topics['General'];
  }

  private logExecution(
    ruleId: string,
    status: 'success' | 'failure' | 'skipped',
    message: string,
    details: AutomationLogDetails
  ): void {
    const log: AutomationLog = {
      id: Date.now().toString(),
      ruleId,
      timestamp: new Date(),
      status,
      message,
      details
    };
    
    this.logs.push(log);
    
    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  // Public API methods
  async createRule(rule: Omit<AutomationRule, 'id' | 'createdAt' | 'executionCount'>): Promise<AutomationRule> {
    const newRule: AutomationRule = {
      ...rule,
      id: Date.now().toString(),
      createdAt: new Date(),
      executionCount: 0
    };
    
    this.rules.push(newRule);
    return newRule;
  }

  async updateRule(ruleId: string, updates: Partial<AutomationRule>): Promise<AutomationRule | null> {
    const rule = this.rules.find(r => r.id === ruleId);
    if (!rule) return null;
    
    Object.assign(rule, updates);
    return rule;
  }

  async deleteRule(ruleId: string): Promise<boolean> {
    const index = this.rules.findIndex(r => r.id === ruleId);
    if (index === -1) return false;
    
    this.rules.splice(index, 1);
    return true;
  }

  getRules(): AutomationRule[] {
    return [...this.rules];
  }

  getRule(ruleId: string): AutomationRule | null {
    return this.rules.find(r => r.id === ruleId) || null;
  }

  getLogs(ruleId?: string): AutomationLog[] {
    if (ruleId) {
      return this.logs.filter(log => log.ruleId === ruleId);
    }
    return [...this.logs];
  }

  getExecutionStats(): {
    totalExecutions: number;
    successRate: number;
    activeRules: number;
    lastExecution: Date | null;
  } {
    const totalExecutions = this.logs.length;
    const successfulExecutions = this.logs.filter(log => log.status === 'success').length;
    const successRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;
    const activeRules = this.rules.filter(r => r.isActive).length;
    const lastExecution = this.logs.length > 0 ? this.logs[this.logs.length - 1].timestamp : null;
    
    return {
      totalExecutions,
      successRate,
      activeRules,
      lastExecution
    };
  }
}