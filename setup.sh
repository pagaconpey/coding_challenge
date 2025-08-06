#!/bin/bash

echo "🚀 Configurando la aplicación de notas con sentimientos..."
echo ""

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instala Node.js 18+"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Verificar que AWS CLI esté instalado
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado. Por favor, instala AWS CLI"
    exit 1
fi

echo "✅ AWS CLI encontrado: $(aws --version)"

# Instalar dependencias del frontend
echo ""
echo "📦 Instalando dependencias del frontend..."
cd website
npm install
cd ..

# Backend se maneja con Amplify CLI (no dependencias separadas)

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura AWS CLI: aws configure"
echo "2. Configura Amplify: cd website && amplify init"
echo "3. Despliega la aplicación: cd website && amplify publish"
echo ""
echo "📖 Consulta el README.md para instrucciones detalladas" 