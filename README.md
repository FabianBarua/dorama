# Backend Proxy - Dramabox API

## Descripción
Backend que actúa como proxy para evitar CORS al hacer peticiones a la API de Dramabox. Implementa caché del bearer token con renovación automática cada hora.

## Endpoints Disponibles

### 1. GET `/api/dramabox/home`
Obtiene la página de inicio con dramas recomendados.

**Query Parameters (opcionales):**
- `homePageStyle`: number (default: 0)
- `isNeedRank`: number (default: 1)
- `index`: number (default: 0)
- `type`: number (default: 0)
- `channelId`: number (default: 177)

**Ejemplo:**
```bash
GET http://localhost:3000/api/dramabox/home
GET http://localhost:3000/api/dramabox/home?channelId=177&isNeedRank=1
```

### 2. GET `/api/dramabox/search`
Busca dramas por palabra clave.

**Query Parameters:**
- `keyword`: string (requerido)

**Ejemplo:**
```bash
GET http://localhost:3000/api/dramabox/search?keyword=camilo
```

### 3. GET `/api/dramabox/getchapters`
Obtiene los capítulos de un drama específico.

**Query Parameters:**
- `bookId`: string (requerido)

**Body (opcional):** JSON con parámetros adicionales
- `boundaryIndex`: number
- `index`: number
- `loadDirection`: number
- `preLoad`: boolean

**Ejemplo:**
```bash
GET http://localhost:3000/api/dramabox/getchapters?bookId=42000000746
```

## Características

### Gestión de Bearer Token
- ✅ Caché automática del token
- ✅ Renovación cada 1 hora
- ✅ Logs informativos del estado del caché

### CORS
- ✅ Configurado para permitir todas las origins
- ✅ Soporta todos los métodos HTTP necesarios

### Tipos TypeScript
- ✅ Tipos completos para todas las respuestas
- ✅ Inferencia de tipos automática

## Instalación y Ejecución

```bash
cd backend
npm install
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Estructura

```
src/
├── controllers/
│   └── dramabox.controller.ts    # Controlador de endpoints
├── services/
│   ├── bearer.service.ts         # Gestión del token
│   └── dramabox.service.ts       # Peticiones a Dramabox API
├── routes/
│   └── dramabox.routes.ts        # Definición de rutas
├── types/
│   ├── requests.types.ts         # Tipos de requests
│   └── [otros tipos de response]
├── app.ts                        # Configuración Express
└── index.ts                      # Punto de entrada
```
