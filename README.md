# ZehraTech - AI & Tech Education PlatformThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A full-stack Next.js 14 website for ZehraTech, an AI and Tech Education brand founded by Yashab Alam. This platform enables students to register for workshops and provides a secure admin dashboard for managing registrations.## Getting Started



## 🚀 FeaturesFirst, run the development server:



- **Landing Page**: Hero section with workshop listings and brand information```bash

- **Workshop Registration**: Student registration form with file upload (resume)npm run dev

- **Admin Dashboard**: Secure authentication, registration management, and CSV export# or

- **Portfolio Page**: Showcasing Yashab Alam's experience and workshopsyarn dev

- **Contact Page**: Contact form with email integration# or

- **Dark Hacker Theme**: Neon blue accents on black background with smooth animationspnpm dev

# or

## 🛠️ Technology Stackbun dev

```

- **Framework**: Next.js 14 (App Router)

- **Database**: MongoDB with MongooseOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Styling**: TailwindCSS

- **Authentication**: NextAuth.js (JWT strategy)You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Forms**: React Hook Form + Zod validation

- **Animations**: Framer MotionThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Email**: Nodemailer

- **Deployment**: Vercel## Learn More



## 📦 InstallationTo learn more about Next.js, take a look at the following resources:



1. Clone the repository:- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

```bash- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

git clone https://github.com/yashab-cyber/zehratech.git

cd zehratechYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

```

## Deploy on Vercel

2. Install dependencies:

```bashThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

npm install

```Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your MongoDB connection string and other credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

### Create MongoDB Database
You can use MongoDB Atlas (cloud) or local MongoDB.

### Create Admin User
Run this script in MongoDB or use the admin creation script:

```javascript
use zehratech;
db.admins.insertOne({
  username: "admin",
  password: "$2a$10$...", // Use bcrypt to hash password
  email: "admin@zehratech.in",
  createdAt: new Date()
});
```

## 🔐 Admin Access

Navigate to `/admin/login` with your admin credentials.

### Admin Features:
- View all registrations
- Filter and search
- Export data to CSV
- Manage events

## 📁 Project Structure

```
zehratech/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── register/          # Registration page
│   ├── portfolio/         # Portfolio page
│   └── contact/           # Contact page
├── components/            # React components
├── lib/                   # Utilities
├── models/               # Mongoose models
└── public/               # Static files
```

## 🚀 Deployment

Deploy to Vercel:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## 📧 Contact

**Yashab Alam** - Founder, ZehraTech
- Email: yashab@zehratech.in
- LinkedIn: [linkedin.com/in/yashabalam](https://linkedin.com/in/yashabalam)
- GitHub: [github.com/yashab-cyber](https://github.com/yashab-cyber)

---

© 2025 ZehraTech. Built with ❤️ for empowering young minds with AI & Innovation
