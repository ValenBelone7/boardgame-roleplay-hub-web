# Arcana — Web

> *Donde cada tirada se convierte en leyenda.*

**Arcana** es una tienda de juegos de mesa y de rol que además es punto de encuentro de su comunidad. Vende juegos, manuales y accesorios, y organiza en su local torneos, partidas de rol y noches de juegos. Cada evento deja su **tabla de ganadores** y sus **leyendas**: crónicas de lo que pasó en la mesa, que forman el salón de la fama de la tienda.

Este repositorio contiene el **frontend** de Arcana, construido con Next.js. Consume la API REST del repositorio [`boardgame-roleplay-hub-django`](https://github.com/ValenBelone7/boardgame-roleplay-hub-django) (Django + Django REST Framework).

> Evaluación Final Integradora 2026 — Programación III (ITEC).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) y React 19, en JavaScript.
- [Tailwind CSS 4](https://tailwindcss.com).
- [pnpm](https://pnpm.io) como gestor de paquetes.

## Requisitos

- Node.js 20.9 o superior.
- pnpm (`corepack enable` lo deja disponible).
- La [API de Arcana](https://github.com/ValenBelone7/boardgame-roleplay-hub-django) corriendo localmente con sus datos de ejemplo, o su URL desplegada.

## Instalación

```bash
git clone git@github.com:ValenBelone7/boardgame-roleplay-hub-web.git
cd boardgame-roleplay-hub-web
pnpm install
cp .env.example .env.local
pnpm dev
```

La aplicación queda en <http://localhost:3000>.

> Con npm también funciona: `npm install` y `npm run dev`.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `API_URL` | URL base de la API de Arcana, sin barra final | `http://127.0.0.1:8000` |

Se definen en `.env.local` (no se sube al repositorio). La lee solo el servidor de Next.

## Scripts

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build de producción |
| `pnpm lint` | ESLint |

## Equipo

- Valentín Belone
- Tiago Pescara
