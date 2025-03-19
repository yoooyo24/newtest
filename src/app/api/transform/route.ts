import { NextResponse } from 'next/server';

// Add this at the top of your file to enable/disable error simulation
const ENABLE_ERROR_SIMULATION = true;
const ERROR_PROBABILITY = 0.8; // 80% chance of error for testing

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

    // Simulate random API errors for testing
    if (ENABLE_ERROR_SIMULATION) {
      // Generate random number to determine if we should simulate an error
      const shouldSimulateError = Math.random() < ERROR_PROBABILITY;
      
      if (shouldSimulateError) {
        // Define different types of errors we want to simulate
        const errorTypes = [
          { 
            code: 'rate_limit_exceeded', 
            message: 'API rate limit exceeded. Please try again in a few minutes.',
            status: 429
          },
          { 
            code: 'invalid_prompt', 
            message: 'Your prompt contains prohibited content or is too complex.',
            status: 400
          },
          { 
            code: 'processing_error', 
            message: 'Our AI encountered an error when processing your image. Please try with a different image.',
            status: 500
          },
          { 
            code: 'service_unavailable', 
            message: 'The transformation service is currently unavailable. Please try again later.',
            status: 503
          }
        ];
        
        // Pick a random error type
        const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        
        console.log(`Simulating API error: ${randomError.code}`);
        
        // Return the error response
        return NextResponse.json({ 
          success: false,
          error: randomError.code,
          message: randomError.message 
        }, { status: randomError.status });
      }
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
      { 
        success: false,
        error: 'transformation_failed', 
        message: 'An unexpected error occurred during transformation.',
        details: errorMessage 
      }, 
      { status: 500 }
    );
  }
}