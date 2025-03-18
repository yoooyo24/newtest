'use client'

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { Info, ArrowDown, UploadIcon, Clock, CircleAlert, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [debug, setDebug] = useState<string>("");

  // Add effect to log state changes
  useEffect(() => {
    console.log('State updated - imageUrl:', imageUrl);
  }, [imageUrl]);

  // Enhanced upload handler with more debugging
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setDebug(`Starting upload of ${file.name} (${file.size} bytes)`);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      console.log('Uploading image:', file.name, file.size);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      console.log('Upload API response:', data);
      setDebug(prev => `${prev}\nAPI response: ${JSON.stringify(data)}`);
      
      if (data.success && data.imageUrl) {
        console.log('Setting image URL:', data.imageUrl);
        setImageUrl(data.imageUrl);
        setDebug(prev => `${prev}\nImage URL set: ${data.imageUrl}`);
        
        // Force refresh component
        setTimeout(() => {
          console.log('Forced refresh - current imageUrl:', data.imageUrl);
        }, 100);
      } else {
        console.error('Upload failed:', data.error);
        setDebug(prev => `${prev}\nUpload failed: ${data.error || 'Unknown error'}`);
        alert('Failed to upload image: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setDebug(prev => `${prev}\nError: ${error}`);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // For transforming
  const handleTransform = async () => {
    if (!imageUrl || !prompt.trim()) return;
    
    setIsTransforming(true);
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl, prompt }),
      });
      
      const data = await response.json();
      if (data.success && data.transformedImageUrl) {
        setTransformedImageUrl(data.transformedImageUrl);
        // Handle successful transformation
      } else {
        console.error('Transformation failed:', data.error);
        // Handle error
      }
    } catch (error) {
      console.error('Error transforming image:', error);
      // Handle error
    } finally {
      setIsTransforming(false);
    }
  };

  // Handle file selection via button click
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Handle example prompt click
  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                  <path d="m14 7 3 3"></path>
                  <path d="M5 6v4"></path>
                  <path d="M19 14v4"></path>
                  <path d="M10 2v2"></path>
                  <path d="M7 8H3"></path>
                  <path d="M21 16h-4"></path>
                  <path d="M11 3H9"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
              Transform Images with AI
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Upload an image below, write a prompt, get results instantly.
            </p>
            <div className="flex justify-center mb-2">
              <ArrowDown className="h-6 w-6 text-blue-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-6">
        <div className="blue-container">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-200">
              Content moderation has been disabled for this application. Please use responsibly.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Debug panel - add this for troubleshooting */}
        <div className="mb-8 p-4 bg-gray-800 rounded-md">
          <h3 className="text-white font-medium mb-2">Debug Info:</h3>
          <div className="bg-black p-3 rounded text-green-400 font-mono text-sm">
            <p>Image URL: {imageUrl || 'none'}</p>
            <p>Upload state: {isUploading ? 'Uploading...' : 'Idle'}</p>
            <pre className="whitespace-pre-wrap">{debug}</pre>
          </div>
        </div>
        
        <div className="space-y-16">
          <section className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
              Start here
            </div>
            <div className="ring-4 ring-blue-500 ring-opacity-50 rounded-xl">
              <div className="w-full max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-800">
                  <h2 className="text-lg sm:text-xl font-bold text-white">Transform your image</h2>
                  {imageUrl && (
                    <div className="mt-2 text-sm text-blue-400">
                      Image URL: {imageUrl.substring(0, 50)}...
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  {!imageUrl ? (
                    <div className="upload-area">
                      {/* Hidden file input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                      />
                      <UploadIcon className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400 animate-pulse" />
                      <p className="text-xl sm:text-2xl font-medium text-white">DROP IMAGE HERE</p>
                      <Button 
                        className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium cursor-pointer flex items-center justify-center"
                        onClick={handleFileButtonClick}
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'or click to browse files'}
                      </Button>
                      <p className="text-sm sm:text-base text-gray-400 mt-3 sm:mt-4">
                        Supports: JPG, PNG, GIF (max 2MB)
                      </p>
                      <div className="mt-2 sm:mt-3 text-sm sm:text-base text-amber-400 bg-amber-900 bg-opacity-30 p-2 sm:p-3 rounded-md flex items-start">
                        <CircleAlert className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-left">
                          Images larger than 2MB will be automatically resized to prevent API errors.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="uploaded-image-container">
                      <h3 className="text-white mb-4">Uploaded Image:</h3>
                      
                      {/* Very simple image display */}
                      <div className="border border-blue-500 p-2 mb-4">
                        <img 
                          src={imageUrl} 
                          alt="Uploaded image" 
                          className="mx-auto max-h-80"
                          onError={(e) => {
                            console.error("Image failed to load");
                            setDebug(prev => `${prev}\nImage failed to load from URL: ${imageUrl}`);
                            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Image+Load+Error";
                          }}
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <Button
                          variant="outline"
                          className="text-gray-300 border-gray-700 hover:bg-gray-800"
                          onClick={() => {
                            setImageUrl(null);
                            setTransformedImageUrl(null);
                            setDebug(prev => `${prev}\nImage removed by user`);
                          }}
                        >
                          Remove image
                        </Button>
                        <Button
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                          onClick={handleFileButtonClick}
                        >
                          Upload different image
                        </Button>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-900 bg-opacity-20 rounded-md border border-blue-800 text-blue-200 text-sm">
                        <p>Image uploaded successfully! Now enter a prompt below to transform it.</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 sm:mt-8">
                    <label htmlFor="prompt" className="block text-base sm:text-lg font-medium text-white mb-2">
                      What would you like to do with this image?
                    </label>
                    <textarea
                      id="prompt"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Describe how you want to transform the image..."
                      rows={4}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />

                    <div className="mt-4 sm:mt-6">
                      <p className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">
                        Try one of these examples:
                      </p>
                      <Tabs defaultValue="style" className="w-full">
                        <TabsList className="flex flex-wrap border-b border-gray-700 mb-3 sm:mb-4 bg-transparent">
                          <TabsTrigger
                            value="style"
                            className="px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 rounded-none bg-transparent"
                          >
                            Style Transfer
                          </TabsTrigger>
                          <TabsTrigger
                            value="effects"
                            className="px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 rounded-none bg-transparent"
                          >
                            Effects
                          </TabsTrigger>
                          <TabsTrigger
                            value="adjustments"
                            className="px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-300 rounded-none bg-transparent"
                          >
                            Adjustments
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="style" className="mt-0">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Make it look like a watercolor painting")}
                            >
                              Make it look like a watercolor painting
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Convert to oil painting style")}
                            >
                              Convert to oil painting style
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Transform into a sketch drawing")}
                            >
                              Transform into a sketch drawing
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Make it look like a comic book illustration")}
                            >
                              Make it look like a comic book illustration
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="effects" className="mt-0">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Add a vignette effect")}
                            >
                              Add a vignette effect
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Apply a vintage filter")}
                            >
                              Apply a vintage filter
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Create a duotone effect")}
                            >
                              Create a duotone effect
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="adjustments" className="mt-0">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Increase contrast and vibrance")}
                            >
                              Increase contrast and vibrance
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Fix lighting and white balance")}
                            >
                              Fix lighting and white balance
                            </Button>
                            <Button 
                              variant="outline" 
                              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-colors border-none"
                              onClick={() => handleExampleClick("Sharpen and enhance details")}
                            >
                              Sharpen and enhance details
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <Button 
                      disabled={!imageUrl || !prompt || isTransforming} 
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium text-lg sm:text-xl"
                      onClick={handleTransform}
                    >
                      <span>{isTransforming ? 'Transforming...' : 'Transform Image'}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Button>
                    <div className="mt-3 sm:mt-4 text-center">
                      <p className="text-gray-400 text-sm sm:text-base flex items-center justify-center">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Processing may take 10-20 seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Display transformation results if available */}
          {transformedImageUrl && imageUrl && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8 text-white">Transformation Result</h2>
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-lg text-white mb-3">Original Image</h3>
                    <div className="relative w-full h-64 bg-gray-800 rounded-md overflow-hidden">
                      {imageUrl.startsWith('https://example.com') ? (
                        <div className="flex items-center justify-center h-full bg-gray-800 text-white">
                          <p className="text-center">Original Image</p>
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src={imageUrl}
                            alt="Original image" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-white mb-3">Transformed Image</h3>
                    <div className="relative w-full h-64 bg-gray-800 rounded-md overflow-hidden">
                      {transformedImageUrl.startsWith('https://example.com') ? (
                        <div className="flex items-center justify-center h-full bg-gray-800 text-white">
                          <div className="text-center">
                            <div className="bg-blue-600 rounded-full p-3 mx-auto mb-3">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
                                <path d="m14 7 3 3"></path>
                              </svg>
                            </div>
                            <p className="text-lg font-medium">Transformation Complete!</p>
                            <p className="text-sm text-gray-400">Using prompt: {prompt}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <img
                            src={transformedImageUrl}
                            alt="Transformed image"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                    onClick={() => {
                      // In a real app, this would download the image
                      alert('Download functionality would be implemented here');
                    }}
                  >
                    Download Transformed Image
                  </Button>
                </div>
              </div>
            </section>
          )}

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 text-center">
                <div className="step-number">1</div>
                <h3 className="font-bold text-lg mb-3 text-white">Upload an image</h3>
                <p className="text-gray-300 text-base">
                  Select or drag & drop any image from your device. Images larger than 2MB will be automatically resized.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 text-center">
                <div className="step-number">2</div>
                <h3 className="font-bold text-lg mb-3 text-white">Describe the transformation</h3>
                <p className="text-gray-300 text-base">
                  Tell us how you want to transform your image. Choose from example prompts or write your own.
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 text-center">
                <div className="step-number">3</div>
                <h3 className="font-bold text-lg mb-3 text-white">Get your result</h3>
                <p className="text-gray-300 text-base">
                  Our AI will transform your image based on your prompt. Download, copy, or compare with the original.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="max-w-5xl mx-auto blue-container p-6">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-300">
                Common Issues & Solutions
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-800">
                  <h3 className="font-medium text-lg text-blue-300 mb-2">Image Size Limits</h3>
                  <p className="text-base text-blue-100">
                    Images larger than 2MB will be automatically resized to prevent API errors. For best results, use clear images under 2MB.
                  </p>
                </div>
                <div className="bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-800">
                  <h3 className="font-medium text-lg text-blue-300 mb-2">Content Moderation</h3>
                  <p className="text-base text-blue-100">
                    While content moderation has been disabled, some images may still be rejected by the API. If this happens, try a different image or modify your prompt.
                  </p>
                </div>
                <div className="bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-800">
                  <h3 className="font-medium text-lg text-blue-300 mb-2">Server Errors (500)</h3>
                  <p className="text-base text-blue-100">
                    If you encounter a 500 error, it's often due to temporary API issues. Try again later or with a different image.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
