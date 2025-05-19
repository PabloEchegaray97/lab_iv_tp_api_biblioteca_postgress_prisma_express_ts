# API REST de Biblioteca con Prisma y PostgreSQL

-Por ahora solo estan disponibles los endpoints de usuarios-

## Requisitos previos

- Node.js (v14 o +)
- Docker y Docker Compose
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias:
```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=biblioteca
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/biblioteca"
```

4. Iniciar la base de datos PostgreSQL con Docker:
```bash
docker compose up -d
```

5. Generar el cliente Prisma y aplicar las migraciones:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Url de la api: http://localhost:3000

## Endpoints

### Usuarios

- **GET /usuarios**: Obtener todos los usuarios
- **GET /usuarios/:id**: Obtener un usuario por ID
- **POST /usuarios/register**: Registrar un nuevo usuario
- **PUT /usuarios/:id**: Actualizar un usuario existente
- **DELETE /usuarios/:id**: Eliminar un usuario

## Estructura del proyecto
```
biblioteca-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── app.ts
│   └── server.ts
├── .env
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
``` 