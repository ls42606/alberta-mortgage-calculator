# Development Workflow Guide

## 🔧 Local Development Setup

### Initial Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000` and automatically open in your browser.

### Development Commands
```bash
# Start development server (with hot reload)
npm run dev

# Build for production (test build locally)
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Clean build directory
npm run clean
```

## 🔄 Development Workflow

### 1. Local Testing Before Commits
```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. Check for type errors
npm run type-check

# 4. Check for linting issues
npm run lint

# 5. Test production build
npm run build
npm run preview

# 6. If everything looks good, commit
git add .
git commit -m "Your commit message"
git push origin main
```

### 2. Adding New Blog Posts
```bash
# 1. Create new .md file in src/content/blog/
# 2. Use the frontmatter format from sample-post.md
# 3. Test locally
npm run dev

# 4. Navigate to /blog to see your new post
# 5. Commit and push when ready
```

### 3. Making Content Changes
```bash
# 1. Edit files in src/constants/ for site-wide changes
# 2. Edit components for UI changes
# 3. Always test locally first
npm run dev

# 4. Check both desktop and mobile views
# 5. Test all calculator pages
# 6. Commit when satisfied
```

## 🐛 Troubleshooting

### Common Issues
1. **Port already in use**: Use `npm run dev -- --port 3001`
2. **Build errors**: Run `npm run type-check` to see TypeScript errors
3. **Styling issues**: Check Tailwind classes and responsive design
4. **Calculator not working**: Check console for JavaScript errors

### Hot Reload Not Working
```bash
# Stop the dev server (Ctrl+C)
# Clear cache and restart
npm run clean
npm run dev
```

## 📱 Testing Checklist

Before committing changes, test:

- [ ] Home page loads correctly
- [ ] All 8 calculators work properly
- [ ] Blog page displays posts
- [ ] Navigation menu works
- [ ] Mobile responsiveness
- [ ] Forms submit correctly
- [ ] No console errors
- [ ] Production build works (`npm run build && npm run preview`)

## 🚀 Deployment Process

### Automatic Deployment (Recommended)
1. Push to GitHub main branch
2. GitHub Actions automatically builds and deploys
3. Check deployment status in GitHub Actions tab

### Manual Deployment (if needed)
```bash
# Build for production
npm run build

# Deploy to Netlify (if CLI installed)
netlify deploy --prod --dir=dist

# Deploy to Vercel (if CLI installed)
vercel --prod
```

## 📊 Performance Testing

```bash
# Build and analyze bundle size
npm run build

# The build output will show chunk sizes
# Keep an eye on bundle sizes and optimize if needed
```

## 🔧 Environment Variables

Create `.env` file for local development:
```env
VITE_APP_TITLE=Alberta Mortgage Calculator (Dev)
VITE_DEBUG_MODE=true
# Add other variables as needed
```

## 📝 Content Management

### Blog Posts
- Location: `src/content/blog/`
- Format: Markdown with frontmatter
- Images: Place in `public/blog/`
- SEO: Include meta title, description, and keywords

### Site Configuration
- Main config: `src/constants/index.ts`
- Navigation: Update `NAVIGATION` array
- Contact info: Update `SITE_CONFIG`

## 🎯 Best Practices

1. **Always test locally before pushing**
2. **Use descriptive commit messages**
3. **Test on multiple screen sizes**
4. **Check calculator accuracy**
5. **Optimize images before adding**
6. **Keep blog posts SEO-friendly**
7. **Update meta descriptions for new pages** 