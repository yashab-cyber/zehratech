import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

async function createAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || '';

    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in environment variables');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    console.log('\n📝 Create Admin User\n');

    const username = await question('Enter username: ');
    const email = await question('Enter email: ');
    const password = await question('Enter password: ');

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log('\n🔐 You can now login at /admin/login');

    await mongoose.disconnect();
    rl.close();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error creating admin:', error.message);
    await mongoose.disconnect();
    rl.close();
    process.exit(1);
  }
}

createAdmin();
