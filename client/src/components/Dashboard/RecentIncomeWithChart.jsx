// Replace the return section of your RecentIncomeWithChart.jsx
return (
  <section className="flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 lg:p-10 shadow-2xl relative w-full overflow-hidden">
    {/* Section Title matching image reference */}
    <div className="w-full flex items-center justify-between mb-6 px-2">
      <h5 className="text-[10px] font-black uppercase tracking-[0.45em] text-[var(--color-text)]">
        Inflow Streams <span className="text-primary/40 ml-2">// Analysis</span>
      </h5>
      <div className="flex gap-1 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <div className="w-4 h-1.5 rounded-full bg-primary" />
      </div>
    </div>

    {data.length === 0 ? (
      <EmptyTransactionInfoCard 
        title="No Income Records" 
        description="Your income transactions will appear here." 
      />
    ) : (
      <>
        <div className="relative w-full aspect-square max-w-[280px] mx-auto my-4">
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`₹${formatCompactAmount(totalIncome)}`}
            colors={CHART_COLORS}
          />
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {chartData.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all group">
              <div className="flex items-center gap-1.5 mb-1 text-[8px] font-black uppercase tracking-widest text-primary/60">
                <div className="w-1 h-1 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                {item.name}
              </div>
              <span className="text-sm font-black text-[var(--color-text)] tracking-tighter">
                ₹{formatCompactAmount(item.raw)}
              </span>
            </div>
          ))}
        </div>
      </>
    )}
  </section>
);