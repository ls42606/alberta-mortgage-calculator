# Alberta Mortgage Calculator

A comprehensive, user-friendly mortgage calculator suite tailored for the Alberta real estate market. This project provides a range of specialized calculators to empower home buyers, real estate agents, and mortgage brokers with accurate financial insights.

## 🚀 Features

- **8 Specialized Calculators**: Mortgage Payment, Affordability, Refinance, Prepayment, Debt Consolidation, Commercial, HELOC, and Stress Test
- **Blog System**: Dynamic blog with SEO-optimized content
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: React 18, TypeScript, Vite for fast development
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd alberta-mortgage-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Alberta Mortgage Calculator
VITE_API_URL=https://your-api-url.com
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build command: npm run build
# Publish directory: dist
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── calculators/    # Calculator-specific components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── ui/             # Base UI components
│   └── forms/          # Form components
├── pages/              # Page components
│   ├── calculators/    # Calculator pages
│   └── blog/           # Blog pages
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── assets/             # Static assets
```

## 🔄 Update Workflow

1. **Content Updates**: Edit content in `src/content/` directory
2. **Blog Posts**: Add new posts to `src/content/blog/`
3. **Deploy**: Push to GitHub, automatic deployment via CI/CD

## 📊 Calculator Types

1. **Mortgage Payment Calculator** - Calculate monthly payments
2. **Affordability Calculator** - Determine buying power
3. **Refinance Calculator** - Compare refinancing options
4. **Prepayment Calculator** - Calculate prepayment benefits
5. **Debt Consolidation Calculator** - Consolidate debts with mortgage
6. **Commercial Calculator** - Commercial property calculations
7. **HELOC Calculator** - Home equity line of credit
8. **Stress Test Calculator** - Qualify under stress test rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 