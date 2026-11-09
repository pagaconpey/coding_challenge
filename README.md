# 🧗 Coding Challenge

¡Gracias por tu interés en unirte a nuestro equipo! Esta prueba está diseñada para evaluar tus habilidades técnicas, tu forma de resolver problemas, tu capacidad de aprender y tu habilidad para seguir instrucciones con claridad.

> Debes ser capaz de resolver problemas y construir soluciones en una tercera parte del tiempo que tardaría un desarrollador competente promedio, manteniendo altos estándares de calidad.

## 🎯 Objetivo

Crear un juego en el navegador de tipo **Arcade "insert coin"**, donde una partida solo se desbloquea después de pagar un QR CoDi. Debe haber un "leaderboard" con las mejores partidas.

Tendrás que utilizar la [API _pey_](https://docs.pey.mx) para el desarrollo del proyecto.

## 🗓️ Alcance

- Tiempo estimado: **3 días de trabajo**
- Modalidad: **Trabajo individual**
- Puedes usar cualquier herramienta de inteligencia artificial como apoyo.
- Mantén una buena calidad de código.

## 🧱 Estructura

```bash
.
├── README.md
├── website/              # Código del frontend con React.js con Next.js y Tailwind CSS
├── backend/              # Infraestructura como código con CDK
└── analytics.ipynb       # (Opcional) Jupyter Notebook con analíticos básicos
```

### 🔄 Funcionamiento (obligatorio)

1. **Login (Cognito)**
- Registro e inicio de sesión con Cognito (email + contraseña) y un `nickname` público para el leaderboard.
- Un trigger **postConfirmation** (Lambda) crea el perfil del usuario en DynamoDB. 

2. **Insert Coin (CoDi QR)**
- El usuario presiona "INSERT COIN". Llamada a un endpoint REST (Lambda + API Gateway):
  - genera un ID para el `gameId` de esta partida;
  - llama el endpoint `POST https://api.pey.mx/codi/qr` con `amount: 0.01`, `expiration: 360` y `metadata.gameId`;
  - crea un registro (`GAME`) en DynamoDB con estado `PENDING`;
  - regresa el `qrString` para que el frontend lo renderice como QR.
- El frontend muestra el QR y una cuenta regresiva, y espera la confirmación **en tiempo real**. De preferencia, utiliza un websocket (suscripción AppSync) en lugar de polling.
- Un pago se confirma **solo** mediante el webhook [`codi.qr.payment_received`](https://docs.pey.mx/docs/webhooks/codi/qr), recibido en un endpoint REST de API Gateway. La Lambda del webhook debe:
  - **verificar la firma (Standard Webhooks)**; si es inválida, rechaza con 401;
  - ser **idempotente**: el mismo webhook recibido dos veces no causa efectos dobles;
  - validar que el `gameId` correspondan a un juego `PENDING`;
  - hacer la transición `PENDING -> PAID` con **escritura condicional** de DynamoDB.

> Ningún usuario debe poder leer o modificar juegos de otro.

3. **Jugar**
- `updateGame(gameId, status: PLAYING)`: solo el dueño del juego, solo desde `PAID`. Pasa a `PLAYING` y guarda `dateStarted` en el servidor.
- Una moneda = una partida. No se puede reiniciar sin volver a pagar.

4. **Game Over -> Leaderboard**
- Se llama el endpoint de GraphQL `updateGame(gameId, status: FINISHED, score)`:
  - solo el dueño, a juegos con estado `PLAYING`, una sola vez;
  - pasa a `FINISHED` y guarda `score` y `dateFinished`;
  - sabemos que esto hace que el `score` sea "hackeable", pero no te preocupes de eso ahorita.
- Cualquier otra transición en `updateGame` se rechaza. `PAID` solo se asigna desde el webhook.
- La pantalla de Game Over muestra:
  - el puntaje de la partida, los últimos 3 juegos del usuario y el **top 10 global**.
- El leaderboard se actualiza mediante un DynamoDB Stream que detecte el cambio de `status` (`PLAYING -> FINISHED`). Se pueden usar otro mecanismos de actualización, pero esto es lo recomendado.

### 📂 Detalles

- **Haz un fork** de este repositorio y trabaja desde ahí.
- El código del **frontend** debe vivir en el folder `website/`.
- Implementa el **backend** directamente con el **CDK** de AWS para definirlo como infraestructura como código (IaC) en el folder `backend/`. **Todo** recurso de AWS se define en CDK. Nada creado a mano en la consola (salvo el valor de los secretos y el web hosting de **AWS Amplify**).
- La página web debe estar desplegada en producción con **AWS Amplify**.

## ⚙️ Requisitos técnicos (obligatorios)

- **Frontend**: React.js con Next.js, Tailwind CSS, Amplify JS (o equivalente) para Auth.
- **IaC**: AWS CDK en Typescript, organizado en stacks y/o constructs (por ejemplo auth, data, api, integration).
- **API GraphQL**: AWS AppSync, con:
  - autorización `AMAZON_COGNITO_USER_POOLS`;
  - resolvers **APPSYNC_JS** directos a DynamoDB.
- **API REST**: AWS API Gateway, con:
  - se utiliza para la creación de un nuevo juego y la recepción de webhooks.
  - debe utilizar Lambdas para la ejecución de su código.
- **Lambda**: Python (preferido) o Node.js
- **Base de datos**: DynamoDB **single-table**, con:
  - `GSI1` para los juegos de un usuario;
  - `GSI2` que permita leer los mejores resultados ordenados **sin `Scan`**.
- **Secretos**: API key de pey y secreto del webhook en Secrets Manager. Nunca en el repositorio.

Ejemplo de llaves (puedes cambiarlo si lo justificas):

`GAME`:

```ts
{
  PK: `GAME#${ulid}`,
  SK: "METADATA",
  GSI1PK: `USER#${cognitoId}`,
  GSI1SK: `GAME#${ulid}`,
  status: "FINISHED",
  id: "...",
  codiQrId: "...",
  qrString: "...",
  amount: 0.01,
  score: 420,
  dateStarted: 1715558500,
  dateFinished: 1715558600,
  datePaid: 1715558400,
  dateCreated: 1715558300,
  dateExpires: dateCreated + 360,
}
```

`USER`:

```ts
{
  PK: `USER#${cognitoId}`,
  SK: "METADATA",
  GSI1PK: "LEADERBOARD",
  GSI1SK: `SCORE#${score}#GAME#${gameId}`,
  nickname: "steve",
  maxScore: 420,
  gameId: "...",
  userId: "...",
  dateCreated: 1715558400,
}
```

### 🔧 Esquema GraphQL mínimo

```graphql

enum GameStatus { 
  PENDING
  PAID 
  PLAYING 
  FINISHED 
  EXPIRED 
}

type Game {
  id: ID!
  status: GameStatus!
  qrString: String
  amount: Float!
  score: Int
  nickname: String
  dateCreated: Float!
  dateExpires: Float!
  datePaid: Float
  dateStarted: Float
  dateFinished: Float
}

type LeaderboardScore { 
  nickname: String!  
  score: Int!  
  dateAchieved: Float!
}

type Leaderboard { 
  top: [LeaderboardScore!]!
  me: LeaderboardScore
  myRank: Int
}

type Query {
  getGame(id: ID!): Game
  getGamesByUser(limit: Int): [GAME]
  getLeaderboard(limit: Int): Leaderboard
}

type Mutation {
  updateGame(gameId: ID!, status: GameStatus!, score: Int): Game
}
```

> Te recomendamos que utilices [ULID](https://github.com/ulid/spec) para generar los IDs de las partidas. Esto va a ser útil para filtrar los resultados en base a tiempo.

## 💳 pey

- [Documentación](https://docs.pey.mx/)
- [Crear QR](https://docs.pey.mx/docs/api/create-qr)
- [Webhook](https://docs.pey.mx/docs/webhooks/codi/qr)
- [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks)
- No hay sandbox: cada prueba es un pago real de $0.01. Registra en el portal la URL de tu API Gateway como webhook.
- Los valores de `metadata` se regresan como strings. En el webhook llegan en `metadata.externalMetadata` (por ejemplo, `metadata.externalMetadata.gameId`).

## 🏆 Extras (opcionales)

- Utiliza DynamoDB Streams junto con SNS para tener una arquitectura en base a eventos.
- CI/CD con GitHub Actions para el backend (`cdk deploy`).
- analytics.ipynb: Analíticos sobre el uso de la app.

### 📊 Notebook de analítica

Crea un archivo `analytics.ipynb` con visualizaciones de las partidas:

- Un **histograma** de cantidad de partidas por día.
- Tasa de conversión QR generado -> pagado.
- Distribución de puntaje.

## ✅ Entregables

1. URL en producción (Amplify).
2. Link al fork.
3. README con:
   - explicación de arquitectura;
   - cómo desplegar desde cero (cdk deploy + secretos);
   - decisiones y trade-offs.
4. Video corto (≤ 3 min) del flujo completo: login → pago real → jugar → leaderboard.

## 🧠 Qué evaluaremos

- Flujo completo funcionando con un pago real.
- Seguridad: firma del webhook, autorización por usuario, secretos.
- Correctitud: idempotencia, escrituras condicionales, transiciones de estado válidas.
- Diseño de DynamoDB (patrones de acceso sin Scan).
- Calidad y claridad del código, CDK bien organizado, commits limpios.
- UX: que se sienta arcade y que sea claro en cada estado (esperando pago, expirado, jugando, game over).
- Legibilidad: el código debe de ser limpio y consistente (mismas prácticas en diferentes bloques), debe de leerse como un libro.
- Opcionales:
  - Arquitectura orientada a eventos (DynamoDB Streams, SNS con filtros, suscripciones AppSync).
  - Decisiones de arquitectura que se hayan tomado fuera del guideline y su justificación cuando aplique.

> Puedes cambiar, agregar o quitar características del proyecto siempre y cuando expliques por qué tomaste las decisiones en el `README` del repositorio entregable.

## 💡 Tips

- Documenta cualquier decisión técnica que hayas tomado.
- Si algo no está claro, elige una solución razonada y explícalo.
- Haz un UI simple, cuida usabilidad y presentación.
- Haz `commits` lógicos, claros y estructurados.
- Usa IA a tu favor, pero entiende lo que estás haciendo. Te vamos a hacer preguntas sobre el código.

---

¡Éxito! Estamos emocionados de ver tu trabajo 🚀
