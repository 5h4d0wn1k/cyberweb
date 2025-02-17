import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { courseSchema } from '@/lib/utils/validation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    let query = supabase.from('courses').select('*');
    
    if (published === 'true') {
      query = query.eq('is_published', true);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = courseSchema.parse(body);
    
    const { data, error } = await supabase
      .from('courses')
      .insert(validatedData)
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}