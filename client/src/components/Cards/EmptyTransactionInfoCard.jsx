import React from "react";
import { LuScan, LuDatabase } from "react-icons/lu";

const EmptyTransactionInfoCard = ({ title, description }) => {
  return (
    <div className="relative w-full py-20 px-6 flex flex-col items-center justify-center bg-white/[0.02] border border-dashed border-white/10 rounded-[32px] overflow-hidden group">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
        <div className="relative w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center overflow-hidden">
          <LuDatabase className="text-primary/40 text-3xl" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/60 shadow-[0_0_15px_var(--color-primary)] animate-[scan-line_3s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="text-center relative z-10">
        <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)] opacity-80 mb-2">
          {title || "No Data Synchronized"}
        </h3>
        <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-widest text-[var(--color-text-muted)] opacity-40 max-w-[240px] leading-relaxed">
          {description || "Awaiting incoming telemetry. Initiate transaction protocol to begin analysis."}
        </p>
      </div>

      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
    </div>
  );
};

export default EmptyTransactionInfoCard;