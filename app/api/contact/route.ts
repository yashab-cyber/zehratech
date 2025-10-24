import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save contact message to database
    const contact = await Contact.create({
      name,
      email,
      message,
      status: 'new',
    });

    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
