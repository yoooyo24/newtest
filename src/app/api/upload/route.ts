import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image file provided' }, 
        { status: 400 }
      );
    }
    
    // In development, simulate upload by returning a mock URL
    // In production, you would upload to a storage service
    const fileName = `${uuidv4()}.jpg`;
    const imageUrl = `https://example.com/uploads/${fileName}`;
    
    // For development, return the original image as the URL
    // In production, use a real storage service
    return NextResponse.json({ 
      success: true,
      imageUrl 
    });
    
  } catch (error: any) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Error uploading file', details: error.message }, 
      { status: 500 }
    );
  }
}