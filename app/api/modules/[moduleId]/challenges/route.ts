import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { challengeSchema } from '@/lib/utils/validation';
import type { NextRequest } from 'next/server';

interface Params {
  params: {
    moduleId: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    if (!params.moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('module_id', params.moduleId)
      .order('order_index');
      
    if (error) {
      console.error('Error fetching challenges:', error);
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch challenges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch challenges' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    if (!params.moduleId) {
      return NextResponse.json(
        { error: 'Module ID is required' },
        { status: 400 }
      );
    }

    if (request.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { error: 'Content type must be application/json' },
        { status: 415 }
      );
    }

    const body = await request.json();
    const validatedData = challengeSchema.parse(body);
    
    const { data, error } = await supabase
      .from('challenges')
      .insert({ ...validatedData, module_id: params.moduleId })
      .select()
      .single();
      
    if (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
    
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to create challenge:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create challenge' },
      { status: 500 }
    );
  }
}