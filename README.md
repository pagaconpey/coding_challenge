# 🧗 Coding Challenge

¡Gracias por tu interés en unirte a nuestro equipo! Esta prueba está diseñada para evaluar tus habilidades técnicas, tu forma de resolver problemas, tu capacidad de aprender y tu habilidad para seguir instrucciones con claridad.

> Debes ser capaz de construir y resolver problemas en un tercio del tiempo que la mayoría de las personas competentes consideran posible.

## 🎯 Objetivo

Crear una aplicación web que permita a usuarios publicar y leer notas con un "sentimiento". Esta aplicación debe ser completamente funcional y desplegada en producción. Opcionalmente, puedes agregar un notebook de analítica y desplegar el backend como infraestructura como código.

## 🗓️ Alcance

- Tiempo estimado: **2 días de trabajo**
- Modalidad: **Trabajo individual**
- Puedes usar cualquier herramienta de inteligencia artificial como apoyo.

## 🧱 Contenido del repositorio

```bash
.
├── README.md
├── website/              # Código del frontend con React con Next.js y Tailwind CSS
├── backend/              # (Opcional) Infraestructura como código con CDK
└── analytics.ipynb       # (Opcional) Jupyter Notebook con analíticos básicos
```

### 📂 Detalles

- **Haz un fork** de este repositorio y trabaja desde ahí.
- El código del **frontend** debe vivir en el folder `website/`.
- Puedes implementar el **backend** directamente en la consola de AWS (AppSync, DynamoDB y Amplify) o usar **CDK** para definirlo como infraestructura como código (IaC).
- La aplicación debe estar desplegada en producción con **Amplify**.

## 🖥️ Requisitos funcionales (obligatorios)

Tu aplicación debe permitir:

1. **Crear una nota** con:
   - Texto libre
   - Un sentimiento: `feliz`, `triste`, `neutral`, `enojado`

2. **Visualizar notas existentes**:
   - Mostrar las notas paginadas en bloques de 10
   - Posibilidad de filtrar por sentimiento
   - Mostrar la fecha de creación de la nota

3. **Despliegue**:
   - La aplicación debe estar **en producción**.
   - Comparte el URL de la página web y el fork del repositorio con la persona que te contactó

## ⚙️ Requisitos técnicos (obligatorios)

- **Frontend**: React con Next.js y Tailwind CSS
- **API**: AppSync con GraphQL
- **Base de datos**: DynamoDB
- **Hosting**: Amplify

### 🔧 Esquema esperado de GraphQL

```graphql
enum Sentimiento {
  feliz
  triste
  neutral
  enojado
}

type Nota {
  id: ID!
  texto: String!
  sentimiento: Sentimiento!
  fechaCreacion: AWSDateTime!
}

type Query {
  getNotes(sentimiento: Sentimiento, limit: Int, nextToken: String): NotaConnection
}

type Mutation {
  crearNota(texto: String!, sentimiento: String!): Nota
}

type NotaConnection {
  items: [Nota]
  nextToken: String
  scannedCount: Int
}
```

## 🏆 Extras (opcionales)

Hay dos entregables opcionales que puedes hacer para mejorar tu puntuación y demostrar tus habilidades.

### 📊 Notebook de analítica

Crea un archivo `analytics.ipynb` con visualizaciones de las notas:

- Un **histograma** de cantidad de notas por día
- Un **gráfico circular** con la proporción de sentimientos publicados

### 🚀 Infraestructura como código

Utiliza CDK para crear el backend de la aplicación dentro del folder `backend/`.

> Si no utilizas CDK, crea todos los recursos a través de la consola de AWS.

## ✅ Entregables

1. URL de la aplicación en producción (AWS Amplify)
2. Enlace al repositorio con tu fork
3. Instrucciones claras para correr el proyecto localmente
4. (Opcional) Notebook con analítica
5. (Opcional) Infraestructura como código

## 🧠 Qué evaluaremos

- Funcionamiento de la aplicación
- Claridad del código y estructura del proyecto
- Calidad visual del frontend
- Uso correcto de AWS y el stack propuesto
- Autonomía para aprender nuevas tecnologías (GraphQL, DynamoDB, CDK, etcétera)
- Buenas prácticas de versionado con Git y GitHub

## 💡 Tips

- Documenta cualquier decisión técnica que hayas tomado
- Si algo no está claro, elige una solución razonada y explícalo
- Haz un UI simple, cuida usabilidad y presentación
- Haz `commits` lógicos, claros y estructurados
- Usa IA a tu favor, pero entiende lo que estás haciendo

---

¡Éxito! Estamos emocionados de ver tu trabajo 🚀
