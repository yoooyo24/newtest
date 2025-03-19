import React, { useState } from 'react';
// Import directly without destructuring
import ErrorMessage from './ErrorMessage';

// Define as function declaration
function ErrorMessageTest() {
  const [showShortError, setShowShortError] = useState(false);
  const [showLongError, setShowLongError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAutoClose, setShowAutoClose] = useState(false);

  const shortErrorMessage = "Failed to transform image. Please try again.";
  const longErrorMessage = "API rate limit exceeded. You have reached the maximum number of requests allowed within the time period. Please wait a few minutes before trying again or contact support if you believe this is an error. Reference ID: ERR-12345-ABCDEF";
  const warningMessage = "Your prompt may contain content that could result in unexpected transformations.";
  const infoMessage = "Transformation in progress. This might take up to 30 seconds depending on image complexity.";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Error UI Testing</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => setShowShortError(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Short Error
        </button>
        
        <button
          onClick={() => setShowLongError(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Show Long Error
        </button>
        
        <button
          onClick={() => setShowWarning(true)}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          Show Warning
        </button>
        
        <button
          onClick={() => setShowInfo(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Show Info
        </button>
        
        <button
          onClick={() => setShowAutoClose(true)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Show Auto-close Error (5s)
        </button>
      </div>
      
      {showShortError && (
        <ErrorMessage
          message={shortErrorMessage}
          onClose={() => setShowShortError(false)}
        />
      )}
      
      {showLongError && (
        <ErrorMessage
          message={longErrorMessage}
          onClose={() => setShowLongError(false)}
        />
      )}
      
      {showWarning && (
        <ErrorMessage
          message={warningMessage}
          type="warning"
          onClose={() => setShowWarning(false)}
        />
      )}
      
      {showInfo && (
        <ErrorMessage
          message={infoMessage}
          type="info"
          onClose={() => setShowInfo(false)}
        />
      )}
      
      {showAutoClose && (
        <ErrorMessage
          message="This error will automatically close in 5 seconds."
          autoClose={true}
          onClose={() => setShowAutoClose(false)}
        />
      )}
    </div>
  );
}

// Only use default export, no named exports
export default ErrorMessageTest;
