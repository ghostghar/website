"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-white font-sans">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">
            ⚠️
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Application Error
          </h1>
          <p className="text-gray-600 text-sm max-w-md mb-6 leading-relaxed">
            {error.message || "A critical error occurred in the application layout."}
          </p>
          <button
            onClick={() => reset()}
            className="bg-[#ED1C24] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#C8151C] transition-colors shadow-sm"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
