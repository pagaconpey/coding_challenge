#!/bin/bash

echo "🔒 Verificando seguridad del proyecto..."

# Verificar archivos sensibles
SENSITIVE_FILES=(
    ".env"
    ".env.local"
    ".env.production"
    "aws-exports.js"
    "aws-exports.ts"
    "credentials"
    ".aws/"
)

for file in "${SENSITIVE_FILES[@]}"; do
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo "❌ Archivo sensible encontrado: $file"
        echo "   Por favor, agrégalo a .gitignore"
        exit 1
    fi
done

# Verificar AWS Access Keys
if grep -r "AKIA[0-9A-Z]{16}" . --exclude-dir=node_modules --exclude-dir=venv --exclude-dir=.git; then
    echo "❌ AWS Access Key encontrada en el código"
    echo "   Por favor, usa variables de entorno"
    exit 1
fi

# Verificar AWS Secret Keys
if grep -r "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" . --exclude-dir=node_modules --exclude-dir=venv --exclude-dir=.git; then
    echo "❌ AWS Secret Key encontrada en el código"
    echo "   Por favor, usa variables de entorno"
    exit 1
fi

echo "✅ Verificación de seguridad completada" 