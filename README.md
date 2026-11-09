# 🧗 Coding Challenge

¡Gracias por tu interés en unirte a nuestro equipo! Esta prueba está diseñada para evaluar tus habilidades técnicas, tu forma de resolver problemas, tu capacidad de aprender y tu habilidad para seguir instrucciones con claridad.

> Debes ser capaz de resolver problemas y construir soluciones en una tercera parte del tiempo que tardaría un desarrollador competente promedio, manteniendo altos estándares de calidad.

## 🎯 Objetivo

Crear un juego en el navegador de tipo **Arcade "insert coin"**, donde una partida solo se desbloquea después de pagar un QR CoDi, además de un "leaderboard".

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
- Registro e inicio de sesión con Cognito User Pool (email + contraseña) y un `nickname` público para el leaderboard.
- Un trigger **postConfirmation** (Lambda) crea el perfil del usuario en DynamoDB. 

2. **Insert Coin (CoDi QR)**
- El usuario presiona "INSERT COIN". La mutación `createGame` (AppSync -> Lambda):
  - crea un registro `GAME` con estado `PENDING`;
  - llama a `POST https://api.pey.mx/codi/qr` con `amount: 0.01`, `expiration >= 360` y `metadata.gameId`;
  - regresa el `qrString` para que el frontend lo renderice como QR.
- El frontend muestra el QR y una cuenta regresiva, y espera la confirmación **en tiempo real** (suscripción AppSync, no polling como mecanismo principal).
- Un pago se confirma **solo** mediante el webhook `codi.qr.payment_received`, recibido en un endpoint de **API Gateway**. La Lambda del webhook debe:
  - **verificar la firma (Standard Webhooks)**; si es inválida, rechaza con 401;
  - ser **idempotente**: el mismo webhook recibido dos veces no causa efectos dobles;
  - validar que el `amount` y el `gameId` correspondan a un juego `PENDING`;
  - hacer la transición `PENDING -> PAID` con una **escritura condicional**.
- La Lambda del webhook **no** publica en SNS. Un handler de **DynamoDB Streams** detecta el evento `MODIFY` del `GAME` con `status` `PENDING -> PAID` (comparando `OldImage` y `NewImage`) y publica en **SNS** con el atributo `eventType: gamePaid`.
- Un suscriptor de SNS (con **filter policy**) ejecuta una mutación de AppSync (`updateGameToPaid`, protegida por IAM) que dispara la suscripción `onGamePaid(gameId)` en el cliente.
- Si el QR expira sin pago, el juego queda `EXPIRED` y el usuario puede insertar otra moneda.

> Ningún usuario debe poder leer o modificar juegos de otro, ni invocar mutaciones `@aws_iam`.

3. **Jugar**
- `updateGame(gameId, status: PLAYING)`: solo el dueño del juego, solo desde `PAID`. Pasa a `PLAYING` y guarda `dateStarted` en el servidor.
- Una moneda = una partida. No se puede reiniciar sin volver a pagar.

4. **Game Over -> Leaderboard**
- `updateGame(gameId, status: FINISHED, score)`:
  - solo el dueño, solo desde `PLAYING`, una sola vez;
  - pasa a `FINISHED` y guarda `score` y `dateFinished`.
- Cualquier otra transición en `updateGame` se rechaza. `PAID` solo se asigna desde el webhook.
- El handler de DynamoDB Streams detecta el `MODIFY` con `status` `PLAYING -> FINISHED` y publica en SNS con `eventType: gameFinished`.
- Un suscriptor de SNS actualiza el **mejor puntaje por usuario** y el leaderboard.
- La pantalla de Game Over muestra:
  - el puntaje de la partida y el mejor puntaje del usuario;
  - el **top 10 global** y la **posición del usuario** respecto a los demás.
- El leaderboard se actualiza en vivo (`onLeaderboardUpdated`).

### 📂 Detalles

- **Haz un fork** de este repositorio y trabaja desde ahí.
- El código del **frontend** debe vivir en el folder `website/`.
- Implementa el **backend** directamente con el **CDK** de AWS para definirlo como infraestructura como código (IaC) en el folder `backend/`. **Todo** recurso de AWS se define en CDK. Nada creado a mano en la consola (salvo el valor de los secretos).
- La aplicación debe estar desplegada en producción con **AWS Amplify**.

## ⚙️ Requisitos técnicos (obligatorios)

- **Frontend**: React.js con Next.js, Tailwind CSS, Amplify JS (o equivalente) para Auth y GraphQL.
- **IaC**: AWS CDK en Typescript, organizado en stacks o constructs (por ejemplo auth, data, api, integration).
- **API**: AppSync GraphQL, con:
  - autorización `AMAZON_COGNITO_USER_POOLS` por defecto e `AWS_IAM` para mutaciones internas;
  - resolvers **APPSYNC_JS** directos a DynamoDB, y Lambdas (por ejemplo `createGame`).
