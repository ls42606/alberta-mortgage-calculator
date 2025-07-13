import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

const BASE_URL = 'https://albertamortgagecalculator.ca';

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath }) => {
  const canonicalUrl = canonicalPath ? `${BASE_URL}${canonicalPath}` : BASE_URL;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Also update the Open Graph tags for social sharing consistency */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Also update the Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO; 