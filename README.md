# 📝💜 Notas con Sentimiento

App para crear notas con sentimientos. Hecha para un coding challenge en 2 días usando AWS.

🌐 **Demo:** [Ver app funcionando](https://main.d6otbq3z6xa4f.amplifyapp.com)

---

## 🚀 Lo que logré

✅ App completa desplegada en AWS  
✅ CRUD de notas con sentimientos (happy/sad/neutral/angry)  
✅ UI moderna morada con glassmorphism  
✅ GraphQL + DynamoDB funcionando  

---

## 🧗 Mi experiencia

**El challenge:** Aprender AWS stack en tiempo récord y entregar algo funcional.

**La realidad:** Lo rehice 3 veces porque no lograba conectar GraphQL bien 😅

1. **Intento 1:** Problemas de auth
2. **Intento 2:** Variables de entorno mal
3. **Intento 3:** ¡Por fin funcionó! 🎉

**Plot twist:** Terminé haciendo todo en main porque necesitaba deploy rápido y no tenía tiempo para PRs perfectos.

---

## 🛠️ Stack

**Frontend:** React + Next.js + Tailwind  
**Backend:** AWS AppSync (GraphQL) + DynamoDB  
**Deploy:** AWS Amplify  
**Design:** Tema morado porque... ¿por qué no? 💜

---

## 🏃‍♀️ Setup rápido

```bash
# Clona el repo
git clone <tu-fork>
cd coding_challenge/website

# Instala dependencias
npm install

# Configura env vars (necesitas tus credenciales AWS)
cp .env.example .env
# Agrega: NEXT_PUBLIC_APPSYNC_API_URL, etc.

# Corre local
npm run dev
```

**Para deploy:** Push a main y AWS Amplify hace la magia ✨

---

## 💡 Lo que aprendí

- **GraphQL:** No es tan scary como pensé
- **DynamoDB:** NoSQL puede ser divertido
- **AWS Amplify:** CI/CD automático = 🤯
- **Debugging:** console.log es tu mejor amigo
- **Persistencia:** A la 3ra va la vencida

---

## 🎯 Para recruiters

**Skills demostradas:**
- Aprendizaje rápido (AWS stack en 1.5 días)
- Problem solving (3 iteraciones hasta el éxito)
- Fullstack (React + AWS backend)
- Deploy real (no solo localhost)

**Lo que me gustó:** Conectar las piezas y ver todo funcionar al final.

**Lo que fue duro:** Los errores crípticos de AWS. Google y StackOverflow fueron mis compañeros 😄

---

## 🔧 Arquitectura

```
Next.js App → AWS AppSync → DynamoDB
      ↓
 AWS Amplify (hosting)
```

Simple pero efectiva 👌

---

## 📱 Funcionalidades

- ✍️ **Crear notas** con sentimiento
- 📖 **Ver todas las notas** paginadas
- 🔍 **Filtrar por sentimiento**
- 📅 **Timestamps automáticos**
- 💜 **UI que no duele la vista**

---

## 🤝 Conclusión

Fue un challenge intenso pero divertido. Aprendí un montón sobre AWS y al final tengo una app que realmente funciona en producción.

¿El resultado? Me siento orgullosa del código y del producto final 💜

---

*Hecho con ☕ y determinación para conseguir un buen trabajo*# Trigger redeploy
