import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { courseSchema } from '@/lib/utils/validation';
import type { NextRequest } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*, modules(*, challenges(*))')
      .eq('id', params.id)
      .single();
      
    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = courseSchema.parse(body);
    
    const { data, error } = await supabase
      .from('courses')
      .update(validatedData)
      .eq('id', params.id)
      .select()
      .single();
      
    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', params.id);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}