import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { moduleSchema } from '@/lib/utils/validation';
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
    const { data, error } = await supabase
      .from('modules')
      .select('*, challenges(*)')
      .eq('id', params.moduleId)
      .single();
      
    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch module' },
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
    const validatedData = moduleSchema.parse(body);
    
    const { data, error } = await supabase
      .from('modules')
      .update(validatedData)
      .eq('id', params.moduleId)
      .select()
      .single();
      
    if (error) throw error;
    if (!data) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update module' },
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
      .from('modules')
      .delete()
      .eq('id', params.moduleId);
      
    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete module' },
      { status: 500 }
    );
  }
}