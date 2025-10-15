import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

// Update admin credentials
export async function PUT(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { currentPassword, newUsername, newPassword } = await request.json();

    if (!currentPassword) {
      return NextResponse.json(
        { error: 'Current password is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the admin by current username
    const admin = await Admin.findOne({ username: session.user?.name });
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Update username if provided
    if (newUsername && newUsername !== admin.username) {
      // Check if new username already exists
      const existingAdmin = await Admin.findOne({ username: newUsername });
      if (existingAdmin && String(existingAdmin._id) !== String(admin._id)) {
        return NextResponse.json(
          { error: 'Username already taken' },
          { status: 409 }
        );
      }
      admin.username = newUsername;
    }

    // Update password if provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters' },
          { status: 400 }
        );
      }
      admin.password = await bcrypt.hash(newPassword, 10);
    }

    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Admin credentials updated successfully',
      username: admin.username,
    });
  } catch (error) {
    console.error('Update admin settings error:', error);
    return NextResponse.json(
      { error: 'Failed to update admin settings' },
      { status: 500 }
    );
  }
}
