import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

interface ContentLayoutProps {
  title: string;
  description: string;
  category: string;
  children: React.ReactNode;
  backLink?: string;
  backText?: string;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  description,
  category,
  children,
  backLink = '/blog',
  backText = 'Back to Articles'
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <div className="mb-8">
            <Link 
              to={backLink} 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>{backText}</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12 pb-8 border-b border-gray-200">
            <div className="mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                {category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {children}
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

export default ContentLayout;