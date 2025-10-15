import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// This is a ONE-TIME setup endpoint to create the initial admin user
// After creating the admin, this endpoint should be disabled or deleted for security

export async function POST(request: NextRequest) {
  try {
    // Get the secret key from request to prevent unauthorized access
    const { setupKey, username, password } = await request.json();

    // Verify setup key (use environment variable for security)
    const SETUP_KEY = process.env.ADMIN_SETUP_KEY || 'zehratech-admin-setup-2025';
    
    if (setupKey !== SETUP_KEY) {
      return NextResponse.json(
        { error: 'Invalid setup key' },
        { status: 403 }
      );
    }

    // Validate inputs
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists. Please use the login page.' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user
    const admin = await Admin.create({
      username,
      password: hashedPassword,
      name: 'Admin',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admin user created successfully!',
        username: admin.username,
        note: 'You can now login at /admin/login. Please delete or disable this setup endpoint for security.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Setup admin error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check if admin exists
export async function GET() {
  try {
    await connectDB();
    const adminCount = await Admin.countDocuments();

    return NextResponse.json({
      adminExists: adminCount > 0,
      count: adminCount,
      message: adminCount > 0 
        ? 'Admin user exists. Use POST to create a new one if needed.' 
        : 'No admin user found. Use POST to create one.',
    });
  } catch (error) {
    console.error('Check admin error:', error);
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    );
  }
}
