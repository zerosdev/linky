# Linky

Aplikasi sederhana URL shortener — memendekkan URL panjang menjadi tautan singkat yang mudah dibagikan. Dibangun dengan **FastAPI** (backend) dan **Next.js** (frontend).

## Status

🚧 Dalam pengembangan.

## Fitur (rencana)

- Membuat short link dari URL panjang
- Redirect dari short link ke URL asli
- Autentikasi pengguna
- Statistik klik per link

## Tech Stack

- **Backend**: Python, FastAPI, Uvicorn, SQLAlchemy, Alembic, psycopg
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, pnpm
- **Database**: PostgreSQL
- **Infra**: Docker, Docker Compose

## Struktur Proyek

```
linky/
├── backend/
│   ├── app/
│   │   ├── api/            # route/endpoint
│   │   ├── core/           # konfigurasi inti (config.py)
│   │   ├── db/             # koneksi & setup database
│   │   ├── dependencies/   # dependency injection FastAPI
│   │   ├── models/         # model database
│   │   ├── repositories/   # akses data
│   │   ├── schemas/        # schema request/response (Pydantic)
│   │   ├── services/       # logika bisnis
│   │   ├── utils/          # helper/utility
│   │   └── main.py         # entry point FastAPI
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/                # halaman & layout (App Router)
│   ├── hooks/               # custom React hooks (mis. use-cookie.ts)
│   ├── lib/                 # fetch wrapper, helper client (mis. api.ts)
│   └── Dockerfile
└── docker-compose.yml       # service: postgres, backend, frontend
```

## Menjalankan dengan Docker

```bash
docker compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- PostgreSQL: `localhost:5432` (user/pass/db default: `linky`/`linky`/`linky`)

## Menjalankan Manual (tanpa Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # sesuaikan DATABASE_URL
fastapi dev
```

Backend akan berjalan di `http://localhost:8000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend akan berjalan di `http://localhost:3000`.
