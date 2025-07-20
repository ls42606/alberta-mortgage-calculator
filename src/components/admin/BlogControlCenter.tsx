import React, { useState, useEffect, useCallback } from 'react';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types/blog';

interface DraftPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  keywords: string[];
  status: 'draft' | 'reviewing' | 'approved' | 'rejected' | 'published';
  aiGenerated: boolean;
  createdAt: Date;
  seoScore: number;
}

export const BlogControlCenter: React.FC = () => {
  const [draftPosts, setDraftPosts] = useState<DraftPost[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<DraftPost | null>(null);
  const [editMode, setEditMode] = useState(false);

  const blogService = BlogService.getInstance();

  const loadPosts = useCallback(async () => {
    // Load published posts
    const published = blogService.getAllPosts();
    setPublishedPosts(published);

    // Test data for development - clearly marked
    const drafts = [
      {
        id: 'test-1',
        title: '[TEST DATA] First-Time Home Buyer Programs in Calgary 2025',
        content: '[TEST DATA] This is sample content for testing the blog review system. Calgary offers several programs for first-time buyers including the First-Time Home Buyer Incentive and various provincial programs...',
        excerpt: '[TEST DATA] Discover the top programs helping Calgary first-time buyers in 2025.',
        category: 'First-Time Buyers',
        keywords: ['calgary first time buyer', 'home buyer programs', 'alberta mortgage'],
        status: 'reviewing' as const,
        aiGenerated: true,
        createdAt: new Date(),
        seoScore: 85
      },
      {
        id: 'test-2',
        title: '[TEST DATA] Edmonton vs Calgary: Where to Buy Your First Home',
        content: '[TEST DATA] This is sample content for testing the blog review system. Comparing the two major Alberta markets for affordability, amenities, and investment potential...',
        excerpt: '[TEST DATA] A detailed comparison of Edmonton and Calgary real estate markets.',
        category: 'Market Analysis',
        keywords: ['edmonton vs calgary', 'alberta real estate', 'home buying'],
        status: 'draft' as const,
        aiGenerated: true,
        createdAt: new Date(),
        seoScore: 92
      },
      {
        id: 'test-3',
        title: '[TEST DATA] Alberta Mortgage Rates Forecast 2025',
        content: '[TEST DATA] This is sample content for testing the blog review system. Expert analysis of where mortgage rates are heading in Alberta for 2025...',
        excerpt: '[TEST DATA] Expert insights on Alberta mortgage rate predictions for 2025.',
        category: 'Market Analysis',
        keywords: ['alberta mortgage rates', 'rate forecast', '2025 predictions'],
        status: 'draft' as const,
        aiGenerated: true,
        createdAt: new Date(),
        seoScore: 88
      }
    ];
    setDraftPosts(drafts);
  }, [blogService]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const generateNewPost = async () => {
    setIsGenerating(true);
    try {
      // AI generates a new post based on trending topics
      const topics = [
        'Mortgage rates forecast for Alberta 2025',
        'Rural property financing in Alberta',
        'Investment property mortgages Calgary',
        'Refinancing your Alberta mortgage in 2025',
        'Credit score requirements Alberta mortgages'
      ];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      // Simulate AI generation (would actually call Claude API)
      const newDraft: DraftPost = {
        id: Date.now().toString(),
        title: randomTopic,
        content: `AI-generated content about ${randomTopic}. This would be a full 1500+ word article with proper SEO optimization, local Alberta focus, and actionable advice for potential mortgage clients.`,
        excerpt: `Expert insights on ${randomTopic} for Alberta homeowners and buyers.`,
        category: 'Market Analysis',
        keywords: ['alberta mortgage', randomTopic.toLowerCase()],
        status: 'draft',
        aiGenerated: true,
        createdAt: new Date(),
        seoScore: Math.floor(Math.random() * 20) + 80
      };

      setDraftPosts(prev => [newDraft, ...prev]);
    } catch (error) {
      console.error('Error generating post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const approvePost = async (postId: string) => {
    const post = draftPosts.find(p => p.id === postId);
    if (!post) return;

    // Convert to published post
    const publishedPost: BlogPost = {
      id: post.id,
      title: post.title,
      slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.keywords,
      author: 'Alberta Mortgage Calculator Team',
      publishDate: new Date(),
      lastModified: new Date(),
      featured: false,
      seo: {
        title: post.title,
        description: post.excerpt,
        keywords: post.keywords,
        canonicalUrl: `https://albertamortgagecalculator.ca/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      }
    };

    // Add to published posts
    setPublishedPosts(prev => [publishedPost, ...prev]);
    
    // Remove from drafts
    setDraftPosts(prev => prev.filter(p => p.id !== postId));
  };

  const rejectPost = (postId: string) => {
    setDraftPosts(prev => prev.map(p => 
      p.id === postId ? { ...p, status: 'rejected' as const } : p
    ));
  };

  const regeneratePost = async (postId: string) => {
    const post = draftPosts.find(p => p.id === postId);
    if (!post) return;

    setIsGenerating(true);
    try {
      // Regenerate the post content
      const updatedPost = {
        ...post,
        content: `Regenerated content for: ${post.title}. This would be completely new content focusing on different angles, updated data, and fresh perspectives.`,
        seoScore: Math.floor(Math.random() * 20) + 80,
        status: 'draft' as const
      };

      setDraftPosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
    } catch (error) {
      console.error('Error regenerating post:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveEditedPost = (editedPost: DraftPost) => {
    setDraftPosts(prev => prev.map(p => p.id === editedPost.id ? editedPost : p));
    setEditMode(false);
    setSelectedPost(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Control Center</h2>
          <p className="text-gray-600">AI generates content, you approve what gets published</p>
        </div>
        <button
          onClick={generateNewPost}
          disabled={isGenerating}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate New Post'}
        </button>
      </div>

      {/* Draft Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Draft Posts Awaiting Review</h3>
          <p className="text-sm text-gray-600">Review, edit, and approve AI-generated content</p>
        </div>
        <div className="divide-y">
          {draftPosts.map(post => (
            <div key={post.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      post.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                      post.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {post.status}
                    </span>
                    {post.aiGenerated && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        AI Generated
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Category: {post.category}</span>
                    <span>SEO Score: {post.seoScore}/100</span>
                    <span>Keywords: {post.keywords.length}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => {setSelectedPost(post); setEditMode(true);}}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => regeneratePost(post.id)}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
                  >
                    Regenerate
                  </button>
                  <button
                    onClick={() => approvePost(post.id)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectPost(post.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Published Posts */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Published Posts</h3>
          <p className="text-sm text-gray-600">Content that's live on your website</p>
        </div>
        <div className="divide-y">
          {publishedPosts.slice(0, 5).map(post => (
            <div key={post.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Published: {post.publishDate.toLocaleDateString()}</span>
                    <span>Category: {post.category}</span>
                    <span>Tags: {post.tags.length}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Live
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Preview/Edit Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editMode ? 'Edit Post' : 'Preview Post'}
              </h3>
              <button
                onClick={() => {setSelectedPost(null); setEditMode(false);}}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {editMode ? (
                <PostEditor 
                  post={selectedPost} 
                  onSave={saveEditedPost}
                  onCancel={() => {setEditMode(false); setSelectedPost(null);}}
                />
              ) : (
                <PostPreview post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PostPreview: React.FC<{ post: DraftPost }> = ({ post }) => (
  <div className="prose max-w-none">
    <h1>{post.title}</h1>
    <div className="text-gray-600 mb-4">{post.excerpt}</div>
    <div className="whitespace-pre-wrap">{post.content}</div>
    <div className="mt-6 pt-6 border-t">
      <h4>SEO Details</h4>
      <p><strong>Keywords:</strong> {post.keywords.join(', ')}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>SEO Score:</strong> {post.seoScore}/100</p>
    </div>
  </div>
);

const PostEditor: React.FC<{ 
  post: DraftPost; 
  onSave: (post: DraftPost) => void;
  onCancel: () => void;
}> = ({ post, onSave, onCancel }) => {
  const [editedPost, setEditedPost] = useState(post);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={editedPost.title}
          onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
        <textarea
          value={editedPost.excerpt}
          onChange={(e) => setEditedPost({...editedPost, excerpt: e.target.value})}
          rows={2}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={editedPost.content}
          onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
          rows={12}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
        <input
          type="text"
          value={editedPost.keywords.join(', ')}
          onChange={(e) => setEditedPost({
            ...editedPost, 
            keywords: e.target.value.split(',').map(k => k.trim())
          })}
          className="w-full p-3 border rounded-lg"
        />
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => onSave(editedPost)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};