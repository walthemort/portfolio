import Link from "next/link";
import Navigation from "../components/navigation";
import ThemeSwitch from "../components/theme-switch";
import { profile } from "../content/portfolio";
import "./globals.css";

export const metadata = {
  title: {
    default: "Projects — Jonathan Walther",
    template: "%s — Jonathan Walther",
  },
  description: "Projects, interactive experiments, and CV.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body id="top">
        <div className="scroll-progress" aria-hidden="true" />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link
            className="identity"
            href="/"
            aria-label={`${profile.name} — projects`}
          >
            <span className="brand-name">{profile.name}</span>
          </Link>
          <div className="header-actions">
            <Navigation />
            <ThemeSwitch />
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-signature">
            <Link href="/" aria-label="Jonathan Walther — projects">
              <span className="brand-name">{profile.name}</span>
            </Link>
            <a className="back-top" href="#top" aria-label="Back to top">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 20V4M5 11l7-7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
          <div className="footer-meta">
            <span>Personal archive / Jonathan Walther</span>
            <span>Projects · Experiments · CV</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
