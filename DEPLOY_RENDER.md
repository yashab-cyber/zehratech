# 🚀 Deploying ZehraTech to Render

## Prerequisites

✅ GitHub account  
✅ Render account (free)  
✅ MongoDB Atlas account (free)  

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new project (e.g., "ZehraTech")
4. Click "Build a Database"
5. Choose **FREE M0 Shared** tier
6. Select a region close to you
7. Click "Create Cluster"

### 1.2 Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `zehratech_admin` (or your choice)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.3 Whitelist All IPs (Important!)

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP: `0.0.0.0/0`
5. Click "Confirm"

**Why?** Render uses dynamic IP addresses, so we need to allow all IPs.

### 1.4 Get Connection String

1. Go back to "Database" (Clusters)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: 5.5 or later
5. Copy the connection string:
   ```
   mongodb+srv://zehratech_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name at the end:
   ```
   mongodb+srv://zehratech_admin:YourPassword@cluster0.xxxxx.mongodb.net/zehratech?retryWrites=true&w=majority
   ```

**Save this connection string!** You'll need it for Render.

---

## Step 2: Prepare Your Repository

### 2.1 Push to GitHub

```bash
# If not already initialized
git init
git add .
git commit -m "Initial commit - ZehraTech website"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/yashab-cyber/zehratech.git
git branch -M main
git push -u origin main
```

### 2.2 Verify Files

Make sure these files exist in your repo:
- ✅ `package.json` (with build scripts)
- ✅ `.env.example` (for reference)
- ✅ All app files
- ❌ `.env.local` (should be in .gitignore)

---

## Step 3: Deploy to Render

### 3.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 3.2 Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `zehratech`
3. Configure:
   - **Name**: `zehratech`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Plan**: Free

### 3.3 Add Environment Variables

Click "Advanced" → Add Environment Variables:

```bash
# Required Variables
MONGODB_URI=mongodb+srv://zehratech_admin:YourPassword@cluster0.xxxxx.mongodb.net/zehratech?retryWrites=true&w=majority

NEXTAUTH_URL=https://zehratech.onrender.com
# Or your custom domain if you have one

NEXTAUTH_SECRET=<generate-a-random-32-char-secret>

# Optional Email Variables
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@zehratech.in
```

**Generate NEXTAUTH_SECRET:**
```bash
# Run this locally to generate a secret:
openssl rand -base64 32

# Or use Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Render will:
   - Clone your repo
   - Install dependencies
   - Build Next.js app
   - Start the server

---

## Step 4: Create Admin User

Once deployed, you need to create an admin account.

### Option A: Using Render Shell

1. Go to your Render dashboard
2. Click on your service
3. Go to "Shell" tab
4. Run:
   ```bash
   npm run create-admin admin admin@zehratech.in YourPassword123!
   ```

### Option B: Locally with Production DB

1. Update your local `.env.local` with production MongoDB URI
2. Run:
   ```bash
   npm run create-admin admin admin@zehratech.in YourPassword123!
   ```
3. Restore local `.env.local` to development settings

---

## Step 5: Configure Custom Domain (Optional)

### If you have zehratech.in domain:

1. In Render Dashboard → Settings → Custom Domains
2. Add: `zehratech.in` and `www.zehratech.in`
3. Render will provide DNS records
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Add these DNS records:
   ```
   Type: CNAME
   Name: www
   Value: zehratech.onrender.com
   
   Type: A
   Name: @
   Value: [IP from Render]
   ```
6. Wait for DNS propagation (can take 24-48 hours)
7. Update `NEXTAUTH_URL` in Render environment variables:
   ```
   NEXTAUTH_URL=https://zehratech.in
   ```

---

## Step 6: Test Your Deployment

### Check These URLs:

1. **Homepage**: https://zehratech.onrender.com
2. **Admin Login**: https://zehratech.onrender.com/admin/login
3. **Register**: https://zehratech.onrender.com/register
4. **Portfolio**: https://zehratech.onrender.com/portfolio
5. **Contact**: https://zehratech.onrender.com/contact

### Test Functionality:

1. ✅ Homepage loads
2. ✅ Can login to admin panel
3. ✅ Can create events in dashboard
4. ✅ Events appear on homepage
5. ✅ Can register as student
6. ✅ Registrations appear in admin dashboard
7. ✅ Can export CSV

---

## 🔧 Troubleshooting

### Build Fails

**Check build logs** in Render dashboard.

Common issues:
```bash
# Missing dependencies
npm install

# TypeScript errors
npm run build  # Test locally first

# Wrong Node version
# Add to package.json:
"engines": {
  "node": ">=18.0.0"
}
```

### MongoDB Connection Error

1. Check connection string is correct
2. Verify password has no special characters (or URL encode them)
3. Ensure IP whitelist includes `0.0.0.0/0`
4. Check MongoDB Atlas cluster is running

### NextAuth Errors

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Make sure it's HTTPS in production

### Slow First Load

Render's free tier "spins down" after inactivity.
- First load after idle: 30-60 seconds
- Subsequent loads: Fast

**Solutions:**
- Upgrade to paid tier ($7/month for always-on)
- Use a uptime monitor to ping every 10 minutes

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| **Render** | Free Web Service | $0/month |
| **MongoDB Atlas** | M0 Free Tier | $0/month |
| **Domain** | zehratech.in | ~$10/year |
| **Total** | | **~$0.83/month** |

### Upgrade Options:

**Render Starter** ($7/month):
- No sleep/spin down
- Faster builds
- Better performance

**MongoDB M10** ($9/month):
- 10GB storage
- Better performance
- Automated backups

---

## 🚀 Post-Deployment Tasks

1. ✅ Add some test events
2. ✅ Test registration flow
3. ✅ Configure email (optional)
4. ✅ Set up Google Analytics (optional)
5. ✅ Add Google Search Console
6. ✅ Share with students!

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor deploy status
- Check resource usage

### MongoDB Atlas
- Monitor database size
- Check connection counts
- Set up alerts

---

## 🔒 Security Checklist

- ✅ Change default admin password
- ✅ Use strong NEXTAUTH_SECRET (32+ chars)
- ✅ Enable HTTPS (automatic on Render)
- ✅ Don't commit .env.local to Git
- ✅ Regular database backups
- ✅ Monitor error logs

---

## 📞 Support

**Render Issues**:
- Docs: https://render.com/docs
- Support: support@render.com

**MongoDB Issues**:
- Docs: https://docs.mongodb.com/atlas
- Community: https://community.mongodb.com

**Next.js Issues**:
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

<div align="center">
  <h2>🎉 Congratulations!</h2>
  <p>Your ZehraTech platform is now live and ready to empower students!</p>
  <p><strong>Go change the world! 🚀</strong></p>
</div>
