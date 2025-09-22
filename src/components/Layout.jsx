import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <main className="container mx-auto min-h-screen">
          {children}
        </main>
      </div>

      {/* Floating Elements for Visual Appeal */}
      <div className="fixed top-10 left-10 text-6xl opacity-10 animate-pulse-slow pointer-events-none">
        🙏
      </div>
      <div className="fixed bottom-10 right-10 text-4xl opacity-10 animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }}>
        ☸️
      </div>
      <div className="fixed top-1/3 right-20 text-5xl opacity-10 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}>
        🌕
      </div>
    </div>
  );
};

export default Layout;