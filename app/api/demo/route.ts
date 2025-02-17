import { NextResponse } from 'next/server';
import { z } from 'zod';

const demoSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await demoSchema.parseAsync(body);

    // Here you would:
    // 1. Store demo request in database
    // 2. Send notification to sales team
    // 3. Send confirmation email to user
    // For demo, we'll return success

    return NextResponse.json(
      { message: 'Demo request received successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input', errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}