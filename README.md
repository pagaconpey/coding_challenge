# 📝💜 Notas con Sentimiento - Coding Challenge

Una aplicación web completa para crear y gestionar notas con análisis de sentimientos, construida con la arquitectura moderna de AWS.

🌐 **Demo en producción:** [Ver aplicación](https://main.d[ID].amplifyapp.com)

---

## 🎯 Acerca del Proyecto

Esta aplicación fue desarrollada como parte de un coding challenge que evalúa habilidades técnicas fullstack con AWS. El objetivo: crear una solución completa en 2 días usando tecnologías modernas.

### 🏆 Resultado
✅ **Aplicación 100% funcional** desplegada en AWS Amplify  
✅ **CRUD completo** para notas con sentimientos  
✅ **UI moderna** con diseño morado y efectos glassmorphism  
✅ **Arquitectura escalable** con GraphQL + DynamoDB  

---

## 🧗 Mi Proceso de Aprendizaje

### **📚 Día 1-1.5: Aprendizaje intensivo**
- **DynamoDB + AppSync + GraphQL:** Primera vez conectando esta arquitectura
- **AWS Amplify CLI:** Configuración completa de backend y hosting
- **GraphQL Schema:** Diseño de tipos, queries y mutations

### **🔄 Iteraciones del proyecto**
Rehice el proyecto **3 veces** hasta lograr la conexión correcta:
1. **Primer intento:** Problemas de autenticación GraphQL
2. **Segundo intento:** Issues con variables de entorno
3. **Versión final:** Arquitectura limpia y funcional

### **🚀 Estrategia de deployment**
- **Git workflow inicial:** Branches y PRs estructurados
- **Pivot a main:** Por practicidad del deploy rápido (día 2)
- **Commits directos:** Para iteración ágil con asistencia IA

---

## 🛠️ Stack Tecnológico

### **Frontend**
- ⚛️ **React 18** con Next.js 14 (App Router)
- 🎨 **Tailwind CSS** con diseño responsive
- 🔗 **AWS Amplify** para GraphQL client
- 📱 **Glassmorphism UI** con gradientes morados

### **Backend**
- 🔥 **AWS AppSync** (GraphQL API)
- 💾 **DynamoDB** (Base de datos NoSQL)
- 🔐 **API Key authentication**
- 🏗️ **Amplify CLI** para IaC

### **DevOps**
- ☁️ **AWS Amplify Hosting**
- 🔄 **CI/CD automático** desde GitHub
- 🌍 **CloudFront CDN** global
- 📊 **Monorepo structure**

---

## 📦 Instalación y Setup

### **Prerrequisitos**
```bash
# Node.js (v18+)
node --version

# AWS CLI
aws --version

# Amplify CLI
npm install -g @aws-amplify/cli
amplify --version
```

### **1. Clonar proyecto**
```bash
git clone <tu-fork>
cd coding_challenge
```

### **2. Configurar AWS**
```bash
# Configurar credenciales AWS
aws configure

# Inicializar Amplify (solo si es necesario)
amplify init
```

### **3. Setup Frontend**
```bash
cd website
npm install
```

### **4. Variables de entorno**
```bash
# Crear archivo de configuración
cp .env.example .env

# Agregar tus credenciales AWS AppSync:
NEXT_PUBLIC_APPSYNC_API_URL=tu_api_url
NEXT_PUBLIC_APPSYNC_REGION=us-east-1
NEXT_PUBLIC_APPSYNC_API_KEY=tu_api_key
```

### **5. Desarrollo local**
```bash
npm run dev
# Abre http://localhost:3000
```

### **6. Deploy a AWS**
```bash
# Desde la raíz del proyecto
git push origin main
# Amplify detecta cambios automáticamente
```

---

## 🏗️ Arquitectura

```
🌐 AWS CloudFront (CDN)
    ↓
📱 Next.js App (Amplify Hosting)
    ↓
🔗 AWS AppSync (GraphQL API)
    ↓
💾 DynamoDB (Notes Database)
```

### **📊 Schema GraphQL**
```graphql
enum Sentiment {
  happy
  sad
  neutral  
  angry
}

type Note @model @auth(rules: [{ allow: public, provider: apiKey }]) {
  id: ID!
  text: String!
  sentiment: Sentiment!
  dateCreated: AWSDateTime!
}
```

---

## ✨ Funcionalidades

### **📝 Gestión de Notas**
- ✅ Crear notas con texto libre
- ✅ Seleccionar sentimiento (happy/sad/neutral/angry)
- ✅ Timestamp automático
- ✅ Validación de formularios

### **📚 Visualización**
- ✅ Lista paginada (10 notas por página)
- ✅ Filtros por sentimiento
- ✅ Emojis por sentimiento
- ✅ Diseño responsive

### **🎨 UI/UX**
- 💜 Tema morado elegante
- ✨ Efectos glassmorphism
- 📱 Mobile-first design
- ⚡ Loading states

---

## 🚧 Desafíos Superados

### **🔐 Autenticación GraphQL**
- **Problema:** "Not Authorized" errors
- **Solución:** API Key + auth rules en schema

### **🏗️ Monorepo Amplify**
- **Problema:** Build failures por estructura de carpetas
- **Solución:** amplify.yml optimizado para website/

### **⚛️ React Hydration**
- **Problema:** Client/Server mismatch
- **Solución:** Conditional rendering post-config

### **📦 Dependencies**
- **Problema:** npm ci failures en Amplify
- **Solución:** Robust install flags + single-line commands

---

## 🎯 Para Empleadores

### **💡 Habilidades demostradas:**
- ✅ **Aprendizaje rápido:** Dominé AWS stack en 1.5 días
- ✅ **Problem solving:** Depuración de errores complejos
- ✅ **Arquitectura:** Diseño escalable y maintible
- ✅ **Fullstack:** Frontend React + Backend AWS
- ✅ **DevOps:** CI/CD con Amplify
- ✅ **Code quality:** TypeScript + ESLint + clean code

### **🏆 Logros del proyecto:**
- 🚀 **Deploy exitoso** en AWS en 2 días
- 💜 **UI profesional** con UX moderna
- 🔧 **Zero downtime** después del deploy
- 📊 **Arquitectura escalable** para producción
- 🛡️ **Código seguro** sin credenciales hardcoded

---

## 🌟 Reflexión Personal

> "Después de 3 iteraciones y múltiples obstáculos técnicos, logré crear una aplicación completa que me enorgullece. Este proyecto me enseñó la importancia de la persistencia, el aprendizaje continuo y la colaboración efectiva con IA para acelerar el desarrollo."

El resultado final no solo cumple con los requisitos técnicos, sino que demuestra mi capacidad para entregar productos de calidad bajo presión y plazos ajustados.

---

## 📞 Contacto

**¿Interesado en colaborar?** Este proyecto refleja mi enfoque para resolver problemas complejos y construir soluciones escalables.

---

*Desarrollado con ☕ y mucho 💜 para Pey*