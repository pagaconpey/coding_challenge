"use client";

import { Amplify } from 'aws-amplify';
import config from '../../lib/amplify-config';
import { useEffect } from 'react';

// Configurar Amplify una sola vez en el cliente
Amplify.configure(config);

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Asegurar que Amplify está configurado en el cliente
    Amplify.configure(config);
  }, []);

  return <>{children}</>;
}