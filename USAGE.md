# ZehraTech Usage Guide

## 📖 Table of Contents
1. [Getting Started](#getting-started)
2. [For Students](#for-students)
3. [For Administrators](#for-administrators)
4. [API Documentation](#api-documentation)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### First Time Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the website**
   - Homepage: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin/login`

3. **Create admin account** (if not already created)
   ```bash
   npm run create-admin
   # Or with custom credentials:
   npm run create-admin admin admin@zehratech.in SecurePass123!
   ```

---

## 👨‍🎓 For Students

### Browsing Workshops

1. Visit the homepage
2. Scroll to "Upcoming Workshops" section
3. View workshop details including:
   - Title and description
   - Date and duration
   - Location (Online/Physical)
   - Available slots

### Registering for a Workshop

1. **Navigate to Registration**
   - Click "Register Now" button on homepage
   - Or click "Register" on a specific workshop card
   - Direct link: `/register`

2. **Fill Out the Form**
   ```
   Required Fields:
   - Full Name
   - Class (9, 10, 11, or 12)
   - School/Institute Name
   - Email Address
   - Phone Number (10 digits)
   - Select Workshop
   
   Optional:
   - Upload Resume (PDF or DOCX, max 5MB)
   ```

3. **Submit**
   - Click "Register" button
   - Wait for confirmation message
   - Check your email for confirmation (if email is configured)

4. **Success!**
   - You'll see a success message
   - Registration details are saved
   - Admin will be notified

### Viewing Portfolio

1. Navigate to `/portfolio`
2. Learn about:
   - Yashab Alam's background
   - Past workshops
   - AI & Cybersecurity projects
   - Contact information

### Contacting ZehraTech

1. Go to `/contact`
2. Fill out the contact form:
   - Your Name
   - Email
   - Message
3. Submit
4. Expect a response within 24-48 hours

---

## 👨‍💼 For Administrators

### Logging In

1. Navigate to `/admin/login`
2. Enter credentials:
   ```
   Default (change after first login):
   Username: admin
   Password: admin123
   ```
3. Click "Login"
4. You'll be redirected to the dashboard

### Dashboard Overview

Access: `/admin/dashboard`

The dashboard displays:
- **Total Registrations**: All-time student registrations
- **Total Events**: Number of workshops created
- **This Week**: Recent registrations count
- **Charts**: Visual representation of signup trends

### Managing Registrations

#### Viewing All Registrations

1. In the dashboard, scroll to "Student Registrations" section
2. View table with columns:
   - Name
   - Class
   - School
   - Email
   - Phone
   - Workshop
   - Date Registered

#### Searching Registrations

Use the search bar to find specific students:
```
Search by:
- Student name
- Email
- School name
- Phone number
```

#### Filtering Registrations

Filter by:
- **Class**: 9, 10, 11, 12
- **Workshop**: Select specific event
- **Date Range**: Custom date filtering

#### Exporting Data

1. Click "Export to CSV" button
2. File downloads automatically as `zehratech_registrations_[date].csv`
3. Open in Excel, Google Sheets, or any CSV viewer
4. Contains all registration data

### Managing Events/Workshops

#### Creating a New Workshop

1. Go to "Events Management" section in dashboard
2. Click "Add New Event"
3. Fill in the form:
   ```
   - Title: e.g., "Introduction to AI - 3 Day Workshop"
   - Description: Detailed information about the workshop
   - Date: Start date and time
   - Duration: e.g., "3 days", "2 hours"
   - Location: "Online" or physical address
   - Max Participants: Set a limit or leave empty for unlimited
   - Status: upcoming, ongoing, completed, cancelled
   ```
4. Click "Create Event"

#### Editing a Workshop

1. Find the event in the events list
2. Click "Edit" button
3. Modify the details
4. Click "Update Event"

#### Deleting a Workshop

1. Find the event to delete
2. Click "Delete" button
3. Confirm the action
4. Event is removed (registrations are preserved)

### Viewing Event Statistics

For each event, view:
- Total registrations
- Remaining slots (if max participants is set)
- Registration trend
- Student details

### Logging Out

1. Click your username in the top-right corner
2. Select "Logout"
3. You'll be redirected to the login page

---

## 🔌 API Documentation

### Public Endpoints

#### Get All Events
```http
GET /api/events
```

**Response:**
```json
{
  "events": [
    {
      "_id": "...",
      "title": "AI Workshop",
      "description": "Learn AI basics",
      "date": "2025-11-10T00:00:00.000Z",
      "duration": "3 days",
      "location": "Online",
      "maxParticipants": 50,
      "registeredCount": 25,
      "status": "upcoming"
    }
  ]
}
```

#### Register for Workshop
```http
POST /api/register
Content-Type: multipart/form-data
```

**Body:**
```json
{
  "name": "John Doe",
  "class": "10",
  "school": "ABC School",
  "email": "john@example.com",
  "phone": "9876543210",
  "event": "AI Workshop",
  "resume": "[File]"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "registration": { ... }
}
```

#### Send Contact Message
```http
POST /api/contact
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I have a question about your workshops."
}
```

### Protected Admin Endpoints

All admin endpoints require authentication (NextAuth session).

#### Get All Registrations
```http
GET /api/admin/registrations
Authorization: Required (Session)
```

**Response:**
```json
{
  "registrations": [ ... ],
  "total": 150
}
```

#### Export Registrations to CSV
```http
GET /api/admin/export
Authorization: Required (Session)
```

**Response:** CSV file download

#### Get All Events (Admin)
```http
GET /api/admin/events
Authorization: Required (Session)
```

#### Create Event
```http
POST /api/admin/events
Authorization: Required (Session)
Content-Type: application/json
```

**Body:**
```json
{
  "title": "New Workshop",
  "description": "Workshop description",
  "date": "2025-12-01",
  "duration": "2 days",
  "location": "Online",
  "maxParticipants": 100
}
```

#### Update Event
```http
PUT /api/admin/events/[id]
Authorization: Required (Session)
Content-Type: application/json
```

#### Delete Event
```http
DELETE /api/admin/events/[id]
Authorization: Required (Session)
```

---

## 🛠️ Common Tasks

### Adding Sample Events (for testing)

```bash
# Use MongoDB Compass or CLI
mongosh

use zehratech

db.events.insertMany([
  {
    title: "Introduction to Artificial Intelligence",
    description: "Learn the fundamentals of AI and machine learning",
    date: new Date("2025-11-15"),
    duration: "3 days",
    location: "Online",
    maxParticipants: 50,
    registeredCount: 0,
    status: "upcoming",
    createdAt: new Date()
  },
  {
    title: "Cybersecurity Basics Workshop",
    description: "Understand cybersecurity threats and protection methods",
    date: new Date("2025-11-20"),
    duration: "2 days",
    location: "Online",
    maxParticipants: 40,
    registeredCount: 0,
    status: "upcoming",
    createdAt: new Date()
  }
])
```

### Resetting Admin Password

```bash
# Run the create-admin script with existing username
npm run create-admin admin admin@zehratech.in NewPassword123!

# When prompted "Admin already exists", choose to update password
```

### Backing Up Database

```bash
# MongoDB dump
mongodump --uri="your-mongodb-uri" --out=./backup

# Restore
mongorestore --uri="your-mongodb-uri" ./backup
```

### Viewing Uploaded Resumes

Files are stored in `/public/uploads/resumes/`

Format: `resume_[timestamp]_[originalname].ext`

Example: `resume_1699564800000_johndoe_cv.pdf`

### Clearing Old Registrations

```bash
mongosh

use zehratech

# Delete registrations older than 6 months
db.students.deleteMany({
  createdAt: { $lt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000) }
})
```

---

## 🐛 Troubleshooting

### Cannot Login to Admin Panel

**Issue:** "Invalid credentials" error

**Solutions:**
1. Verify username and password are correct
2. Reset password using `npm run create-admin`
3. Check MongoDB connection
4. Verify admin user exists in database:
   ```bash
   mongosh
   use zehratech
   db.admins.find()
   ```

### Registration Form Not Submitting

**Issue:** Form submits but shows error

**Solutions:**
1. Check browser console for errors
2. Verify MongoDB is running and connected
3. Check file size (must be < 5MB)
4. Ensure all required fields are filled
5. Check API logs in terminal

### Events Not Displaying

**Issue:** Homepage shows "No upcoming workshops"

**Solutions:**
1. Add events through admin dashboard
2. Check event status is "upcoming"
3. Verify event date is in the future
4. Check MongoDB connection

### File Upload Fails

**Issue:** Resume upload doesn't work

**Solutions:**
1. Check file size (max 5MB)
2. Verify file type (PDF, DOC, DOCX only)
3. Ensure `/public/uploads/resumes/` directory exists
4. Check server permissions

### Email Not Sending

**Issue:** Confirmation emails not received

**Solutions:**
1. Verify email configuration in `.env.local`
2. Check EMAIL_USER and EMAIL_PASS are correct
3. For Gmail, ensure "App Password" is used (not regular password)
4. Check spam folder
5. Review server logs for email errors

### Export CSV Shows No Data

**Issue:** CSV export is empty

**Solutions:**
1. Verify registrations exist in database
2. Check authentication (must be logged in as admin)
3. Clear browser cache
4. Try different browser

---

## 💡 Best Practices

### For Students
- ✅ Register early as workshops have limited slots
- ✅ Provide accurate contact information
- ✅ Check spam folder for confirmation emails
- ✅ Keep your registration confirmation for reference

### For Administrators
- ✅ Change default admin password immediately
- ✅ Regularly backup database
- ✅ Update event status after workshops complete
- ✅ Export registrations before each workshop
- ✅ Monitor disk space for uploaded resumes
- ✅ Archive old events and registrations periodically

---

## 📞 Support

For additional help:
- Check the [README.md](README.md) for technical details
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Create an issue on GitHub
- Contact: admin@zehratech.in

---

**Happy Learning! 🚀**

*ZehraTech - Empowering Young Minds with AI & Innovation*
