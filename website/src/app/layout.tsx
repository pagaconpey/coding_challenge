import './globals.css'; 

import { Amplify } from 'aws-amplify';
import config from '../lib/amplify-config';

Amplify.configure(config);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}