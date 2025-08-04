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
    // Configurar Amplify en el cliente con logs (sin mostrar credenciales sensibles)
    console.log('🔧 Configurando Amplify...');
    console.log('🔧 Endpoint configurado:', config.aws_appsync_graphqlEndpoint ? '✅' : '❌');
    console.log('🔧 Auth type:', config.aws_appsync_authenticationType);
    console.log('🔧 API Key configurada:', config.aws_appsync_apiKey ? '✅' : '❌');
    
    Amplify.configure(config);
    console.log('✅ Amplify configurado exitosamente');
  }, []);

  return <>{children}</>;
}