import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

export async function POST(req: Request) {
  try {
    if (req.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { message: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const body = await req.json();
    await contactSchema.parseAsync(body);

    // Here you would typically:
    // 1. Send email using a service like Resend or SendGrid
    // 2. Store in database if needed
    // For demo, we'll just return success

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Invalid input',
          errors: error.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }
    
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}