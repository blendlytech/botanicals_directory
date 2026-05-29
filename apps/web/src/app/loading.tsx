export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C120C]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#2A3B2A] border-t-[#F5CB5C] rounded-full animate-spin"></div>
        <p className="text-[#8B9D8B] font-medium tracking-wide animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