- **Lambda**: Python 3.12 (preferido) o Node.js 22.
- **Mensajería**: DynamoDB Streams ([`NEW_AND_OLD_IMAGES`](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html), [con Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html)) hacia un handler que publica en al menos un tópico **SNS**, con suscripciones filtradas por `eventType`. Ninguna mutación ni webhook publica directamente en SNS.
- **API Gateway**: HTTP API para el webhook de pey.
- **Base de datos**: DynamoDB **single-table**, con:
  - `GSI1` para los juegos de un usuario;
  - un `GSI2` que permita leer el leaderboard ordenado **sin `Scan`**.
- **Secretos**: API key de pey y secreto del webhook en Secrets Manager. Nunca en el repositorio.

Ejemplo de llaves (puedes cambiarlo si lo justificas):

`GAME`:

```ts
{
  PK: `GAME#${ulid}`,
  SK: "METADATA",
  GSI1PK: `USER#${cognitoId}`,
  GSI1SK: `GAME#${ulid}`,
  status: "PENDING",
  id: "01JBAVWE4NS5TGXHWGMX3KH23Q",
  codiQrId: "35a13c183a",
  qrString: "...",
  amount: 0.01,
  score: 50000,
  dateStarted: 1715558400,
  dateFinished: 1715558400,
  datePaid: 1715558400,
  dateCreated: 1715558400,
  dateExpires: dateCreated + 360,
}
```

`USER`:

```ts
{
  PK: `USER#${cognitoId}`,
  SK: "METADATA",
  GSI2PK: "LEADERBOARD",
  GSI2SK: `MAX_SCORE#${maxScore}#GAME#${bestGameId}`,
  nickname: "steve",
  maxScore: 50000,
  bestGameId: "01JBAVWE4NS5TGXHWGMX3KH23Q",
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
  dateCreated: AWSTimestamp!
  dateExpires: AWSTimestamp!
  datePaid: AWSTimestamp
  dateStarted: AWSTimestamp
  dateFinished: AWSTimestamp
}

type LeaderboardScore { 
  nickname: String!  
  score: Int!  
  dateAchieved: AWSTimestamp!
}

type Leaderboard { 
  top: [LeaderboardScore!]!
  me: LeaderboardScore
  myRank: Int
}

type Query {
  getGame(id: ID!): Game
  getLeaderboard(limit: Int): Leaderboard
}

type Mutation {
  createGame: Game
  updateGame(gameId: ID!, status: GameStatus!, score: Int): Game
  updateGameToPaid(gameId: ID!): Game @aws_iam
  updateLeaderboard: Leaderboard @aws_iam
}

type Subscription {
  onGamePaid(gameId: ID!): Game @aws_subscribe(mutations: ["updateGameToPaid"])
  onLeaderboardUpdated: Leaderboard @aws_subscribe(mutations: ["updateLeaderboard"])
}
```

> Te recomendamos que utilices [ULID](https://github.com/ulid/spec) para generar los IDs de las partidas. Esto va a ser útil para filtrar los resultados en base a tiempo.

## 💳 pey

- [Documentación](https://docs.pey.mx/)
- [Crear QR](https://docs.pey.mx/docs/api/create-qr)
- [Webhook](https://docs.pey.mx/docs/webhooks/codi/qr)
- [Configurar webhooks](https://docs.pey.mx/docs/tutorials/getting-started/set-up-webhooks)
- No hay sandbox: cada prueba es un pago real de $0.01. Registra en el portal la URL de tu API Gateway como webhook.
- La respuesta de crear QR regresa el identificador de Banxico como `id`; en el webhook ese mismo valor llega como `codiQrId`.
- Los valores de `metadata` deben ser escalares y se regresan como strings. En el webhook llegan en `metadata.externalMetadata` (por ejemplo, `metadata.externalMetadata.gameId`).

## 🏆 Extras (opcionales)

- CI/CD con GitHub Actions (cdk deploy + build de Amplify).
- Leaderboard semanal además del histórico.
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
- Seguridad: firma del webhook, autorización por usuario, secretos, mutaciones IAM.
- Correctitud: idempotencia, escrituras condicionales, transiciones de estado válidas.
- Arquitectura orientada a eventos (DynamoDB Streams, SNS con filtros, suscripciones AppSync).
- Diseño de DynamoDB (patrones de acceso sin Scan).
- Calidad y claridad del código, CDK bien organizado, commits limpios.
- UX: que se sienta arcade y que sea claro en cada estado (esperando pago, expirado, jugando, game over).
- Legibilidad: el código debe de ser limpio y consistente (mismas prácticas en diferentes bloques), debe de leerse como un libro.
- Optimización: minimizar el uso de llamadas a AWS.

> Puedes cambiar, agregar o quitar características del proyecto siempre y cuando expliques por qué tomaste las decisiones en el `README` del repositorio entregable.

## 💡 Tips

- Documenta cualquier decisión técnica que hayas tomado.
- Si algo no está claro, elige una solución razonada y explícalo.
- Haz un UI simple, cuida usabilidad y presentación.
- Haz `commits` lógicos, claros y estructurados.
- Usa IA a tu favor, pero entiende lo que estás haciendo.

---

¡Éxito! Estamos emocionados de ver tu trabajo 🚀
