import { NextResponse } from 'next/server';

type TransformRequestData = {
  imageUrl: string;
  prompt: string;
};

type TransformResponseData = {
  success: boolean;
  transformedImageUrl: string;
  originalPrompt: string;
  enhancedPrompt: string;
};

// Updated helper to parse JSON without a direct "any" cast.
async function parseJson<T>(request: Request): Promise<T> {
  const raw: unknown = await request.json();
  return raw as T;
}

export async function POST(request: Request) {
  try {
    // Parse request data with type safety
    const data = await parseJson<Partial<TransformRequestData>>(request);
    
    if (!data.imageUrl || !data.prompt) {
      return NextResponse.json(
        { error: 'Image URL and prompt are required' },
        { status: 400 }
      );
    }

    // In development/testing mode, return a mock response
    console.log('Simulating image transformation');
    
    // Simulate processing delay with an explicitly typed resolver
    await new Promise<void>((resolve: () => void) => setTimeout(resolve, 2000));
    
    const responseData: TransformResponseData = {
      success: true,
      transformedImageUrl: data.imageUrl,
      originalPrompt: data.prompt,
      enhancedPrompt: `Enhanced: ${data.prompt}`
    };
    
    return NextResponse.json(responseData);
    
  } catch (error: unknown) {
    console.error('Error transforming image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Error transforming image', details: errorMessage },
      { status: 500 }
    );
  }
}