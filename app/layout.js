import './globals.css';

export const metadata = {
  title: 'NordSky Aerials',
  description: 'Aerial Filmmaking & Drone Services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
        {children}
      </body>
    </html>
  );
}
