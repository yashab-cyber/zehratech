# 🚀 Quick Start Guide - ZehraTech

## Current Status

✅ **Server Running**: http://localhost:3000  
⚠️ **MongoDB**: Not connected (needs setup)  
⚠️ **Admin User**: Not created yet  

---

## 🔧 Fix the Remaining Issues

### Issue 1: MongoDB Connection

**Error**: `MongooseServerSelectionError`

**Solution**: You need to set up MongoDB. Choose one option:

#### Option A: Use MongoDB Atlas (Recommended - Free & Easy)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 Sandbox - FREE)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `.env.local`:
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zehratech?retryWrites=true&w=majority
   ```
7. Replace `username` and `password` with your credentials
8. Restart the dev server

#### Option B: Install MongoDB Locally

**For Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongod
sudo systemctl enable mongod
```

**For macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Windows:**
Download from: https://www.mongodb.com/try/download/community

Then restart your dev server.

---

### Issue 2: NextAuth Session Error

**Error**: `Function.prototype.apply was called on #<Object>`

**Status**: ✅ **FIXED** - Just restart your server

---

### Issue 3: Create Admin User

Once MongoDB is connected, create your admin account:

```bash
npm run create-admin
```

Or with custom credentials:
```bash
npm run create-admin yourusername admin@zehratech.in YourPassword123!
```

---

## 📋 Step-by-Step Setup

### 1. Set up MongoDB (Choose one):

**Quick & Easy (MongoDB Atlas)**:
```bash
# 1. Sign up at mongodb.com/cloud/atlas
# 2. Create a free cluster
# 3. Get connection string
# 4. Update .env.local with the connection string
# 5. Restart server: Ctrl+C then npm run dev
```

**OR Local MongoDB**:
```bash
# Install and start MongoDB locally
sudo systemctl start mongod  # Linux
# OR
brew services start mongodb-community  # macOS
```

### 2. Restart the Server

```bash
# Press Ctrl+C to stop current server
npm run dev
```

### 3. Create Admin Account

```bash
npm run create-admin
```

Default credentials will be:
- Username: `admin`
- Password: `admin123`
- ⚠️ **Change these after first login!**

### 4. Test Everything

1. **Homepage**: http://localhost:3000
   - Should load without errors
   - Should show "Upcoming Workshops"

2. **Admin Login**: http://localhost:3000/admin/login
   - Login with created credentials
   - Should redirect to dashboard

3. **Create an Event**:
   - In admin dashboard, add a test workshop
   - Check if it appears on homepage

---

## 🎯 Current Features Working

✅ Dark hacker theme (black + neon blue)  
✅ Responsive navigation  
✅ Homepage layout  
✅ Registration form  
✅ Portfolio page  
✅ Contact page  
✅ Admin login page  
✅ Admin dashboard  

**Waiting for MongoDB**:
- ⏳ Database connectivity
- ⏳ Event fetching from DB
- ⏳ Student registrations
- ⏳ Admin authentication

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Kill any process using port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### MongoDB connection fails
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
# OR
brew services list  # macOS

# Check connection string in .env.local
# Make sure no spaces, correct format
```

### Can't create admin
```bash
# Make sure MongoDB is connected first!
# Check server logs for "✅ MongoDB connected"
```

---

## 📞 Need Help?

1. **MongoDB Atlas Issues**: Check https://docs.mongodb.com/atlas/
2. **Local MongoDB**: Run `sudo systemctl status mongod`
3. **Check logs**: Look at terminal output for specific errors

---

## ✨ Once Everything Works

You'll be able to:
- ✅ Create and manage workshops
- ✅ Accept student registrations
- ✅ Export data to CSV
- ✅ Manage your brand
- ✅ Deploy to production

---

<div align="center">
  <h3>🎓 Almost There!</h3>
  <p>Just connect MongoDB and you're ready to go! 🚀</p>
</div>
