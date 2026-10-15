import { profile } from "../content/portfolio";
export default function ContactLinks() {
  const links = [
    [profile.email ? `mailto:${profile.email}` : "", "Email"],
    [profile.github, "GitHub"],
    [profile.linkedin, "LinkedIn"],
  ].filter(([href]) => href);
  return links.length ? (
    <nav
      className="contact-links"
      aria-label="Contact and professional profiles"
    >
      {links.map(([href, label]) => (
        <a
          key={label}
          href={href}
          {...(href.startsWith("https:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
          {href.startsWith("https:") && (
            <span className="sr-only"> (opens in a new tab)</span>
          )}
        </a>
      ))}
    </nav>
  ) : null;
}
