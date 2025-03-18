import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image file provided' }, 
        { status: 400 }
      );
    }
    
    // Simulate upload by returning a mock URL
    const randomId = Math.random().toString(36).substring(2, 15);
    const imageUrl = `https://example.com/uploads/${randomId}.jpg`;
    
    return NextResponse.json({ 
      success: true,
      imageUrl 
    });
    
  } catch (error: unknown) {
    console.error('Error handling file upload:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Error uploading file', details: errorMessage }, 
      { status: 500 }
    );
  }
}