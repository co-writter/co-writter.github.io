import React, { ReactNode } from 'react';
import { BORDER_CLASS } from '../constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full h-full'
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        className={`bg-brand-card-dark rounded-md shadow-2xl p-6 relative w-full ${sizeClasses[size]} border ${BORDER_CLASS} border-opacity-75 animate-modalShow ring-1 ring-black/5`}
        onClick={e => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-3xl leading-none p-1 w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-card-dark"
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 id="modal-title" className={`text-2xl font-semibold text-white mb-4 border-b ${BORDER_CLASS} pb-3`}>{title}</h2>}
        <div className="text-neutral-300 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;