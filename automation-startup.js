#!/usr/bin/env node

/**
 * Alberta Mortgage Calculator - Automation Startup Script
 * This script initializes all automation services for the application
 */

import { ContentManagementService } from './src/services/contentManagementService.js';
import { AnalyticsService } from './src/services/analyticsService.js';
import { DesignService } from './src/services/designService.js';
import { AutomationService } from './src/services/automationService.js';
import { BlogService } from './src/services/blogService.js';

// Environment configuration
const config = {
  AUTOMATION_ENABLED: process.env.AUTOMATION_ENABLED === 'true',
  CONTENT_GENERATION_ENABLED: process.env.CONTENT_GENERATION_ENABLED === 'true',
  PERFORMANCE_MONITORING_ENABLED: process.env.PERFORMANCE_MONITORING_ENABLED === 'true',
  AUTO_PUBLISH_ENABLED: process.env.AUTO_PUBLISH_ENABLED === 'true',
  AUTOMATION_INTERVAL: parseInt(process.env.AUTOMATION_INTERVAL) || 300000, // 5 minutes
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  GOOGLE_ANALYTICS_ID: process.env.VITE_GOOGLE_ANALYTICS_ID
};

class AutomationBootstrap {
  constructor() {
    this.services = {
      content: ContentManagementService.getInstance(),
      analytics: AnalyticsService.getInstance(),
      design: DesignService.getInstance(),
      automation: AutomationService.getInstance(),
      blog: BlogService.getInstance()
    };
    
    this.isRunning = false;
    this.startTime = new Date();
  }

  async initialize() {
    console.log('🚀 Initializing Alberta Mortgage Calculator Automation System...');
    console.log(`📅 Start time: ${this.startTime.toISOString()}`);
    console.log('⚙️  Configuration:', {
      ...config,
      CLAUDE_API_KEY: config.CLAUDE_API_KEY ? '***' : 'not set'
    });

    try {
      // Initialize analytics
      if (config.GOOGLE_ANALYTICS_ID) {
        await this.services.analytics.initializeGoogleAnalytics(config.GOOGLE_ANALYTICS_ID);
        console.log('✅ Analytics initialized');
      }

      // Initialize content management
      if (config.CONTENT_GENERATION_ENABLED && config.CLAUDE_API_KEY) {
        console.log('✅ Content generation enabled');
      } else {
        console.log('⚠️  Content generation disabled (missing Claude API key)');
      }

      // Start automation if enabled
      if (config.AUTOMATION_ENABLED) {
        await this.services.automation.startAutomation();
        console.log('✅ Automation service started');
      }

      console.log('🎉 All services initialized successfully!');
      this.isRunning = true;

      // Set up graceful shutdown
      this.setupGracefulShutdown();

      // Set up monitoring
      this.setupMonitoring();

      // Run initial tasks
      await this.runInitialTasks();

    } catch (error) {
      console.error('❌ Failed to initialize automation system:', error);
      process.exit(1);
    }
  }

  async runInitialTasks() {
    console.log('🔄 Running initial tasks...');

    try {
      // Generate initial content strategy
      if (config.CONTENT_GENERATION_ENABLED) {
        const strategy = await this.services.content.generateContentStrategy();
        console.log('📋 Content strategy generated:', {
          targetKeywords: strategy.targetKeywords.length,
          contentGaps: strategy.contentGaps.length,
          seasonalOpportunities: strategy.seasonalOpportunities.length
        });
      }

      // Initialize design variations
      const designs = this.services.design.getDesignVariations();
      console.log('🎨 Design variations available:', designs.length);

      // Set up automation rules
      const rules = this.services.automation.getRules();
      console.log('🤖 Automation rules configured:', rules.length);

      console.log('✅ Initial tasks completed');
    } catch (error) {
      console.error('⚠️  Some initial tasks failed:', error);
    }
  }

