// components/TransformationLoading.tsx
import React from 'react';

interface TransformationLoadingProps {
  progress?: number;
}

const TransformationLoading: React.FC<TransformationLoadingProps> = ({ progress = 0 }) => {
  // Format progress as a percentage
  const progressText = `${Math.round(progress)}%`;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-blue-500 border-opacity-20 rounded-full"></div>
          <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">Transforming your image...</h3>
        <p className="text-blue-400 mb-6">AI is working its magic... {progressText}</p>
        
        {/* Progress bar */}
        <div className="h-2 w-full bg-gray-700 rounded-full mb-6">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-gray-400 text-sm mb-6">This usually takes 10-20 seconds</p>
        
        <div className="blue-container p-4 mb-6">
          <p className="text-sm text-blue-300">
            Please wait while our AI processes your image. The transformation is happening in real-time and requires complex processing.
          </p>
        </div>
        
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TransformationLoading;