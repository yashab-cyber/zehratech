# Using Your Existing MongoDB Atlas Account

## ✅ Great News!

You can absolutely use your existing MongoDB Atlas account for ZehraTech!

---

## 🎯 Recommended Setup: Same Cluster, Different Database

### Why This Works:

- ✅ One cluster can host multiple databases
- ✅ Free M0 tier supports multiple databases
- ✅ Keeps costs down
- ✅ Easier to manage
- ✅ Data is completely separated

### Your Current Setup:
```
Cluster: cluster0.xxxxx.mongodb.net
├── Database: your-other-app (existing)
└── Database: zehratech (new - for this app)
```

**Each database is completely isolated** - they can't see each other's data!

---

## 📝 Step-by-Step Guide

### 1. Get Your Existing Connection String

From your MongoDB Atlas dashboard:
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string

Example:
```
mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/my-other-app?retryWrites=true&w=majority
```

### 2. Modify for ZehraTech

**Change only the database name** (the part after `.mongodb.net/`):

**Before:**
```
mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/my-other-app?retryWrites=true&w=majority
                                                                      ^^^^^^^^^^^^
```

**After (for ZehraTech):**
```
mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/zehratech?retryWrites=true&w=majority
                                                                      ^^^^^^^^^
```

### 3. Update `.env.local`

Open `/workspaces/zehratech/.env.local` and update:

```bash
MONGODB_URI=mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/zehratech?retryWrites=true&w=majority
```

**Replace with your actual:**
- `myusername` → your MongoDB username
- `mypassword` → your MongoDB password
- `cluster0.abc123` → your cluster address

### 4. Test the Connection

```bash
# Start the dev server
npm run dev
```

Visit http://localhost:3000

If you see "Error fetching events" - that's normal! The database is empty.

### 5. Create Admin User

```bash
npm run create-admin
```

You should see:
```
✅ MongoDB connected successfully
✅ Admin user created successfully!
```

### 6. Verify in MongoDB Atlas

1. Go to your Atlas dashboard
2. Click "Browse Collections"
3. You should now see:
   - Your existing database (e.g., `my-other-app`)
   - New database: `zehratech` ✨
     - Collection: `admins`
     - Collection: `events` (will appear when you create events)
     - Collection: `students` (will appear when students register)

---

## 🔐 Security Notes

### Same User, Same Permissions

If you use the same database user:
- ✅ They can access both databases
- ✅ This is fine for your own apps
- ✅ Just don't share credentials

### Want Separate Users? (Optional)

1. In Atlas: Database Access
2. Create new user: `zehratech_user`
3. Under "Specific Privileges":
   - Database: `zehratech`
   - Privilege: `readWrite`
4. Use this user in your ZehraTech connection string

---

## 💾 Storage Limits

**MongoDB Atlas Free Tier (M0):**
- 512 MB total storage
- Shared across ALL databases

**Example Usage:**
- Your other app: 200 MB
- ZehraTech: 50 MB
- **Total: 250 MB** ✅ (still 262 MB free!)

**Typical ZehraTech Storage:**
- 100 students: ~50 KB
- 10 events: ~10 KB
- Admin data: ~5 KB
- Files (resumes): Stored locally, not in DB

**You'll be fine!** The free tier can easily handle thousands of records.

---

## 🚀 Quick Start

**Already have Atlas connection string?**

```bash
# 1. Update .env.local
# Change database name to 'zehratech'

# 2. Start server
npm run dev

# 3. Create admin
npm run create-admin

# 4. Login
# Go to http://localhost:3000/admin/login

# 5. Create events
# Add some workshops in the dashboard

# Done! 🎉
```

---

## ❓ Common Questions

### Q: Will this affect my other app?
**A:** No! Databases are completely separate. It's like having different folders on the same hard drive.

### Q: Can I use the same username/password?
**A:** Yes! Same credentials work for all databases in a cluster.

### Q: What if I hit the 512 MB limit?
**A:** 
- Monitor in Atlas dashboard
- Delete old test data
- Upgrade to M10 ($9/month) for 10 GB
- Or create a new free cluster for ZehraTech

### Q: Is this the best practice?
**A:** For personal projects: YES! For production with many users: Consider separate clusters.

---

## 📊 Monitoring Your Usage

### In MongoDB Atlas:

1. Go to your cluster
2. Click "Metrics"
3. Check "Data Size"
4. Set up alerts at 400 MB (80%)

---

## 🔄 Alternative: Create New Cluster (Free)

If you prefer complete separation:

1. In Atlas: "Create New Cluster"
2. Choose M0 Free tier again
3. Different region (optional)
4. Get new connection string
5. Use in ZehraTech

**You can have multiple free M0 clusters!**

---

## ✅ Recommendation

**For ZehraTech:** Use your existing cluster with database name `zehratech`

**Pros:**
- ✅ No setup needed
- ✅ One dashboard to manage
- ✅ Efficient resource use
- ✅ Works immediately

**When to use separate cluster:**
- If other app is in production with critical data
- If you want different regions
- If approaching storage limits

---

## 🎯 Next Steps

1. ✅ Update `.env.local` with your connection string
2. ✅ Change database name to `zehratech`
3. ✅ Run `npm run dev`
4. ✅ Run `npm run create-admin`
5. ✅ Start building! 🚀

---

**You're all set! Your existing MongoDB Atlas account will work perfectly for ZehraTech.** 

Need help with the connection string format? Just share it (WITHOUT the password) and I'll help you modify it!
