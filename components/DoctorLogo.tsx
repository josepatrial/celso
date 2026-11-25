import { DOCTOR_INFO } from "@/lib/constants";

export function DoctorLogo({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="flex items-center gap-3.5 group select-none">
      {/* Bespoke Vector Monogram Shield */}
      <div className="relative w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-[#0E223D] via-[#1A385C] to-[#245C83] p-[1.5px] shadow-[0_4px_16px_rgba(14,34,61,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_20px_rgba(20,45,80,0.22)]">
        <div className="w-full h-full rounded-[14px] bg-[#0E223D] flex items-center justify-center overflow-hidden relative">
          {/* Subtle inner light refraction */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 -right-3 w-8 h-8 rounded-full bg-light-blue/20 blur-sm"
          />

          <svg
            viewBox="0 0 38 38"
            fill="none"
            className="w-7 h-7"
            aria-hidden="true"
          >
            {/* Elegant Caduceus / Cellular curve of 'C' */}
            <path
              d="M15 11C10.5 11 7 14.5 7 19C7 23.5 10.5 27 15 27C18.2 27 20.8 25.1 21.8 22.3"
              stroke="#EAF4F8"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Bold Precision 'M' */}
            <path
              d="M17 27V12L23 20L29 12V27"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Scientific point */}
            <circle cx="29" cy="8.5" r="1.8" fill="#56B4E9" />
          </svg>
        </div>
      </div>

      {/* Hairline Divider */}
      <div
        className={`h-8 w-[1px] hidden sm:block ${
          isDark ? "bg-white/15" : "bg-border-subtle"
        }`}
      />

      {/* Typographic Lockup */}
      <div className="leading-tight">
        <span
          className={`block font-serif text-[21px] sm:text-[23px] font-bold tracking-tight transition-colors ${
            isDark
              ? "text-white group-hover:text-light-blue"
              : "text-navy group-hover:text-institutional"
          }`}
        >
          {DOCTOR_INFO.name}
        </span>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] text-institutional uppercase">
            Hematologia
          </span>
          <span
            className={`text-[9px] ${
              isDark ? "text-white/30" : "text-border-subtle"
            }`}
          >
            •
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase ${
              isDark ? "text-white/80" : "text-text-muted"
            }`}
          >
            TMO
          </span>
          <span
            className={`text-[9px] ${
              isDark ? "text-white/30" : "text-border-subtle"
            }`}
          >
            •
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase ${
              isDark ? "text-white/60" : "text-text-muted/90"
            }`}
          >
            {DOCTOR_INFO.crm}
          </span>
        </div>
      </div>
    </div>
  );
}
