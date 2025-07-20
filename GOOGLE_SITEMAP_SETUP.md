# Google Search Console Sitemap Submission

## Step-by-Step Instructions

### 1. Access Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click "Start now"
3. Sign in with your Google account

### 2. Add Your Property
**Choose "URL prefix" method:**
1. Enter: `https://albertamortgagecalculator.ca`
2. Click "Continue"

### 3. Verify Ownership
**Option A - HTML File Upload (Recommended):**
1. Download the verification file (e.g., `google1234567890abcdef.html`)
2. Upload to your `/public` folder in the project
3. Commit and push to deploy
4. Click "Verify"

**Option B - HTML Tag (Alternative):**
1. Copy the meta tag provided
2. Add to `index.html` in the `<head>` section
3. Deploy the changes
4. Click "Verify"

### 4. Submit Sitemap
1. Once verified, go to "Sitemaps" in the left menu
2. Click "Add a new sitemap"
3. Enter: `sitemap.xml`
4. Click "Submit"

### 5. Wait for Processing
- Google typically processes sitemaps within 24-48 hours
- You'll see status change from "Couldn't fetch" to "Success"
- Check "Coverage" report to see indexed pages

## Current Sitemap Location
Your sitemap is located at: `https://albertamortgagecalculator.ca/sitemap.xml`

## Verification File Method
1. Place verification file in `/public` folder
2. File will be accessible at: `https://albertamortgagecalculator.ca/google1234567890abcdef.html`

## Expected Results
- 15+ pages should be indexed
- All calculator pages included
- Blog posts discoverable
- Regular re-crawling scheduled

## Monitoring
Check Google Search Console weekly for:
- New indexed pages
- Search performance
- Coverage issues
- Mobile usability