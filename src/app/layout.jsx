import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio — projects, skills, and contact.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
