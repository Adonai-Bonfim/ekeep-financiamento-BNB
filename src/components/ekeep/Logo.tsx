import logo from "@/assets/ekeep-logo.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-logo ${light ? "brand-logo-footer" : ""}`}>
      {/* Crop only the original canvas margins; preserve the supplied artwork. */}
      <svg
        viewBox="200 296 1355 294"
        role="img"
        aria-label="Ekeep Consultores & Auditores"
        className="block h-auto w-full"
      >
        <image href={logo} width="1754" height="886" />
      </svg>
    </span>
  );
}
