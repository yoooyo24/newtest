import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl, prompt } = await request.json();

    if (!imageUrl || !prompt) {
      return NextResponse.json(
        { error: 'Image URL and prompt are required' }, 
        { status: 400 }
      );
    }

    // In development/testing mode, return a mock response
    console.log('Simulating image transformation');
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({ 
      success: true,
      transformedImageUrl: imageUrl, // Return original image as mock
      originalPrompt: prompt,
      enhancedPrompt: `Enhanced: ${prompt}`
    });
    
  } catch (error: Error | unknown) {
    console.error('Error transforming image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Error transforming image', details: errorMessage }, 
      { status: 500 }
    );
  }
}