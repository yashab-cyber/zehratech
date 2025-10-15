# ✅ Render Deployment Checklist

## Before You Deploy

- [ ] Code is working locally
- [ ] All files committed to Git
- [ ] Pushed to GitHub
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] `package.json` has correct scripts:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
  ```

---

## MongoDB Atlas Setup

- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Whitelisted all IPs (0.0.0.0/0)
- [ ] Got connection string
- [ ] Replaced `<password>` in connection string
- [ ] Added `/zehratech` database name to connection string
- [ ] Connection string saved securely

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zehratech?retryWrites=true&w=majority
```

---

## Render Setup

- [ ] Created Render account
- [ ] Connected GitHub account
- [ ] Created new Web Service
- [ ] Selected correct repository
- [ ] Set build command: `npm install && npm run build`
- [ ] Set start command: `npm run start`
- [ ] Selected Free plan

---

## Environment Variables on Render

Add these in Render dashboard:

- [ ] `MONGODB_URI` = (your Atlas connection string)
- [ ] `NEXTAUTH_URL` = `https://your-app-name.onrender.com`
- [ ] `NEXTAUTH_SECRET` = (generate with `openssl rand -base64 32`)
- [ ] `EMAIL_HOST` = `smtp.gmail.com` (optional)
- [ ] `EMAIL_PORT` = `587` (optional)
- [ ] `EMAIL_USER` = (your email) (optional)
- [ ] `EMAIL_PASS` = (app password) (optional)
- [ ] `EMAIL_FROM` = `noreply@zehratech.in` (optional)

---

## After Deployment

- [ ] Deployment succeeded (check Render logs)
- [ ] Website loads at `https://your-app.onrender.com`
- [ ] Created admin user (via Render Shell)
- [ ] Can login to admin panel
- [ ] Created test event
- [ ] Test event appears on homepage
- [ ] Can register as student
- [ ] Registration appears in admin dashboard
- [ ] Can export CSV

---

## Optional Enhancements

- [ ] Configure custom domain (zehratech.in)
- [ ] Set up email notifications
- [ ] Add Google Analytics
- [ ] Set up automated backups
- [ ] Add uptime monitoring
- [ ] Enable MongoDB automated backups

---

## Testing Checklist

### Public Pages
- [ ] Homepage loads and looks good
- [ ] Workshop cards display correctly
- [ ] Navigation works
- [ ] Footer links work
- [ ] Portfolio page loads
- [ ] Contact form works
- [ ] Mobile responsive

### Registration
- [ ] Registration form loads
- [ ] Can fill all fields
- [ ] File upload works
- [ ] Form validation works
- [ ] Success message shows
- [ ] Data saves to MongoDB

### Admin Panel
- [ ] Can access login page
- [ ] Can login with credentials
- [ ] Dashboard shows analytics
- [ ] Can view registrations
- [ ] Search/filter works
- [ ] Can create events
- [ ] Can edit events
- [ ] Can delete events
- [ ] CSV export works

---

## Launch Day

- [ ] All tests passed
- [ ] Admin password changed from default
- [ ] Real workshop events added
- [ ] Contact info updated
- [ ] Portfolio info updated
- [ ] Shared with first batch of students
- [ ] Monitoring set up
- [ ] Backup plan in place

---

## 🎉 You're Live!

Once all checkboxes are ✅, you're ready to:
- Accept student registrations
- Manage workshops
- Grow your brand
- Change lives with AI education!

**Good luck, Yashab! 🚀**
