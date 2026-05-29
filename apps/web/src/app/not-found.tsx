import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C120C] text-[#E8EDDF] p-6">
      <div className="max-w-md w-full bg-[#1A231A] border border-[#2A3B2A] rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-[#F5CB5C]/10 rounded-full flex items-center justify-center border border-[#F5CB5C]/20">
            <FileQuestion className="h-8 w-8 text-[#F5CB5C]" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-[#E8EDDF]">Page Not Found</h2>
          <p className="text-[#8B9D8B] text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block w-full bg-[#F5CB5C] hover:bg-[#E5BB4C] text-[#0C120C] font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Return to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
