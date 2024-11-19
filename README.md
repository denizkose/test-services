# Test Tasks

## Info

__DB:__ Postgres (https://supabase.com/)

__Frontend:__ Vite + ReactJS + TailwindCSS

__Backends:__
- JS + ExpressJS
- TS + ExpressJS
- NestJS

## Run tasks

Create .env in project root and frontend folder (see `.env.example` in folders)

__Enviroments for testing__

`frontend/.env`

```bash
VITE_API_1='http://localhost:3001/api/'
VITE_API_2='http://localhost:3002/api/'
```

`.env`

```bash
DB_HOST='aws-0-us-east-1.pooler.supabase.com'
DB_PORT='5432'
DB_USER='postgres.nhdpasxupwkwbtpjsfcb'
DB_PASSWORD='wQa74Lyx#tE$bZH'
DB_NAME='postgres'
```

```bash
pnpm -r install
```
```bash
pnpm -r start
```

__Open http://localhost:5137__

### (Addition) Task 2

1M users already exists in DB.

Recreate users with migration:

```bash
cd user-service
```
```bash
pnpm build
```
```bash
pnpx typeorm migration:revert --dataSource ./dist/src/data-source.js
```
```bash
pnpx typeorm migration:run --dataSource ./dist/src/data-source.js
```

Or use buttons from frontend
