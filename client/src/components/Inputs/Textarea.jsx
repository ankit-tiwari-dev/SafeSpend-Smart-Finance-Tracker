const Textarea = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    allowInput = true,
    rows = 8,
  } = props;

  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text)] opacity-40 mb-3 ml-1">
        {label}
      </label>

      <div className="input-box">
        <textarea
          placeholder={placeholder}
          className="w-full bg-transparent outline-none resize-none placeholder-gray-400 dark:placeholder-gray-500"
          style={{
            color: "var(--color-text)",
          }}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={!allowInput}
          rows={rows}
        />
      </div>
    </div>
  );
};

export default Textarea;