  setupGracefulShutdown() {
    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      
      try {
        await this.services.automation.stopAutomation();
        
        // Export final analytics
        const analytics = await this.services.analytics.exportAnalytics('json');
        console.log('📊 Final analytics exported');
        
        // Log uptime
        const uptime = Date.now() - this.startTime.getTime();
        console.log(`⏱️  Total uptime: ${Math.round(uptime / 1000)}s`);
        
        console.log('✅ Shutdown complete');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during shutdown:', error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  }

  setupMonitoring() {
    if (!config.PERFORMANCE_MONITORING_ENABLED) return;

    console.log('📊 Setting up performance monitoring...');
    
    // Monitor memory usage
    setInterval(() => {
      const memUsage = process.memoryUsage();
      const memUsageMB = {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024)
      };

      if (config.LOG_LEVEL === 'debug') {
        console.log('💾 Memory usage:', memUsageMB);
      }

      // Alert if memory usage is high
      if (memUsageMB.heapUsed > 500) {
        console.warn('⚠️  High memory usage detected:', memUsageMB);
      }
    }, 60000); // Check every minute

    // Monitor automation execution
    setInterval(async () => {
      const stats = this.services.automation.getExecutionStats();
      
      if (config.LOG_LEVEL === 'debug') {
        console.log('🤖 Automation stats:', stats);
      }

      // Alert if success rate is low
      if (stats.successRate < 80 && stats.totalExecutions > 10) {
        console.warn('⚠️  Low automation success rate:', stats);
      }
    }, 300000); // Check every 5 minutes
  }

  async generateWeeklyReport() {
    console.log('📊 Generating weekly report...');
    
    try {
      const analyticsReport = await this.services.analytics.generateWeeklyReport();
      const automationStats = this.services.automation.getExecutionStats();
      const contentStats = {
        totalPosts: this.services.blog.getAllPosts().length,
        featuredPosts: this.services.blog.getFeaturedPosts().length
      };

      const report = {
        period: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          end: new Date()
        },
        analytics: analyticsReport,
        automation: automationStats,
        content: contentStats,
        uptime: Date.now() - this.startTime.getTime()
      };

      console.log('📈 Weekly Report:', JSON.stringify(report, null, 2));
      
      // You could send this report via email or save to file
      return report;
    } catch (error) {
      console.error('❌ Failed to generate weekly report:', error);
    }
  }

  async healthCheck() {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime.getTime(),
      services: {
        automation: this.services.automation.getExecutionStats().activeRules > 0,
        analytics: true,
        content: config.CONTENT_GENERATION_ENABLED,
        design: this.services.design.getDesignVariations().length > 0
      },
      memory: process.memoryUsage()
    };

    // Check if any service is unhealthy
    const unhealthyServices = Object.entries(health.services)
      .filter(([_, isHealthy]) => !isHealthy)
      .map(([service, _]) => service);

    if (unhealthyServices.length > 0) {
      health.status = 'unhealthy';
      health.issues = unhealthyServices;
    }

    return health;
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      startTime: this.startTime,
      uptime: Date.now() - this.startTime.getTime(),
      config: {
        ...config,
        CLAUDE_API_KEY: config.CLAUDE_API_KEY ? 'configured' : 'not set'
      }
    };
  }
}

// Main execution
async function main() {
  const bootstrap = new AutomationBootstrap();
  
  try {
    await bootstrap.initialize();
    
    // Keep the process alive
    setInterval(async () => {
      if (config.LOG_LEVEL === 'debug') {
        const health = await bootstrap.healthCheck();
        console.log('🏥 Health check:', health.status);
      }
    }, 60000);

    // Generate weekly reports
    if (config.PERFORMANCE_MONITORING_ENABLED) {
      setInterval(async () => {
        await bootstrap.generateWeeklyReport();
      }, 7 * 24 * 60 * 60 * 1000); // Weekly
    }

    // Export the bootstrap instance for external access
    global.automationBootstrap = bootstrap;
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default AutomationBootstrap;