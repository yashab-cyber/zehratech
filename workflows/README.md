# ZehraTech N8N Workflows

This folder contains N8N workflow files that can be imported into your N8N instance at https://zehratechn8n.onrender.com

## 📋 Available Workflows

### 1. Contact Form Notification (`contact-form-notification.json`)
**Category:** Communication  
**Purpose:** Sends email notification when someone submits the contact form

**Trigger:** Webhook POST to `/contact-webhook`

**What it does:**
- Receives contact form data (name, email, phone, message)
- Sends formatted email notification to admin
- Returns success response

**Webhook Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "message": "Your message here",
  "createdAt": "2025-10-30T10:00:00.000Z"
}
```

---

### 2. Workshop Registration Confirmation (`registration-confirmation.json`)
**Category:** Communication  
**Purpose:** Sends confirmation email to student and notification to admin when someone registers for a workshop

**Trigger:** Webhook POST to `/registration-webhook`

**What it does:**
- Receives registration data
- Sends beautiful confirmation email to the student
- Sends notification email to admin
- Returns success response

**Webhook Payload:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "phone": "+91 1234567890",
  "class": "12",
  "section": "A",
  "course": "B.Tech",
  "school": "School Name",
  "eventTitle": "AI Workshop 2025",
  "createdAt": "2025-10-30T10:00:00.000Z"
}
```

---

### 3. Social Media Automation (`social-media-automation.json`) 🆕
**Category:** Marketing  
**Purpose:** Automatically posts workshop announcements to social media platforms

**Trigger:** Schedule (Daily)

**What it does:**
- Fetches upcoming workshops from your website
- Creates SEO-optimized social media posts
- Posts to Twitter/X, Facebook, and LinkedIn simultaneously
- Includes relevant hashtags and links

**Platforms Supported:**
- Twitter/X
- Facebook Pages
- LinkedIn Company Pages

**Setup Required:**
- OAuth credentials for each platform
- Facebook Page ID
- LinkedIn Company Page access

---

### 4. Email Marketing Campaign (`email-marketing-campaign.json`) 🆕
**Category:** Marketing  
**Purpose:** Send bulk marketing emails to all registered students

**Trigger:** Webhook POST to `/campaign-webhook`

**What it does:**
- Retrieves all student emails from database
- Sends personalized marketing emails in batches
- Includes workshop promotions and early bird discounts
- Prevents spam by adding delays between emails

**Features:**
- Beautiful HTML email templates
- Personalized greetings
- Unsubscribe links
- Early bird discount codes
- Social media links

---

### 5. Lead Generation & Tracking (`lead-generation-tracking.json`) 🆕
**Category:** CRM & Sales  
**Purpose:** Capture, track, and nurture leads automatically

**Trigger:** Webhook POST to `/lead-webhook`

**What it does:**
- Saves leads to Google Sheets for tracking
- Checks lead quality and prioritizes high-value leads
- Sends instant Slack notifications for important leads
- Sends auto-reply email to leads
- Schedules follow-up reminders

**Integrations:**
- Google Sheets (CRM tracking)
- Slack (team notifications)
- Email (auto-replies)
- Calendar (follow-up scheduling)

**Webhook Payload:**
```json
{
  "name": "Potential Client",
  "email": "client@example.com",
  "phone": "+91 1234567890",
  "interest": "Web Development",
  "source": "high-value",
  "budget": "₹50,000+",
  "createdAt": "2025-10-30T10:00:00.000Z"
}
```

---

### 6. Weekly Analytics Report (`analytics-reporting.json`) 🆕
**Category:** Analytics  
**Purpose:** Generate and send comprehensive weekly performance reports

**Trigger:** Schedule (Every Monday 9 AM)

**What it does:**
- Collects data on registrations, contacts, and workshops
- Analyzes performance metrics and trends
- Calculates growth rates and conversion rates
- Identifies top-performing workshops
- Sends detailed HTML report to admin email
- Archives reports in Google Sheets

**Metrics Included:**
- Total registrations vs last week
- New inquiries count
- Active workshops
- Student distribution by class
- Top performing workshops
- Conversion rates
- Key insights and action items

