const ConfirmAlert = ({ content, onConfirm, confirmContent, color }) => {
  const buttonClasses = `
    px-8 py-3 text-sm font-black uppercase tracking-widest text-white 
    transition-all shadow-lg rounded-2xl cursor-pointer 
    hover:scale-[1.02] active:scale-[0.98] 
    ${color === "error"
      ? "bg-[var(--color-chart-4)] shadow-[var(--color-chart-4)]/20 hover:bg-[var(--color-chart-4)]/90"
      : "bg-primary shadow-primary/20 hover:bg-primary/90"
    }
  `;

  return (
    <div className="space-y-8">
      <p className="text-sm font-bold leading-relaxed text-[var(--color-text-muted)] opacity-80">
        {content}
      </p>

      <div className="flex justify-end mt-10">
        <button type="button" className={buttonClasses} onClick={onConfirm}>
          {confirmContent}
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
