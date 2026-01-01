const Textarea = ({
  value,
  onChange,
  label,
  placeholder,
  allowInput = true,
  rows = 6,
}) => {
  return (
    <div className="w-full">
      {/* Label */}
      <label
        className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text)] opacity-40 mb-2 ml-1"
      >
        {label}
      </label>

      {/* Textarea wrapper */}
      <div className="relative">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={!allowInput}
          rows={rows}
          className="w-full bg-transparent outline-none resize-none border border-[var(--color-border)] rounded-xl p-3 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-[var(--color-text)]"
        />

        {/* Optional character count (you can enable later) */}
        {/* <span className="absolute bottom-1 right-2 text-[8px] text-gray-400">
          {value.length}/200
        </span> */}
      </div>
    </div>
  );
};

export default Textarea;
