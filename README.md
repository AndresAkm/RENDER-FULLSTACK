# Sistema de Gestión - Frontend y Backend Separados

Este proyecto está dividido en dos aplicaciones independientes:
- **Backend**: API REST con Node.js, Express y MongoDB
- **Frontend**: Aplicación web con EJS que consume la API

## Estructura del Proyecto

\`\`\`
proyecto/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── index.js
│   └── .env
└── frontend/
    ├── routes/
    ├── views/
    │   ├── pages/
    │   └── partials/
    ├── static/
    │   ├── css/
    │   ├── js/
    │   └── images/
    ├── config/
    ├── package.json
    ├── index.js
    └── .env
\`\`\`

## Instalación y Configuración

### Backend

1. Navegar a la carpeta backend:
\`\`\`bash
cd backend
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno en `.env`:
\`\`\`env
USER_DB=tu_usuario_mongodb
PASS_DB=tu_contraseña_mongodb
NAME_DB=tu_base_de_datos
PORT=8300
FRONTEND_URL=http://localhost:3001
NODE_ENV=development
\`\`\`

4. Ejecutar en modo desarrollo:
\`\`\`bash
npm run dev
\`\`\`

### Frontend

1. Navegar a la carpeta frontend:
\`\`\`bash
cd frontend
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno en `.env`:
\`\`\`env
PORT=3001
API_BASE_URL=http://localhost:8300/api/v2
NODE_ENV=development
\`\`\`

4. Ejecutar en modo desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## URLs de Acceso

- **Backend API**: http://localhost:8300/api/v2
- **Frontend Web**: http://localhost:3001

## Funcionalidades

### Backend (API REST)
- CRUD completo para Clientes, Productos y Usuarios
- Validaciones de datos
- Manejo de errores
- CORS configurado
- Logging con Morgan

### Frontend (Aplicación Web)
- Interfaz web completa con Bootstrap 5
- Formularios para crear/editar registros
- Listados con paginación
- Alertas de éxito/error
- Diseño responsivo
- Navegación intuitiva

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- dotenv
- Morgan (logging)
- CORS

### Frontend
- Node.js
- Express.js
- EJS (motor de plantillas)
- Bootstrap 5
- Font Awesome
- Axios (cliente HTTP)
- Method Override

## Scripts Disponibles

### Backend
- `npm start`: Ejecutar en producción
- `npm run dev`: Ejecutar en desarrollo con nodemon

### Frontend
- `npm start`: Ejecutar en producción
- `npm run dev`: Ejecutar en desarrollo con nodemon
