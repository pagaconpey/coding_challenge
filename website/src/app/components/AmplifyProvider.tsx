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
    // Debug completo de la configuración
    console.log('🔧 === DEBUG AMPLIFY CONFIGURATION ===');
    console.log('🔧 process.env.NEXT_PUBLIC_APPSYNC_API_URL:', process.env.NEXT_PUBLIC_APPSYNC_API_URL);
    console.log('🔧 process.env.NEXT_PUBLIC_APPSYNC_REGION:', process.env.NEXT_PUBLIC_APPSYNC_REGION);
    console.log('🔧 process.env.NEXT_PUBLIC_APPSYNC_API_KEY:', process.env.NEXT_PUBLIC_APPSYNC_API_KEY);
    
    console.log('🔧 === CONFIG OBJECT ===');
    console.log('🔧 config.aws_appsync_graphqlEndpoint:', config.aws_appsync_graphqlEndpoint);
    console.log('🔧 config.aws_appsync_region:', config.aws_appsync_region);
    console.log('🔧 config.aws_appsync_authenticationType:', config.aws_appsync_authenticationType);
    console.log('🔧 config.aws_appsync_apiKey:', config.aws_appsync_apiKey);
    
    console.log('🔧 === STATUS CHECK ===');
    console.log('🔧 Endpoint:', config.aws_appsync_graphqlEndpoint ? '✅ Configurado' : '❌ Faltante');
    console.log('🔧 API Key:', config.aws_appsync_apiKey ? '✅ Configurada' : '❌ Faltante');
    
    Amplify.configure(config);
    console.log('✅ Amplify configurado exitosamente');
    console.log('🔧 === END DEBUG ===');
  }, []);

  return <>{children}</>;
}