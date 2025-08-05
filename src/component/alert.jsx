import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function InsufficientFundsModal({ show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1500); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center animate-fade-in">
        <div className="flex flex-col items-center">
          <AlertTriangle className="text-yellow-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-800">Insufficient Funds</h2>
          <p className="text-gray-600 mt-2">You don’t have enough balance to complete this transaction.</p>
        </div>
      </div>
    </div>
  );
}