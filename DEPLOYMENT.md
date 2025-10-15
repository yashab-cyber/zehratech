# ZehraTech Deployment Guide

## 🚀 Quick Deployment to Vercel

### Step 1: Prepare Your MongoDB Database

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/zehratech?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your credentials
7. Make sure to whitelist all IP addresses (0.0.0.0/0) for production

#### Option B: Local MongoDB (Development)
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/zehratech
```

### Step 2: Deploy to Vercel

#### Method 1: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Method 2: Using Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yashab-cyber/zehratech.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zehratech
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your-generated-secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@zehratech.in
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Step 3: Generate NextAuth Secret

```bash
# Generate a secure secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 4: Create Admin User

After deployment:

1. **SSH into your deployment or use Vercel Dev**
   ```bash
   vercel dev
   ```

2. **Create Admin**
   ```bash
   npm run create-admin admin admin@zehratech.in yourSecurePassword
   ```

   Or directly:
   ```bash
   node scripts/create-admin.js admin admin@zehratech.in yourSecurePassword
   ```

### Step 5: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `zehratech.in`)

2. **Configure DNS**
   Add these records in your domain registrar:
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Update Environment Variables**
   ```
   NEXTAUTH_URL=https://zehratech.in
   ```

4. **Redeploy**
   - Trigger a new deployment for changes to take effect

## 📧 Email Configuration (Optional)

### Using Gmail

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate App Password**:
   - Go to Google Account → Security
   - Select "App passwords"
   - Generate a new password for "Mail"
3. **Add to Environment Variables**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=generated-app-password
   ```

### Using SendGrid

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create an API key
3. Update email configuration:
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASS=your-sendgrid-api-key
   ```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong NEXTAUTH_SECRET (32+ characters)
- [ ] Enable MongoDB authentication
- [ ] Whitelist specific IPs in MongoDB Atlas (if possible)
- [ ] Use HTTPS only (Vercel provides this automatically)
- [ ] Set secure cookie options in NextAuth
- [ ] Implement rate limiting (future enhancement)
- [ ] Regular backup of MongoDB data

## 🧪 Testing Your Deployment

### 1. Test Public Pages
- [ ] Home page loads correctly
- [ ] Workshop cards display
- [ ] Navigation works
- [ ] Contact form submits

### 2. Test Registration
- [ ] Fill out registration form
- [ ] Upload resume (PDF/DOCX)
- [ ] Receive confirmation
- [ ] Check data in MongoDB

### 3. Test Admin Access
- [ ] Login at `/admin/login`
- [ ] View dashboard
- [ ] See registrations
- [ ] Export CSV
- [ ] Create/edit/delete events

## 📊 Monitoring

### Vercel Analytics
- Enable in Project Settings → Analytics
- Track page views, performance, and user behavior

### MongoDB Atlas Monitoring
- View cluster metrics
- Set up alerts for high usage
- Monitor query performance

## 🔄 Continuous Deployment

Every push to `main` branch will automatically deploy to Vercel:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build logs in Vercel dashboard
# Common issues:
# - Missing environment variables
# - TypeScript errors
# - Dependency issues

# Fix locally first
npm run build
```

### MongoDB Connection Fails
```bash
# Check connection string
# Ensure IP is whitelisted in MongoDB Atlas
# Verify credentials are correct
```

### NextAuth Errors
```bash
# Ensure NEXTAUTH_SECRET is set
# Verify NEXTAUTH_URL matches your domain
# Check that callbacks are properly configured
```

## 📈 Performance Optimization

1. **Enable Image Optimization**
   - Next.js automatically optimizes images
   - Use next/image component

2. **Static Generation**
   - Home page is statically generated
   - Faster load times

3. **API Routes**
   - Cached where appropriate
   - Efficient database queries

4. **MongoDB Indexing**
   - Indexes already created on common query fields
   - Monitor slow queries in Atlas

## 🎯 Post-Deployment Tasks

1. **Create Initial Events**
   - Login to admin dashboard
   - Add upcoming workshops

2. **Test Email Notifications**
   - Register a test student
   - Verify emails are sent

3. **Set Up Backups**
   - Enable automatic backups in MongoDB Atlas
   - Export data regularly

4. **Monitor Logs**
   - Check Vercel function logs
   - Monitor error rates

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas metrics
3. Test locally with `npm run dev`
4. Contact support or create an issue on GitHub

---

**Deployment Complete! 🎉**

Your ZehraTech platform is now live and ready to empower young minds with AI education!
