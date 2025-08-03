# 🐍 Backend - Notas con Sentimientos

Backend serverless para la aplicación de notas con sentimientos usando AWS CDK con Python.

## 🚀 Despliegue Rápido

### 1. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 2. Bootstrap CDK (solo la primera vez)
```bash
cdk bootstrap
```

### 3. Desplegar
```bash
cdk deploy
```

### 4. Ver outputs
```bash
cdk deploy --outputs-file outputs.json
```

## 📁 Estructura

```
backend/
├── app.py              # Aplicación principal CDK
├── schema/
│   └── schema.graphql  # Esquema GraphQL
├── requirements.txt    # Dependencias Python
├── cdk.json           # Configuración CDK
└── README.md          # Este archivo
```

## 🔧 Comandos Útiles

```bash
# Ver diferencias antes de desplegar
cdk diff

# Destruir recursos
cdk destroy

# Listar stacks
cdk list

# Sintetizar CloudFormation
cdk synth
```

## 📊 Recursos Creados

- **AppSync API**: API GraphQL serverless
- **DynamoDB Table**: Base de datos NoSQL
- **IAM Roles**: Permisos necesarios
- **CloudFormation Stack**: Infraestructura como código

## 🆓 Costos

- **AppSync**: 250,000 requests/mes gratis
- **DynamoDB**: 25GB almacenamiento gratis
- **CloudFormation**: Gratis para stacks pequeños

¡Todo gratuito para desarrollo y uso personal! 

## 🛡️ Archivos automáticos y seguridad

### Instalación de Amplify CLI

```bash
npm install -g @aws-amplify/cli
```
O con yarn:
```bash
yarn global add @aws-amplify/cli
```

### Archivos que puedes borrar y regenerar

Los siguientes archivos y carpetas **NO deben subirse al repositorio** porque se pueden regenerar automáticamente:

- `backend/src/aws-exports.js`
- `backend/src/amplifyconfiguration.json`
- `backend/cdk.out/`

#### ¿Cómo regenerarlos?

1. **Regenerar archivos de configuración de Amplify:**

   Si borras `aws-exports.js` o `amplifyconfiguration.json`, simplemente ejecuta:

   ```bash
   amplify pull
   ```

   Esto descargará la configuración actual de tu entorno Amplify y recreará los archivos necesarios.

2. **Regenerar la carpeta `cdk.out/`:**

   Si borras la carpeta `cdk.out/`, puedes regenerarla ejecutando:

   ```bash
   cdk synth
   ```

   Esto volverá a crear los artefactos necesarios para AWS CDK.

### 🧹 Limpieza

Si necesitas limpiar tu entorno local, puedes borrar estos archivos/carpeta sin problema:

```bash
rm -rf backend/src/aws-exports.js backend/src/amplifyconfiguration.json backend/cdk.out/
```

Luego, sigue los pasos anteriores para regenerarlos.

### 🔒 Notas de seguridad

- **Nunca subas** archivos reales de configuración (`aws-exports.js`, `amplifyconfiguration.json`) ni la carpeta `cdk.out/` al repositorio.
- Usa los archivos de ejemplo (`aws-exports.example.js`) para compartir la estructura sin exponer datos sensibles. 