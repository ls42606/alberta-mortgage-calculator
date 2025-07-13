import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const articleMeta = {
    'how-much-mortgage-can-i-afford-in-alberta': {
      title: 'How Much Mortgage Can I Afford in Alberta',
      date: '2024-07-10',
      readTime: '8 min read',
      category: 'Affordability'
    },
    'first-time-home-buyer-guide-alberta-2024': {
      title: 'First Time Home Buyer Guide Alberta 2024',
      date: '2024-07-08',
      readTime: '12 min read',
      category: 'First-Time Buyers'
    },
    'understanding-the-mortgage-stress-test': {
      title: 'Understanding the Mortgage Stress Test',
      date: '2024-07-05',
      readTime: '6 min read',
      category: 'Qualification'
    },
    'fixed-vs-variable-rate-mortgages': {
      title: 'Fixed vs Variable Rate Mortgages',
      date: '2024-07-03',
      readTime: '10 min read',
      category: 'Mortgage Types'
    },
    'mortgage-renewal-vs-refinancing': {
      title: 'Mortgage Renewal vs Refinancing',
      date: '2024-07-01',
      readTime: '9 min read',
      category: 'Refinancing'
    }
  };

  useEffect(() => {
    if (slug) {
      loadArticle(slug);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/src/content/articles/${articleSlug}.md`);
      if (response.ok) {
        const text = await response.text();
        // Extract title from markdown (first # line)
        const lines = text.split('\n');
        const titleLine = lines.find(line => line.startsWith('# '));
        const extractedTitle = titleLine ? titleLine.replace('# ', '') : '';
        
        // Remove title from content
        const contentWithoutTitle = lines.filter(line => !line.startsWith('# ')).join('\n');
        
        setTitle(extractedTitle || articleMeta[articleSlug as keyof typeof articleMeta]?.title || 'Article');
        setContent(convertMarkdownToHTML(contentWithoutTitle));
      } else {
        setTitle('Article Not Found');
        setContent('<p>The requested article could not be found.</p>');
      }
    } catch (error) {
      console.error('Error loading article:', error);
      setTitle('Error Loading Article');
      setContent('<p>There was an error loading this article. Please try again later.</p>');
    } finally {
      setLoading(false);
    }
  };

  const convertMarkdownToHTML = (markdown: string) => {
    return markdown
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '</p><p>')
      .replace(/^(.+)$/gim, '<p>$1</p>')
      .replace(/<p><h/gim, '<h')
      .replace(/<\/h([1-6])><\/p>/gim, '</h$1>')
      .replace(/<p><ul>/gim, '<ul>')
      .replace(/<\/ul><\/p>/gim, '</ul>')
      .replace(/<p><li>/gim, '<li>')
      .replace(/<\/li><\/p>/gim, '</li>');
  };

  const meta = slug ? articleMeta[slug as keyof typeof articleMeta] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            
            {meta && (
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(meta.date).toLocaleDateString('en-CA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{meta.readTime}</span>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {meta.category}
                </span>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                lineHeight: '1.8',
                fontSize: '1.1rem'
              }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <BookOpen size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Educational Information</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This article provides educational information about mortgage processes and calculations. 
                    For personalized advice regarding your specific situation, consult with qualified mortgage professionals.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;