---

### 7. WhatsApp Marketing Automation (`whatsapp-automation.json`) 🆕
**Category:** Marketing & Communication  
**Purpose:** Send automated WhatsApp messages for various scenarios

**Trigger:** Webhook POST to `/whatsapp-webhook`

**What it does:**
- Sends registration confirmations via WhatsApp
- Sends workshop reminders before the event
- Sends promotional messages for new workshops
- Sends completion messages with certificates

**Message Types:**
1. **Registration Confirmation** - Welcome message with workshop details
2. **Workshop Reminder** - Day-before reminder with preparation tips
3. **Promotional** - New workshop announcements with discounts
4. **Completion** - Congratulations with certificate links

**Setup Required:**
- Twilio account with WhatsApp Business API
- Phone number verification
- Message templates approval

**Webhook Payload:**
```json
{
  "type": "registration|reminder|promotion|completion",
  "name": "Student Name",
  "phone": "+918960457971",
  "workshop": "AI Workshop",
  "date": "Nov 5, 2025",
  "time": "10:00 AM",
  "venue": "ZehraTech Campus"
}
```

---

### 8. SEO & Content Automation (`seo-content-automation.json`) 🆕
**Category:** SEO & Content Marketing  
**Purpose:** Automate SEO tasks and generate content for workshops

**Trigger:** Schedule (Every 3 days)

**What it does:**
- Fetches and validates sitemap
- Pings Google and Bing for indexing
- Generates SEO-optimized blog post content for workshops
- Creates meta descriptions and keywords
- Saves content to Google Sheets calendar
- Logs SEO activities

**SEO Tasks:**
- Sitemap submission to search engines
- Auto-generated blog posts with keywords
- Schema markup suggestions
- Content calendar management

---

## 🚀 How to Import Workflows

1. Open your N8N instance: https://zehratechn8n.onrender.com
2. Click on "Workflows" in the left sidebar
3. Click "Add Workflow" → "Import from File"
4. Select the JSON file you want to import
5. Configure credentials (email, social media, etc.)
6. Activate the workflow
7. Copy the webhook URL from the Webhook node (if applicable)

## 🔧 Configuration Requirements

### Email Workflows
- SMTP credentials (Gmail, SendGrid, etc.)
- Sender email address
- Admin email address

### Social Media Workflows
- Twitter/X OAuth credentials
- Facebook Page ID and OAuth
- LinkedIn Company Page access

### WhatsApp Workflows
- Twilio account
- WhatsApp Business API setup
- Phone number verification

### Analytics & CRM
- Google Sheets API credentials
- Sheet IDs for data storage
- Slack webhook URL (optional)

## 📧 Email Configuration

Before using email workflows, configure SMTP in N8N:

1. Go to Settings → Credentials
2. Add new credential for "SMTP"
3. Enter your email provider details:
   - **Gmail:** smtp.gmail.com, Port 587, Use App Password
   - **SendGrid:** smtp.sendgrid.net, Port 587, API Key
   - **Other:** Check your email provider's SMTP settings

## 🔗 Integrating with Your Website

After importing and activating workflows, update your API routes:

### For Contact Form (`app/api/contact/route.ts`):
```typescript
// After saving to database, call N8N webhook
await fetch('YOUR_N8N_WEBHOOK_URL/contact-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,
    createdAt: contact.createdAt
  })
});
```

### For Registration (`app/api/register/route.ts`):
```typescript
// After saving registration, call N8N webhook
await fetch('YOUR_N8N_WEBHOOK_URL/registration-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: student.name,
    email: student.email,
    phone: student.phone,
    class: student.class,
    section: student.section,
    course: student.course,
    school: student.school,
    eventTitle: event.title,
    createdAt: student.createdAt
  })
});
```

### For WhatsApp Notifications:
```typescript
// Send WhatsApp confirmation
await fetch('YOUR_N8N_WEBHOOK_URL/whatsapp-webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'registration',
    name: student.name,
    phone: student.phone,
    workshop: event.title,
    date: event.date,
    time: event.time,
    venue: event.location
  })
});
```

## 📊 Workflow Categories

