import { Amplify } from "aws-amplify";

// Configuración para desarrollo local
const localConfig = {
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_URL || "",
  aws_appsync_region: process.env.NEXT_PUBLIC_APPSYNC_REGION || "us-east-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY || "",
};

// Solo configurar Amplify en el cliente (no durante SSR)
if (typeof window !== 'undefined') {
  // Configuración para producción (se importará desde aws-exports.js)
  let productionConfig = null;

  try {
    // Intentar importar la configuración de producción
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const awsExports = require("../aws-exports");
    productionConfig = awsExports.default || awsExports;
  } catch {
    console.log("No se encontró aws-exports.js, usando configuración local");
  }

  // Usar configuración de producción si está disponible, sino usar local
  const config = productionConfig || localConfig;

  // Configurar Amplify solo si tenemos una URL válida
  if (config.aws_appsync_graphqlEndpoint && config.aws_appsync_graphqlEndpoint !== "") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Amplify.configure(config as any);
  } else {
    console.warn(
      "⚠️ Amplify no configurado. Configura las variables de entorno o aws-exports.js"
    );
  }
}

export default localConfig;
