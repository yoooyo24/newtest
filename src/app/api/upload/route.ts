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
    
    // Guaranteed working image URL - using placeholder.com instead of unsplash 
    // to avoid any potential CORS or availability issues
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://via.placeholder.com/800x600?text=Image+${randomId}`;
    
    console.log('Returning mock image URL:', imageUrl);
    
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