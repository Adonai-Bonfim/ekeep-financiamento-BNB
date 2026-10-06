import logo from "@/assets/ekeep-logo-transparent.png";

export function HeaderLogo() {
  return (
    <span className="brand-logo">
      <svg
        viewBox="145 290 1380 345"
        role="img"
        aria-label="Ekeep Consultores & Auditores"
        className="block h-auto w-full"
      >
        <image href={logo} width={1672} height={941} />
      </svg>
    </span>
  );
}
