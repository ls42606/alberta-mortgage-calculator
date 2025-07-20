# Basin.io Lead Capture Setup

This guide explains how to set up Basin.io for secure email-based lead capture on the Alberta Mortgage Calculator website.

## Why Basin.io?

- **No email exposure**: Your email address is never visible in the code
- **Secure**: All data is transmitted over SSL
- **Simple**: No backend infrastructure needed
- **Reliable**: Professional email delivery with spam protection
- **Free tier**: Sufficient for most small businesses

## Setup Instructions

### 1. Create Basin Account

1. Go to [usebasin.com](https://usebasin.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Create a Form

1. In your Basin dashboard, click "Create Form"
2. Name your form: "Alberta Mortgage Calculator Leads"
3. Enter your email address where you want to receive leads
4. Save the form

### 3. Get Your Form ID

After creating the form, you'll see an endpoint URL like:
```
https://usebasin.com/f/abc123def456
```

Your form ID is the part after `/f/`: `abc123def456`

### 4. Configure Environment Variable

Add your Basin form ID to your environment:

**Local Development (.env file):**
```
VITE_BASIN_FORM_ID=abc123def456
```

**Netlify Deployment:**
1. Go to Netlify Dashboard > Site Settings > Environment Variables
2. Add new variable:
   - Key: `VITE_BASIN_FORM_ID`
   - Value: `your-basin-form-id`
3. Redeploy your site

## What Data Gets Captured

When a user submits a lead form, you'll receive an email with:

- **Name**: User's full name
- **Email**: User's email address
- **Mortgage Amount**: Optional mortgage amount they're considering
- **Message**: Any custom message from the user
- **Source**: Which part of the site they submitted from
- **Calculator Type**: Which calculator they used (if applicable)
- **Timestamp**: When the lead was submitted
- **Page URL**: The exact page they were on
- **Calculation Results**: If submitted from a calculator, includes their calculation details

## Email Format

Basin will send you a formatted email for each lead submission. You can customize the email template in your Basin dashboard.

## Testing

1. Submit a test lead through your website
2. Check your email for the Basin notification
3. Verify all data is coming through correctly

## Security Features

- No email addresses stored in code
- SSL encrypted transmission
- Rate limiting on form submissions
- Input validation and sanitization
- No local storage of sensitive data

## Future Upgrades

The system is designed to easily upgrade to more advanced solutions:

1. **Database Integration**: Add Supabase or Firebase when ready
2. **CRM Integration**: Connect to HubSpot, Salesforce, etc.
3. **Analytics**: Track conversion rates and lead sources
4. **Automation**: Set up follow-up sequences

## Troubleshooting

**Not receiving emails?**
- Check your spam folder
- Verify the form ID is correct
- Ensure environment variable is set in Netlify

**Form submission errors?**
- Check browser console for errors
- Verify Basin form is active
- Check rate limiting (max 10 submissions per 15 minutes per IP)

## Support

- Basin documentation: [docs.usebasin.com](https://docs.usebasin.com)
- Basin support: support@usebasin.com