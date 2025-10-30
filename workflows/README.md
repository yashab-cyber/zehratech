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

### 6. Weekly Analytics Report (`analytics-reporting-mongodb.json`) 🆕 ⚡
**Category:** Analytics  
**Purpose:** Generate and send comprehensive weekly performance reports using direct MongoDB connection

**Trigger:** Schedule (Every Monday 9 AM)

**What it does:**
- Directly queries MongoDB for registrations and contacts data
- Analyzes performance metrics for the past 7 days
- Calculates week-over-week growth rates
- Identifies top workshops and colleges
- Sends beautiful HTML report with insights
- No authentication required (uses database directly)

**Metrics Included:**
- New registrations this week vs last week (with growth %)
- Contact form submissions count
- Total engagement (registrations + contacts)
- All-time total students
- Top 5 workshop interests with student counts
- Top 5 colleges by registration
- Student distribution by class/year
- Actionable insights and recommendations

**Setup Instructions:**
1. In N8N, go to **Credentials** → **Add Credential** → **MongoDB**
2. Enter your MongoDB connection string (get it from your `.env` file - `MONGODB_URI`)
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database`
3. Test the connection and save
4. In the workflow, replace `YOUR_MONGODB_CREDENTIALS_ID` in both "Get Registrations from DB" and "Get Contacts from DB" nodes
5. Set up SMTP credentials (Gmail or your email provider)
6. Update the admin email address in "Send Email Report" node
7. Save and test manually before schedule activates

**Why MongoDB Direct Access?**
- ✅ No authentication errors (direct database access)
- ✅ Faster queries (bypasses API layer)
- ✅ More reliable for scheduled tasks
- ✅ Access to all data without permission issues

**Note:** This replaces the old `analytics-reporting.json` which had authentication issues with API endpoints.

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

### 9. College Partnership Management (`college-partnership.json`) 🆕
**Category:** TPO & Partnerships  
**Purpose:** Automate onboarding of new college partnerships and TPO collaborations

**Trigger:** Webhook POST to `/college-partnership-webhook`

**What it does:**
- Saves partnership details to Google Sheets CRM
- Sends welcome email to TPO with partnership benefits
- Notifies team on Slack about new partnership
- Auto-schedules kickoff meeting in Google Calendar
- Provides access to partnership portal

**Benefits for Colleges:**
- Free workshops for students
- Placement assistance
- Internship programs
- Faculty training
- Custom curriculum
- Campus drives

**Webhook Payload:**
```json
{
  "collegeName": "ABC College of Engineering",
  "city": "Mumbai",
  "state": "Maharashtra",
  "tpoName": "Dr. John Doe",
  "tpoEmail": "tpo@college.edu",
  "tpoPhone": "+91 1234567890",
  "studentStrength": 2000,
  "departments": "CSE, IT, ECE"
}
```

---

### 10. Placement Drive Management (`placement-drive.json`) 🆕
**Category:** TPO & Placements  
**Purpose:** Automate complete placement drive process from scheduling to student invitations

**Trigger:** Webhook POST to `/placement-drive-webhook`

**What it does:**
- Saves drive details to tracking sheet
- Fetches eligible students from database
- Sends detailed email invitations to students
- Sends WhatsApp notifications
- Notifies TPO about invitation status
- Tracks student confirmations

**Drive Features:**
- Auto-filters eligible students
- Beautiful invitation emails
- WhatsApp reminders
- TPO dashboard updates
- Attendance tracking

**Webhook Payload:**
```json
{
  "collegeName": "ABC College",
  "companyName": "Tech Corp",
  "position": "Software Engineer",
  "package": "₹5-7 LPA",
  "driveDate": "Dec 15, 2025",
  "driveTime": "10:00 AM",
  "venue": "Auditorium Hall",
  "mode": "Offline",
  "qualification": "B.Tech CSE/IT",
  "minPercentage": 65,
  "skills": "Java, Python, DSA",
  "tpoName": "Dr. Smith",
  "tpoEmail": "tpo@college.edu",
  "tpoPhone": "+91 1234567890"
}
```

---

### 11. Resume Review & Feedback (`resume-review.json`) 🆕
**Category:** Career Services  
**Purpose:** AI-powered resume analysis with detailed feedback for students

**Trigger:** Webhook POST to `/resume-review-webhook`

**What it does:**
- Downloads and saves resume to Google Drive
- AI analysis of resume content
- Checks ATS compatibility
- Section-wise scoring
- Keyword analysis
- Sends detailed feedback email
- Tracks reviews in Google Sheets

**Analysis Includes:**
- Overall score out of 100
- ATS compatibility percentage
- Strengths and improvements
- Section-wise analysis (Contact, Summary, Experience, Skills, Projects)
- Keyword recommendations
- Formatting suggestions

**Webhook Payload:**
```json
{
  "studentId": "STU123",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeUrl": "https://example.com/resume.pdf"
}
```

---

### 12. Certificate Generation & Distribution (`certificate-generation.json`) 🆕
**Category:** Completion & Recognition  
**Purpose:** Automated certificate generation and distribution after course completion

**Trigger:** Webhook POST to `/certificate-webhook`

**What it does:**
- Generates personalized certificate PDF
- Uploads to Google Drive with public link
- Tracks certificate issuance
- Emails certificate with achievement summary
- Sends WhatsApp notification
- Provides verification URL
- Offers alumni benefits

**Certificate Features:**
- Unique certificate ID
- Verification system
- Social sharing options
- Alumni discount codes
- Achievement statistics

**Webhook Payload:**
```json
{
  "studentId": "STU123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "courseName": "Full Stack Web Development",
  "completionDate": "Nov 30, 2025",
  "grade": "A+",
  "totalHours": 60,
  "projectsCompleted": 8,
  "attendance": 98,
  "assessmentScore": 92
}
```

---

### 13. Internship Application Processing (`internship-application.json`) 🆕
**Category:** Internships & Recruitment  
**Purpose:** Automated screening and processing of internship applications

**Trigger:** Webhook POST to `/internship-application-webhook`

**What it does:**
- Saves application to tracking system
- Auto-screens based on CGPA, skills, experience
- Calculates screening score out of 100
- Automatically shortlists or rejects
- Notifies team about shortlisted candidates on Slack
- Sends personalized emails based on status
- Provides feedback to all applicants

**Screening Criteria:**
- Academic performance (CGPA)
- Skills match percentage
- Previous internship experience
- Project portfolio
- Auto-scores and decides status

**Statuses:**
- Shortlisted (score ≥ 75)
- Under Review (score 50-74)
- Rejected (score < 50)

**Webhook Payload:**
```json
{
  "name": "Jane Smith",
  "email": "jane@college.edu",
  "phone": "+91 1234567890",
  "college": "ABC College",
  "cgpa": 8.5,
  "skills": "React, Node.js, Python, MongoDB",
  "previousInternships": 1,
  "projectsCount": 5,
  "internshipRole": "Full Stack Developer",
  "resumeUrl": "https://example.com/resume.pdf",
  "requiredSkills": "React,Node.js,MongoDB"
}
```

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

### TPO & Partnerships (2 workflows) 🆕
- College Partnership Management
- Placement Drive Management

### Career Services (3 workflows) 🆕
- Resume Review & Feedback
- Certificate Generation & Distribution
- Internship Application Processing

## 🎯 Use Cases

### Daily Operations
1. **Automated Responses:** Contact form and registration confirmations sent instantly
2. **Social Media:** Daily posts about upcoming workshops
3. **Lead Tracking:** Every inquiry captured and tracked in Google Sheets
4. **Resume Reviews:** Instant AI-powered feedback for student resumes

### Weekly Activities
1. **Analytics Reports:** Monday morning performance reviews
2. **Email Campaigns:** Weekly newsletter to all students
3. **Follow-ups:** Automated reminders for sales team
4. **Partnership Reviews:** Weekly TPO engagement tracking

### Event Management
1. **Pre-Event:** Reminder WhatsApp messages 1 day before
2. **During Event:** Real-time attendance tracking
3. **Post-Event:** Completion messages with certificates

### Placement & TPO Collaboration
1. **Partnership Onboarding:** Automated welcome flow for new college TPOs
2. **Placement Drives:** End-to-end automation from invitation to confirmation
3. **Student Screening:** AI-powered resume analysis and shortlisting
4. **Internship Management:** Application processing and candidate communication
5. **Certificate Distribution:** Automated certificate generation after course completion

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
**Total Workflows:** 13  
**Categories:** Communication, Marketing, Analytics, TPO & Partnerships, Career Services
