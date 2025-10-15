import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import Event from '@/models/Event';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const studentClass = formData.get('class') as string;
    const school = formData.get('school') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const event = formData.get('event') as string;
    const resume = formData.get('resume') as File | null;

    // Validate required fields
    if (!name || !studentClass || !school || !email || !phone || !event) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Handle resume upload if provided
    let resumePath = null;
    if (resume) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${resume.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      resumePath = `/uploads/${filename}`;

      try {
        await writeFile(path.join(uploadDir, filename), buffer);
      } catch (error) {
        console.error('File upload error:', error);
        // Continue without resume if upload fails
      }
    }

    // Create student registration
    const student = await Student.create({
      name,
      class: studentClass,
      school,
      email,
      phone,
      event,
      resume: resumePath,
    });

    // Update event registration count
    await Event.findOneAndUpdate(
      { title: event },
      { $inc: { registeredCount: 1 } }
    );

    return NextResponse.json(
      { message: 'Registration successful!', student },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error && 'code' in error && (error as { code: number }).code === 11000) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    );
  }
}
