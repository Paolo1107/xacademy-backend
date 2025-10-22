/// <reference path="./types/express.d.ts" />

// ===============================
// 📦 Importaciones principales
// ===============================
import express from "express";
import cors from "cors";
import "dotenv/config";



// ===============================
// 🧩 Importaciones de módulos locales
// ===============================
import { testConnection } from "./db/sequelize";
import authRoutes from "./modules/auth/auth.routes";
import playerRoutes from "./modules/players/player.routes";
import myPlayersRoutes from "./modules/myplayers/myplayers.routes";
import { auth } from "./modules/auth/auth.middleware";

// ===============================
// 🚀 Inicialización de la app
// ===============================
const app = express();

// ===============================
// ⚙️ Middlewares globales
// ===============================

// Habilita CORS (permite que el frontend se comunique con la API)
app.use(cors());

// Permite leer JSON en el body de las peticiones
app.use(express.json({ limit: "1mb" }));

// Permite leer datos enviados por formularios (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// ===============================
// 🪵 Logger simple (para desarrollo)
// ===============================
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// ===============================
// 🩺 Health Check (para comprobar estado del servidor)
// ===============================
app.get("/health", (_req, res) => res.json({ ok: true }));

// ===============================
// 🔐 Rutas principales
// ===============================

// Rutas de autenticación (no requieren token)
app.use("/auth", authRoutes);

// Rutas protegidas con middleware JWT
app.use("/api/my-players", auth, myPlayersRoutes); // jugadores creados por usuarios
app.use("/api/players", auth, playerRoutes);       // jugadores del dataset global

// ===============================
// 🚫 Manejo de rutas inexistentes (404)
// ===============================
app.use((_req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// ===============================
// 🚀 Inicialización del servidor
// ===============================
const PORT = Number(process.env.PORT ?? 3000);

app.listen(PORT, async () => {
  console.log("🚀 Iniciando servidor...");
  await testConnection(); // Verifica conexión a la base de datos
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
