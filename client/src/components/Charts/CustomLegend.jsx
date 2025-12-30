const CustomLegend = (props) => {
  const { payload } = props;

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 mb-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-3 group cursor-default">
          <div
            className="w-2 h-2 rounded-full transition-transform group-hover:scale-150 duration-300"
            style={{
              backgroundColor: entry.color
            }}
          />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] group-hover:text-white transition-colors duration-300">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
