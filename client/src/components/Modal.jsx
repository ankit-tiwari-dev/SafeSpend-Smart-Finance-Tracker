import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const Modal = (props) => {
  const { isOpen, onClose, title, children } = props;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Absolute Backdrop */}
      <div
        className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        {/* Decorative Gloss */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Modal content */}
        <div className="relative">
          {/* Modal header */}
          <div className="flex items-center justify-between p-8 md:p-10 border-b border-[var(--color-divider)]">
            <h3 className="text-xl font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
              {title}
            </h3>

            <button
              type="button"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] bg-[var(--color-divider)] hover:bg-[var(--color-surface-hover)] rounded-2xl text-sm w-12 h-12 inline-flex items-center justify-center transition-all duration-300 border border-[var(--color-border)] shadow-sm cursor-pointer"
              onClick={onClose}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-8 md:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
