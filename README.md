🏆 XAcademy Challenge – Backend (Node + TypeScript + MySQL + Sequelize)

Este proyecto corresponde al Challenge XAcademy DEV, implementando un backend completo en Node.js + Express + TypeScript, con autenticación JWT, paginación, filtros, validaciones y manejo de usuarios propios.

🚀 Tecnologías

Node.js / Express

TypeScript

Sequelize ORM

MySQL (vía Docker)

JWT (jsonwebtoken)

bcryptjs

express-validator

CORS / Helmet

⚙️ Instalación

Clonar el repositorio

git clone https://github.com/<tu-usuario>/<nombre-repo>.git
cd backend


Instalar dependencias

npm install


Crear el archivo .env (basado en .env.example)

DB_HOST=localhost
DB_PORT=3306
DB_NAME=fifa_local
DB_USER=root
DB_PASS=rootpass
JWT_SECRET=change-me
PORT=3000

| Variable | Ejemplo | Descripción |
|-----------|----------|-------------|
| DB_HOST | localhost | Host de la base de datos MySQL |
| DB_PORT | 3306 | Puerto del servicio MySQL |
| DB_NAME | fifa_local | Nombre de la base de datos |
| DB_USER | root | Usuario de la base |
| DB_PASS | rootpass | Contraseña |
| JWT_SECRET | change-me | Clave para firmar tokens JWT |
| PORT | 3000 | Puerto local de la API |



Levantar MySQL con Docker (si no está corriendo):

docker run -d --name mysql-fifa -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 mysql:8


Importar los archivos SQL de jugadores:

docker cp fifa_male_players.sql mysql-fifa:/tmp/
docker cp fifa_female_players.sql mysql-fifa:/tmp/

docker exec -i mysql-fifa sh -c "mysql -uroot -prootpass fifa_local < /tmp/fifa_male_players.sql"
docker exec -i mysql-fifa sh -c "mysql -uroot -prootpass fifa_local < /tmp/fifa_female_players.sql"


Crear vistas y tabla personalizada (my_players) ejecutando el script SQL incluido en /scripts/db_setup.sql o desde consola (según instrucciones del repo).

🧩 Scripts disponibles
Comando	Descripción
npm run dev	Ejecuta el proyecto en modo desarrollo (nodemon + ts-node)
npm run build	Compila el código TypeScript a JavaScript en /dist
npm start	Ejecuta el build compilado
🔐 Autenticación

Ruta: POST /auth/login

Body:

{ "email": "admin@xacademy.dev", "password": "admin123" }


Respuesta:

{ "token": "eyJhbGciOi..." }


Usar el token en todas las rutas protegidas con:

Authorization: Bearer <token>

📚 Endpoints principales
🎮 Jugadores (vista unificada)
Método	Ruta	Descripción	Auth
GET	/api/players	Lista jugadores con paginación y filtros	✅
GET	/api/players/:id	Devuelve el detalle de un jugador	✅
GET	/api/players/export	Exporta jugadores filtrados en CSV	✅

Filtros disponibles:
name, club, position, gender, version, page, pageSize

👤 Mis jugadores (creados por el usuario)
Método	Ruta	Descripción	Auth
GET	/api/my-players	Lista solo los jugadores creados por el usuario	✅
POST	/api/my-players	Crea un nuevo jugador propio	✅
PUT	/api/my-players/:id	Edita un jugador propio	✅
🧠 Validaciones y seguridad

JWT Middleware: protege todas las rutas bajo /api/*.

express-validator: asegura tipos correctos y valores válidos.

bcrypt: encriptado de contraseñas.

helmet y CORS configurables en app.ts para entornos productivos.

Check de ownership: en my_players, sólo el creador puede editar.

📂 Estructura del proyecto
src/
├── app.ts                         # Configuración principal de Express
├── db/
│   ├── sequelize.ts                # Conexión Sequelize
│   ├── models/
│   │   ├── PlayerFlat.ts
│   │   ├── MyPlayer.ts
│   │   └── User.ts
├── modules/
│   ├── auth/                       # Login + middleware JWT
│   ├── players/                    # Endpoints de jugadores globales
│   └── myplayers/                  # Endpoints de jugadores del usuario
├── shared/
│   └── validation.ts               # Manejo centralizado de validaciones
└── types/
    └── express.d.ts                # Extensión de tipo para req.user

🧪 Test rápido con Insomnia / Postman

POST /auth/login → obtené el token.

GET /api/players?gender=male&version=23 (con header Authorization) → lista jugadores.

POST /api/my-players → crea tu jugador.

GET /api/my-players → muestra tus jugadores.

GET /api/players/export?gender=female → descarga CSV filtrado.

🧾 Créditos

Desarrollado por Paolo [Paolo1107]
Challenge oficial XAcademy DEV 2025
