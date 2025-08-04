// src/components/Loading.tsx
import ReactDOM from "react-dom";
import { useLoadingStore } from "../store";

const Loading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  

  if (!isLoading) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 bg-opacity-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>,
    document.body
  );
};

export default Loading;
