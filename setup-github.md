# GitHub Repository Setup Guide

## 🚀 Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface (Recommended)
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository details:
   - **Repository name**: `alberta-mortgage-calculator`
   - **Description**: `Comprehensive mortgage calculator suite for Alberta homebuyers`
   - **Visibility**: Public (or Private if you prefer)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create alberta-mortgage-calculator --public --description "Comprehensive mortgage calculator suite for Alberta homebuyers"
```

## 🔗 Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/alberta-mortgage-calculator.git

# Rename main branch (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🌐 Step 3: Set Up Automatic Deployment

### For Netlify (Recommended for Static Sites)

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub account

2. **Connect Repository**
   - Click "New site from Git"
   - Choose GitHub
   - Select your `alberta-mortgage-calculator` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Set Up Custom Domain** (Optional)
   - In Netlify dashboard → Domain settings
   - Add custom domain
   - Follow DNS configuration instructions

5. **Environment Variables** (if needed)
   - Site settings → Environment variables
   - Add variables from `.env.example`

### For Vercel (Alternative)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub account

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Project**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

## 🔧 Step 4: Configure Environment Variables

### For Production (Netlify/Vercel)
Set these environment variables in your hosting platform:

```env
VITE_APP_TITLE=Alberta Mortgage Calculator
VITE_APP_URL=https://your-domain.com
VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
VITE_CONTACT_EMAIL=info@your-domain.com
VITE_CONTACT_PHONE=+1-403-555-0123
```

### For Local Development
Create `.env` file in your project root:

```env
VITE_APP_TITLE=Alberta Mortgage Calculator (Dev)
VITE_DEBUG_MODE=true
VITE_CONTACT_EMAIL=dev@localhost
```

## 📋 Step 5: Verify Deployment

1. **Check GitHub Actions**
   - Go to your GitHub repository
   - Click "Actions" tab
   - Verify the workflow runs successfully

2. **Test Live Site**
   - Visit your deployed URL
   - Test all calculators
   - Check mobile responsiveness
   - Verify blog functionality

3. **Test Domain (if custom)**
   - Ensure SSL certificate is active
   - Test all pages load correctly
   - Check redirects work

## 🔄 Step 6: Set Up Development Workflow

### Daily Development Process:
```bash
# 1. Start local development
npm run dev

# 2. Make your changes
# 3. Test locally at http://localhost:3000

# 4. Before committing, run checks:
npm run type-check
npm run lint
npm run build
npm run preview

# 5. If everything looks good:
git add .
git commit -m "Descriptive commit message"
git push origin main

# 6. Check GitHub Actions for successful deployment
```

## 🎯 Quick Commands Reference

```bash
# Local development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run type-check      # Check TypeScript
npm run lint           # Check code quality

# Git workflow
git status             # Check changes
git add .              # Stage all changes
git commit -m "message" # Commit changes
git push origin main   # Push to GitHub

# Deployment check
# Visit your live site URL to verify changes
```

## 🚨 Important Notes

1. **Never commit sensitive data** (API keys, passwords)
2. **Always test locally first** before pushing
3. **Use descriptive commit messages**
4. **Check GitHub Actions** after each push
5. **Monitor site performance** after deployments

## 🆘 Troubleshooting

### Build Fails on GitHub Actions
- Check the Actions tab for error details
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Site Not Loading After Deployment
- Check build logs in Netlify/Vercel dashboard
- Verify DNS settings for custom domains
- Check for JavaScript errors in browser console

### Local Development Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port conflicts: Use `npm run dev -- --port 3001` 