import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, X, Heart } from "lucide-react";

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type || "info"}`}>
      <div className="toast-icon">
        {toast.type === "add" ? (
          <Heart size={18} className="toast-heart-filled" />
        ) : toast.type === "remove" ? (
          <AlertCircle size={18} />
        ) : (
          <CheckCircle size={18} />
        )}
      </div>
      <span className="toast-text">{toast.message}</span>
      <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss toast">
        <X size={15} />
      </button>
    </div>
  );
};
