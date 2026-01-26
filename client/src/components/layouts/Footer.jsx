import React from "react";
import { Link } from "react-router-dom";
import { LuChartPie, LuTwitter, LuLinkedin, LuInstagram, LuFacebook } from "react-icons/lu";

const Footer = () => {
  const socialIcons = [
    { Icon: LuTwitter, label: "Twitter" },
    { Icon: LuLinkedin, label: "LinkedIn" },
    { Icon: LuInstagram, label: "Instagram" },
    { Icon: LuFacebook, label: "Facebook" },
  ];

  return (
    <footer className="py-24 px-10 border-t border-[var(--color-border)] mt-32 relative overflow-hidden bg-gradient-to-b from-transparent to-[var(--color-bg)]">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-[1000px] h-96 bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
        {/* Branding Section */}
        <div className="space-y-8 max-w-sm">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--color-brand-logo)] rounded-2xl flex items-center justify-center shadow-2xl shadow-[0_8px_32px_color-mix(in_srgb,var(--color-brand-logo),transparent_80%)] group-hover:rotate-[15deg] transition-transform duration-500">
              <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-xl" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[var(--color-text)] uppercase">SafeSpend</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 leading-none mt-1">Institutional Grade</span>
            </div>
          </div>
          <p className="text-sm font-medium leading-relaxed text-[var(--color-text-muted)]">
            The definitive financial command center for the modern era. Secure. Precise. Boundless. Master your wealth with SafeSpend.
          </p>

          <div className="flex gap-4">
            {socialIcons.map(({ Icon, label }, i) => (
              <a
                key={i}
                href="#"
                aria-label={label}
                className="w-10 h-10 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-50 mb-8 px-1 border-l-2 border-primary/20">Protocols</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Neural Hub</Link></li>
              <li><Link to="/insights" className="hover:text-primary transition-colors">AI Insights</Link></li>
              <li><Link to="/goals" className="hover:text-primary transition-colors">Targeting</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-50 mb-8 px-1 border-l-2 border-primary/20">Ecosystem</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
              <li><a href="#" className="hover:text-primary transition-colors">Repository</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terminal API</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-primary transition-colors">Feedback</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-50 mb-8 px-1 border-l-2 border-primary/20">Signal</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
              <li className="flex flex-col gap-1">
                <span className="text-[8px] opacity-40">Secure Email</span>
                <span className="text-[var(--color-text)] opacity-60">ops@safespend.ai</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[8px] opacity-40">Encryption Hub</span>
                <span className="text-[var(--color-text)] opacity-60">SF // HQ // 001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Legal Section */}
      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-[var(--color-divider)] flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-50">Protocol Secured // AES-256</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-20">
          &copy; {new Date().getFullYear()} SafeSpend Tech. All systems operational.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
