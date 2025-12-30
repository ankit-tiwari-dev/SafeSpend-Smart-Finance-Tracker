const ConfirmAlert = (props) => {
  const { content, onConfirm, confirmContent, color } = props;

  return (
    <div className="space-y-8">
      <p className="text-sm font-bold leading-relaxed text-[var(--color-text-muted)] opacity-80">
        {content}
      </p>

      <div className="flex justify-end mt-10">
        <button
          type="button"
          className={`px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] rounded-2xl cursor-pointer ${color === 'error' ? 'bg-[var(--color-chart-4)] shadow-[var(--color-chart-4)]/20 hover:bg-[var(--color-chart-4)]/90' : 'bg-primary shadow-primary/20 hover:bg-primary/90'
            }`}
          onClick={onConfirm}
        >
          {confirmContent}
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
