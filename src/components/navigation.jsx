"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "Projects", "01"],
  ["/experiments", "Experiments", "02"],
  ["/cv", "CV", "03"],
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Portfolio sections">
      {links.map(([href, label, number]) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
        >
          <span className="nav-number">{number}</span>
          {label}
          <span className="nav-dot" aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
