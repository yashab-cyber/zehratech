# ZehraTech N8N Workflows

This folder contains N8N workflow files that can be imported into your N8N instance at https://zehratechn8n.onrender.com

## Available Workflows

### 1. Contact Form Notification (`contact-form-notification.json`)
**Purpose:** Sends email notification when someone submits the contact form

**Trigger:** Webhook POST to `/contact-webhook`

**What it does:**
- Receives contact form data (name, email, phone, message)
- Sends formatted email notification to admin
- Returns success response

**Setup:**
1. Import this workflow in N8N
2. Activate the workflow
3. Copy the webhook URL
4. Update your contact form API to call this webhook after saving to database

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
**Purpose:** Sends confirmation email to student and notification to admin when someone registers for a workshop

**Trigger:** Webhook POST to `/registration-webhook`

**What it does:**
- Receives registration data
- Sends beautiful confirmation email to the student
- Sends notification email to admin
- Returns success response

**Setup:**
1. Import this workflow in N8N
2. Activate the workflow
3. Copy the webhook URL
4. Update your registration API to call this webhook after successful registration

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

## How to Import Workflows

1. Open your N8N instance: https://zehratechn8n.onrender.com
2. Click on "Workflows" in the left sidebar
3. Click "Add Workflow" → "Import from File"
4. Select the JSON file you want to import
5. Configure email credentials in the Email Send nodes
6. Activate the workflow
7. Copy the webhook URL from the Webhook node

## Email Configuration

Before using these workflows, you need to configure email settings in N8N:

1. Go to Settings → Credentials
2. Add new credential for "SMTP"
3. Enter your email provider details:
   - **Gmail:** smtp.gmail.com, Port 587, Use App Password
   - **SendGrid:** smtp.sendgrid.net, Port 587, API Key
   - **Other:** Check your email provider's SMTP settings

## Integrating with Your Website

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

## Testing Workflows

1. In N8N, open the workflow
2. Click "Execute Workflow" button
3. Use the "Test" tab in Webhook node to send test data
4. Check execution history for any errors
5. Verify emails are being sent correctly

## Troubleshooting

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

**Workflow execution fails:**
- Check all nodes are properly configured
- Verify email credentials are set
- Check N8N logs for detailed error messages
- Ensure N8N instance is running and accessible

## Future Workflow Ideas

Consider creating workflows for:
- Daily/weekly registration reports to admin
- Reminder emails before workshop date
- Certificate generation and email after workshop completion
- SMS notifications using Twilio
- Slack/Discord notifications for new registrations
- Google Sheets integration for registration data backup
- Auto-reply to contact form submissions
- Follow-up emails after workshop completion

---

**Need Help?** Contact ZehraTech support at +91 8960457971
