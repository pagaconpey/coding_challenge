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
    // Configurar Amplify en el cliente con logs de debug
    console.log('🔧 Configurando Amplify...');
    console.log('🔧 Endpoint:', config.aws_appsync_graphqlEndpoint ? '✅ Configurado' : '❌ Faltante');
    console.log('🔧 Region:', config.aws_appsync_region);
    console.log('🔧 Auth type:', config.aws_appsync_authenticationType);
    console.log('🔧 API Key:', config.aws_appsync_apiKey ? '✅ Configurada' : '❌ Faltante');
    
    // Verificar variables de entorno
    console.log('🔧 ENV Check:');
    console.log('  - NEXT_PUBLIC_APPSYNC_API_URL:', process.env.NEXT_PUBLIC_APPSYNC_API_URL ? '✅' : '❌');
    console.log('  - NEXT_PUBLIC_APPSYNC_REGION:', process.env.NEXT_PUBLIC_APPSYNC_REGION ? '✅' : '❌');
    console.log('  - NEXT_PUBLIC_APPSYNC_API_KEY:', process.env.NEXT_PUBLIC_APPSYNC_API_KEY ? '✅' : '❌');
    
    Amplify.configure(config);
    console.log('✅ Amplify configurado exitosamente');
  }, []);

  return <>{children}</>;
}