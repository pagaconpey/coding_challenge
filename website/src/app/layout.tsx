import './globals.css'; 
import AmplifyProvider from './components/AmplifyProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AmplifyProvider>{children}</AmplifyProvider>
      </body>
    </html>
  );
}