### Communication (3 workflows)
- Contact Form Notification
- Registration Confirmation
- WhatsApp Automation

### Marketing (4 workflows)
- Social Media Automation
- Email Marketing Campaign
- Lead Generation & Tracking
- SEO & Content Automation

### Analytics (1 workflow)
- Weekly Analytics Report

## 🎯 Use Cases

### Daily Operations
1. **Automated Responses:** Contact form and registration confirmations sent instantly
2. **Social Media:** Daily posts about upcoming workshops
3. **Lead Tracking:** Every inquiry captured and tracked in Google Sheets

### Weekly Activities
1. **Analytics Reports:** Monday morning performance reviews
2. **Email Campaigns:** Weekly newsletter to all students
3. **Follow-ups:** Automated reminders for sales team

### Event Management
1. **Pre-Event:** Reminder WhatsApp messages 1 day before
2. **During Event:** Real-time attendance tracking
3. **Post-Event:** Completion messages with certificates

## 🧪 Testing Workflows

1. In N8N, open the workflow
2. Click "Execute Workflow" button
3. Use the "Test" tab in Webhook node to send test data
4. Check execution history for any errors
5. Verify emails/messages are being sent correctly

## ⚠️ Troubleshooting

**Emails not sending:**
- Check SMTP credentials are correct
- Verify email provider allows SMTP connections
- Check spam folder
- Enable "Less secure app access" for Gmail or use App Password

**Webhook not receiving data:**
- Ensure workflow is activated
- Check webhook URL is correct in your API
- Verify payload format matches expected structure
- Check N8N execution history for errors

**Social media not posting:**
- Verify OAuth tokens are valid
- Check API rate limits
- Ensure page/account permissions are correct

**WhatsApp messages failing:**
- Verify Twilio credentials
- Check phone number format (+91...)
- Ensure WhatsApp Business API is active
- Message templates must be approved

**Workflow execution fails:**
- Check all nodes are properly configured
- Verify all credentials are set correctly
- Check N8N logs for detailed error messages
- Ensure N8N instance is running and accessible

## 📈 Workflow Performance Tips

1. **Batch Processing:** Use "Split in Batches" for large email campaigns
2. **Rate Limiting:** Add delays between API calls to avoid limits
3. **Error Handling:** Use "If" nodes to handle edge cases
4. **Logging:** Save execution data to Google Sheets for analysis
5. **Testing:** Always test workflows with sample data first

## 🔐 Security Best Practices

1. **Credentials:** Never commit API keys to git
2. **Webhooks:** Use authentication for webhook endpoints
3. **Data Privacy:** Follow GDPR guidelines for email marketing
4. **Access Control:** Limit N8N access to authorized personnel only
5. **Backups:** Regularly export workflows as backup

## 🚀 Future Workflow Ideas

Consider creating workflows for:
- **SMS Notifications** using Twilio
- **Slack/Discord** notifications for team
- **Google Analytics** integration
- **Certificate Generation** automation
- **Payment Reminders** for paid workshops
- **Feedback Collection** after workshops
- **Referral Program** tracking
- **A/B Testing** for email campaigns
- **Instagram/YouTube** content posting
- **Attendance Tracking** via QR codes
- **Automated Invoicing** for services
- **Customer Support** ticket system

## 📚 Resources

- [N8N Documentation](https://docs.n8n.io/)
- [Workflow Examples](https://n8n.io/workflows)
- [Community Forum](https://community.n8n.io/)
- [Video Tutorials](https://www.youtube.com/c/n8n-io)

## 💡 Tips for Success

1. **Start Simple:** Begin with basic workflows, then add complexity
2. **Use Templates:** Modify existing workflows rather than building from scratch
3. **Monitor Performance:** Check execution history regularly
4. **Iterate:** Continuously improve workflows based on results
5. **Document:** Keep notes on workflow purposes and configurations

## 📞 Support

**Need Help?**  
- Technical Support: +91 8960457971
- Email: support@zehratech.in
- N8N Instance: https://zehratechn8n.onrender.com

---

**Last Updated:** October 30, 2025  
**Total Workflows:** 8  
**Categories:** Communication, Marketing, Analytics, CRM
