import { BlogPost, BlogCategory, BlogMetadata } from '../types/blog';
import { ClaudeResponse, SEOAnalysisResult } from '../types/services';

export class BlogService {
  private static instance: BlogService;
  private posts: BlogPost[] = [];
  private categories: BlogCategory[] = [];

  static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  async generateBlogPost(topic: string, category: string, keywords: string[]): Promise<BlogPost> {
    // This would integrate with Claude MCP for content generation
    const prompt = `Generate a comprehensive blog post about ${topic} for Alberta mortgage calculator users. 
    Category: ${category}
    Keywords: ${keywords.join(', ')}
    
    The post should be SEO-optimized, informative, and include:
    - Engaging title and meta description
    - Proper headings structure
    - Relevant examples for Alberta market
    - Call-to-action to use our calculators
    - FAQ section
    - Minimum 1500 words`;

    // Simulate MCP call - in reality this would use Claude's API
    const generatedContent = await this.callClaudeMCP(prompt);
    
    const post: BlogPost = {
      id: Date.now().toString(),
      title: generatedContent.title,
      slug: this.generateSlug(generatedContent.title),
      content: generatedContent.content,
      excerpt: generatedContent.excerpt,
      category,
      tags: keywords,
      author: 'Alberta Mortgage Calculator Team',
      publishDate: new Date(),
      lastModified: new Date(),
      featured: false,
      seo: {
        title: generatedContent.seoTitle,
        description: generatedContent.metaDescription,
        keywords: keywords,
        canonicalUrl: `https://albertamortgagecalculator.ca/blog/${this.generateSlug(generatedContent.title)}`
      }
    };

    this.posts.push(post);
    return post;
  }

  async generateWeeklyContent(): Promise<BlogPost[]> {
    const topics = [
      'First-time homebuyer programs in Alberta',
      'Mortgage rates forecast 2025',
      'Calgary vs Edmonton housing market',
      'Rural property financing options',
      'Refinancing strategies for Albertans',
      'Commercial real estate trends',
      'HELOC vs traditional mortgage'
    ];

    const newPosts: BlogPost[] = [];
    
    for (const topic of topics.slice(0, 3)) { // Generate 3 posts per week
      const category = this.categorizeContent(topic);
      const keywords = this.generateKeywords(topic);
      const post = await this.generateBlogPost(topic, category, keywords);
      newPosts.push(post);
    }

    return newPosts;
  }

