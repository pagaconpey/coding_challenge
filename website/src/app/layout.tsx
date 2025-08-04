import './globals.css'; 

import { Amplify } from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}