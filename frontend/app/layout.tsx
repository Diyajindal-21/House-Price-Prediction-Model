
import "./globals.css"; // Ensure global styles are imported


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