  private async callClaudeMCP(prompt: string, retryCount = 0): Promise<ClaudeResponse> {
    const maxRetries = 3;
    const retryDelay = 1000 * Math.pow(2, retryCount); // Exponential backoff
    
    try {
      const apiKey = process.env.VITE_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY;
      if (!apiKey) {
        throw new Error('Claude API key not configured');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 4000,
          messages: [{
            role: 'user',
            content: `${prompt}

Please return a JSON response with the following structure:
{
  "title": "Engaging blog post title",
  "content": "Full blog post content (minimum 1500 words, markdown format)",
  "excerpt": "Brief 2-3 sentence excerpt for previews",
  "seoTitle": "SEO optimized title (max 60 characters)",
  "metaDescription": "Meta description (max 160 characters)"
}

Focus on Alberta-specific information, include actionable advice, and maintain a professional but accessible tone.`
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(`Claude API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        
        // Retry on specific error codes
        if (retryCount < maxRetries && (response.status === 429 || response.status >= 500)) {
          console.warn(`Retrying Claude API call in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return this.callClaudeMCP(prompt, retryCount + 1);
        }
        
        throw error;
      }

      const data = await response.json();
      const content = data.content[0].text;
      
      // Parse JSON response from Claude
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid JSON response from Claude');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      if (!parsed.title || !parsed.content) {
        throw new Error('Incomplete response from Claude API');
      }
      
      return {
        title: parsed.title,
        content: parsed.content,
        excerpt: parsed.excerpt || this.generateExcerpt(parsed.content),
        seoTitle: parsed.seoTitle || parsed.title.substring(0, 60),
        metaDescription: parsed.metaDescription || this.generateMetaDescription(parsed.content)
      };

    } catch (error) {
      console.error('Claude API error:', error);
      
      // Only retry on network errors or rate limits
      if (retryCount < maxRetries && (error.message.includes('fetch') || error.message.includes('429'))) {
        console.warn(`Retrying Claude API call in ${retryDelay}ms (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return this.callClaudeMCP(prompt, retryCount + 1);
      }
      
      // Fallback to test data clearly marked as such
      const topic = prompt.split(' ').slice(3, 6).join(' ') || 'Mortgages';
      return {
        title: `[TEST DATA] ${topic} - Alberta Mortgage Guide`,
        content: `[TEST DATA] This is placeholder content for testing purposes. 

# ${topic} in Alberta

This would be a comprehensive blog post about Alberta mortgages, generated by Claude AI.

## Understanding ${topic}

- Alberta-specific mortgage information
- Professional insights and advice  
- SEO-optimized content structure
- Actionable tips for readers

## Key Benefits

1. **Local Expertise**: Alberta-focused mortgage advice
2. **Current Rates**: Up-to-date market information
3. **Professional Guidance**: Expert recommendations
4. **Practical Steps**: Clear action items

## Getting Started

Contact our team for personalized mortgage advice tailored to your Alberta property needs.

## Conclusion

This test content demonstrates the blog generation structure while the Claude API integration is being configured.

*Note: This is test data for development purposes only. Real content will be generated when Claude API is properly configured.*`,
        excerpt: `[TEST DATA] Comprehensive guide to ${topic} for Alberta homeowners and buyers.`,
        seoTitle: `[TEST] ${topic} Alberta Guide`,
        metaDescription: `[TEST] Learn about ${topic} in Alberta with expert mortgage advice and current market insights.`
      };
    }
  }

  private generateExcerpt(content: string): string {
    // Extract first paragraph after title
    const paragraphs = content.split('\n').filter(p => p.trim() && !p.startsWith('#'));
    const firstParagraph = paragraphs[0] || '';
    return firstParagraph.substring(0, 200) + (firstParagraph.length > 200 ? '...' : '');
  }

  private generateMetaDescription(content: string): string {
    // Extract key points for meta description
    const excerpt = this.generateExcerpt(content);
    return excerpt.substring(0, 160);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private categorizeContent(topic: string): string {
    const categories = {
      'first-time': 'First-Time Buyers',
      'rates': 'Market Analysis',
      'calgary': 'Local Markets',
      'edmonton': 'Local Markets',
      'rural': 'Specialized Financing',
      'refinancing': 'Refinancing',
      'commercial': 'Commercial',
      'heloc': 'Home Equity'
    };

    const topicLower = topic.toLowerCase();
    for (const [key, category] of Object.entries(categories)) {
      if (topicLower.includes(key)) {
        return category;
      }
    }
    return 'General';
  }

  private generateKeywords(topic: string): string[] {
    const baseKeywords = [
      'alberta mortgage',
      'mortgage calculator',
      'home loan alberta',
      'mortgage rates alberta'
    ];

    const topicKeywords = {
      'first-time': ['first time home buyer', 'alberta first time buyer program'],
      'rates': ['mortgage rates', 'interest rates', 'rate forecast'],
      'calgary': ['calgary real estate', 'calgary mortgage'],
      'edmonton': ['edmonton real estate', 'edmonton mortgage'],
      'rural': ['rural property', 'acreage financing'],
      'refinancing': ['mortgage refinancing', 'refinance rates'],
      'commercial': ['commercial mortgage', 'business property'],
      'heloc': ['home equity', 'credit line']
    };

    const topicLower = topic.toLowerCase();
    for (const [key, keywords] of Object.entries(topicKeywords)) {
      if (topicLower.includes(key)) {
        return [...baseKeywords, ...keywords];
      }
    }
    return baseKeywords;
  }

  getAllPosts(): BlogPost[] {
    return [...this.posts];
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.posts.filter(post => post.category === category);
  }

  getFeaturedPosts(): BlogPost[] {
    return this.posts.filter(post => post.featured);
  }

  async scheduleBlogPost(post: BlogPost, publishDate: Date): Promise<void> {
    post.publishDate = publishDate;
    // In a real implementation, this would integrate with a scheduling system
  }

  async optimizeForSEO(post: BlogPost): Promise<BlogPost> {
    // AI-powered SEO optimization
    const optimized = { ...post };
    
    // Analyze content for SEO improvements
    const seoAnalysis = await this.analyzeSEO(post.content);
    
    if (seoAnalysis.titleSuggestion) {
      optimized.seo.title = seoAnalysis.titleSuggestion;
    }
    
    if (seoAnalysis.metaDescriptionSuggestion) {
      optimized.seo.description = seoAnalysis.metaDescriptionSuggestion;
    }
    
    if (seoAnalysis.keywordSuggestions) {
      optimized.seo.keywords = [...optimized.seo.keywords, ...seoAnalysis.keywordSuggestions];
    }

    return optimized;
  }

  private async analyzeSEO(content: string): Promise<SEOAnalysisResult> {
    // This would use Claude MCP for SEO analysis
    return {
      titleSuggestion: 'SEO Optimized Title',
      metaDescriptionSuggestion: 'SEO optimized meta description',
      keywordSuggestions: ['additional', 'keywords']
    };
  }
}