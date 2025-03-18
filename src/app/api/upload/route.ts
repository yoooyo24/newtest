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
    
    // Instead of using an external placeholder service, use a relative URL
    // to a local placeholder in the public directory
    const randomId = Math.floor(Math.random() * 1000);
    
    // Using a relative URL to a local placeholder image
    const imageUrl = `/placeholder-${randomId % 3 + 1}.jpg`;
    
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