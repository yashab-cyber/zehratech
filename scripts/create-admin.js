const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function createAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('❌ Please set MONGODB_URI in .env.local file');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get admin credentials from command line or use defaults
    const username = process.argv[2] || 'admin';
    const email = process.argv[3] || 'admin@zehratech.in';
    const password = process.argv[4] || 'admin123';

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('   Username:', existingAdmin.username);
      console.log('   Email:', existingAdmin.email);
      
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

      readline.question('Do you want to update the password? (y/n): ', async (answer) => {
        if (answer.toLowerCase() === 'y') {
          const hashedPassword = await bcrypt.hash(password, 10);
          existingAdmin.password = hashedPassword;
          existingAdmin.email = email;
          await existingAdmin.save();
          console.log('✅ Admin password updated successfully!');
        }
        readline.close();
        await mongoose.connection.close();
        process.exit(0);
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await admin.save();

    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('   Username:', username);
    console.log('   Email:', email);
    console.log('   Password:', password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    console.log('   Login at: http://localhost:3000/admin/login\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

createAdmin();
