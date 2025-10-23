import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';

export async function GET() {
  try {
    await requireAuth();
    await connectDB();

    const students = await Student.find({}).sort({ createdAt: -1 }).lean();

    // Convert to CSV
    const headers = ['Name', 'Class', 'Section', 'Course', 'School', 'Email', 'Phone', 'Event', 'Registration Date'];
    const rows = students.map(student => [
      student.name,
      student.class,
      student.section || '',
      student.course || '',
      student.school,
      student.email,
      student.phone,
      student.event,
      new Date(student.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="zehratech_registrations_${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
