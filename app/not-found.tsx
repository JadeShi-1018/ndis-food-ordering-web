'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4" style={{ color: "var(--color-main)" }}>404</h1>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-main)" }}>Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              Sorry, the page you are looking for does not exist or has been removed.
            </p>
            <button
              onClick={() => router.back()}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200"
              style={{
                backgroundColor: "var(--color-main)",
                borderColor: "var(--color-main)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 