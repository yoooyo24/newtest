// src/components/ErrorMessage.tsx
import React, { useEffect } from 'react';
// Change how we import Heroicons
import * as HeroIcons from '@heroicons/react/24/outline';

// Define the props interface
interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

// Export as a named export instead of default
export function ErrorMessage({
  message,
  type = 'error',
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
}: ErrorMessageProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);

  const bgColor = 
    type === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
    type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
    'bg-blue-50 dark:bg-blue-900/20';
    
  const textColor = 
    type === 'error' ? 'text-red-800 dark:text-red-200' :
    type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
    'text-blue-800 dark:text-blue-200';
    
  const borderColor = 
    type === 'error' ? 'border-red-200 dark:border-red-800' :
    type === 'warning' ? 'border-yellow-200 dark:border-yellow-800' :
    'border-blue-200 dark:border-blue-800';

  return (
    <div className={`p-4 mb-4 rounded-lg flex items-center justify-between ${bgColor} ${borderColor} border`}>
      <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      <button 
        onClick={onClose}
        className={`ml-2 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${textColor} hover:bg-opacity-20 hover:bg-gray-500`}
      >
        <span>✕</span>
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
}

// Also add a default export to support both import styles
export default ErrorMessage;