import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Spinning Lotus */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-holy-green/20 border-t-holy-green rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg animate-pulse">🙏</span>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <p className="text-gray-600 font-medium">กำลังดึงข้อมูลวันพระ...</p>
        <p className="text-sm text-gray-500 mt-1">โปรดรอสักครู่</p>
      </div>
      
      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-holy-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-holy-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-holy-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;