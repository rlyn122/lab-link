export default function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
} 