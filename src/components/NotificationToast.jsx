import React from 'react';

export default function NotificationToast({ show, message, onClose, type = 'success' }) {
  if (!show) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${getToastStyles()}`}>
        <span className="text-lg">{getIcon()}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
} 