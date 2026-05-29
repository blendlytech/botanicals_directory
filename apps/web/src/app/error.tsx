"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Global App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C120C] text-[#E8EDDF] p-6">
      <div className="max-w-md w-full bg-[#1A231A] border border-[#2A3B2A] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#F5CB5C]">Something went wrong!</h2>
          <p className="text-[#8B9D8B] text-sm leading-relaxed">
            We encountered an unexpected error. Our team has been notified.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#F5CB5C] hover:bg-[#E5BB4C] text-[#0C120C] font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="flex-1 bg-transparent hover:bg-[#2A3B2A] text-[#E8EDDF] border border-[#2A3B2A] font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
