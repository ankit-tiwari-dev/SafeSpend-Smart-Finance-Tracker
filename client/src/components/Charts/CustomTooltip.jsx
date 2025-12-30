const CustomTooltip = (props) => {
  const { active, payload, colors, data } = props;

  if (active && payload && payload.length) {
    const name = payload[0].name;

    const index = data.findIndex((item) => item.name === name);
    const color = colors[index % colors.length];

    return (
      <div className="bg-[var(--color-surface)] backdrop-blur-xl p-4 rounded-2xl border border-[var(--color-border)] shadow-3xl">
        <div className="flex items-center gap-3 mb-3 border-b border-[var(--color-divider)] pb-2">
          <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color: color }} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            {name}
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-20">Value</span>
          <p className="text-xl font-black text-[var(--color-text)] tracking-tighter tabular-nums">
            ₹{payload[0].value.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
