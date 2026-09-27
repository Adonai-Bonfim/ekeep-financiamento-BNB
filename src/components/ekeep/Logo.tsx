import logo from "@/assets/ekeep-logo.png";

import darkLogo from "@/assets/ekeep-logo-dark.png";

export function Logo({ light = false, dark = false }: { light?: boolean; dark?: boolean }) {
  return (
    <span className={`brand-logo ${light ? "brand-logo-footer" : ""}`}>
      {/* Crop only the original canvas margins; preserve the supplied artwork. */}
      <svg
        viewBox="200 296 1355 294"
        role="img"
        aria-label="Ekeep Consultores & Auditores"
        className="block h-auto w-full"
      >
        <image href={dark ? darkLogo : logo} width="1754" height="886" />
      </svg>
    </span>
  );
}
