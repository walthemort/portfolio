import Link from "next/link";
import Navigation from "../components/navigation";
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
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <Link
            className="identity"
            href="/"
            aria-label={`${profile.name} — projects`}
          >
            <svg
              className="identity-mark"
              aria-hidden="true"
              viewBox="0 0 40 40"
            >
              <path
                d="M20 2v36M2 20h36M7.3 7.3l25.4 25.4M7.3 32.7L32.7 7.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span>
              {profile.name}
              <small>{profile.role || "Portfolio"}</small>
            </span>
          </Link>
          <Navigation />
        </header>
        {children}
        <footer className="site-footer">
          <span>{profile.name} / Portfolio</span>
          <span>Projects · Experiments · CV</span>
        </footer>
      </body>
    </html>
  );
}
