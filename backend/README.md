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