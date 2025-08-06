# 🔒 Política de Seguridad

## Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, por favor:

1. **NO** crees un issue público
2. **NO** hagas commit de credenciales
3. Contacta directamente al equipo de desarrollo

## Archivos Sensibles

Los siguientes archivos NO deben subirse a GitHub:

- `.env*` - Variables de entorno
- `aws-exports.js` - Configuración AWS Amplify
- `.aws/` - Credenciales AWS
- `credentials` - Archivos de credenciales
- `venv/` - Entornos virtuales Python
- `node_modules/` - Dependencias

- `*.log` - Archivos de log

## Buenas Prácticas

✅ Usar variables de entorno
✅ Usar archivos de ejemplo (.env.example)
✅ Configurar .gitignore correctamente
✅ Revisar commits antes de hacer push
✅ Usar secretos de GitHub para CI/CD

❌ No subir credenciales hardcodeadas
❌ No subir archivos de configuración local
❌ No subir logs o archivos temporales 