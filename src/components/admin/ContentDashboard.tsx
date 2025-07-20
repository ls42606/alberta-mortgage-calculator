import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ContentManagementService } from '../../services/contentManagementService';
import { AnalyticsService } from '../../services/analyticsService';
import { BlogService } from '../../services/blogService';
import { BlogPost, ContentSchedule } from '../../types/blog';
import { AnalyticsMetrics } from '../../services/analyticsService';
import { DashboardTab } from '../../types/admin';
import { useAuth } from '../auth';
import LoadingSpinner from '../ui/LoadingSpinner';

// Lazy-loaded admin components
const BlogControlCenter = lazy(() => import('./BlogControlCenter').then(module => ({ default: module.BlogControlCenter })));
const LeadDashboard = lazy(() => import('./LeadDashboard').then(module => ({ default: module.LeadDashboard })));

export const ContentDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [schedule, setSchedule] = useState<ContentSchedule[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab['key']>('overview');

  const { authState, logout } = useAuth();
  const contentService = ContentManagementService.getInstance();
  const analyticsService = AnalyticsService.getInstance();
  const blogService = BlogService.getInstance();

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [postsData, scheduleData, analyticsData] = await Promise.all([
        blogService.getAllPosts(),
        contentService.getContentSchedule(),
        analyticsService.getCurrentMetrics()
      ]);

      setPosts(postsData);
      setSchedule(scheduleData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [blogService, contentService, analyticsService]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleGenerateContent = async (topic: string, category: string) => {
    try {
      const keywords = ['alberta mortgage', 'mortgage calculator', topic.toLowerCase()];
      const post = await blogService.generateBlogPost(topic, category, keywords);
      setPosts(prev => [...prev, post]);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  const handleScheduleContent = async (title: string, publishDate: Date, category: string) => {
    const newScheduleItem: ContentSchedule = {
      id: Date.now().toString(),
      title,
      publishDate,
      category,
      status: 'scheduled',
      assignedTo: 'AI Content Generator'
    };

    setSchedule(prev => [...prev, newScheduleItem]);
    await contentService.scheduleContentGeneration([...schedule, newScheduleItem]);
  };

  const handleRunAutomation = async () => {
    try {
      await contentService.automateContentWorkflow();
      await loadDashboardData();
    } catch (error) {
      console.error('Error running automation:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management Dashboard</h1>
          <p className="text-gray-600">Manage your Alberta Mortgage Calculator content and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Welcome, <span className="font-medium">{authState.user?.username}</span>
          </div>
          <button
            onClick={logout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {([
            { key: 'overview', label: 'Overview' },
            { key: 'leads', label: 'Leads' },
            { key: 'blog', label: 'Blog Control' },
            { key: 'analytics', label: 'Analytics' }
          ] as DashboardTab[]).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-600">{posts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Views</h3>
            <p className="text-3xl font-bold text-green-600">{analytics?.pageViews || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-purple-600">{analytics?.conversionRate.toFixed(1) || 0}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Posts</h3>
            <p className="text-3xl font-bold text-orange-600">{schedule.filter(s => s.status === 'scheduled').length}</p>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === 'leads' && (
        <Suspense fallback={<LoadingSpinner size="lg" message="Loading Lead Dashboard..." />}>
          <LeadDashboard />
        </Suspense>
      )}

      {/* Blog Control Tab */}
      {activeTab === 'blog' && (
        <Suspense fallback={<LoadingSpinner size="lg" message="Loading Blog Control Center..." />}>
          <BlogControlCenter />
        </Suspense>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && analytics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Pages</h2>
              <div className="space-y-3">
                {analytics.topPages.map((page, index) => (
                  <div key={page.path} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{page.path}</span>
                    <span className="font-medium text-gray-900">{page.views} views</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Calculator Usage</h2>
              <div className="space-y-3">
                {Object.entries(analytics.calculatorUsage).map(([calculator, usage]) => (
                  <div key={calculator} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{calculator}</span>
                    <span className="font-medium text-gray-900">{usage} uses</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{analytics.avgTimeOnPage}s</p>
                <p className="text-sm text-gray-600">Avg. Time on Page</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">{analytics.bounceRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Bounce Rate</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{analytics.uniqueVisitors}</p>
                <p className="text-sm text-gray-600">Unique Visitors</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

