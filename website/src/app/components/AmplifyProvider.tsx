"use client";

import { Amplify } from 'aws-amplify';
import config from '../../lib/amplify-config';
import { useEffect } from 'react';

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Configurar Amplify en el cliente con logs
    console.log('🔧 Configurando Amplify con:', config);
    Amplify.configure(config);
    console.log('✅ Amplify configurado exitosamente');
  }, []);

  return <>{children}</>;
}