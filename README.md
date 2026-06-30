# Linky

A simple URL shortener — turns long URLs into short, easy-to-share links. Built with **FastAPI** (backend) and **Next.js** (frontend).

## Status

🚧 Work in progress.

## Features (planned)

- Create a short link from a long URL
- Redirect from a short link to the original URL
- User authentication
- Click statistics per link

## Tech Stack

- **Backend**: Python, FastAPI, Uvicorn, SQLAlchemy, Alembic, psycopg
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, pnpm
- **Database**: PostgreSQL
- **Infra**: Docker, Docker Compose

## Project Structure

```
linky/
├── backend/
│   ├── app/
│   │   ├── api/            # routes/endpoints
│   │   ├── core/           # core configuration (config.py)
│   │   ├── db/              # database connection & setup
│   │   ├── dependencies/   # FastAPI dependency injection
│   │   ├── models/         # database models
│   │   ├── repositories/   # data access
│   │   ├── schemas/        # request/response schemas (Pydantic)
│   │   ├── services/       # business logic
│   │   ├── utils/          # helpers/utilities
│   │   └── main.py         # FastAPI entry point
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app/                # pages & layout (App Router)
│   ├── hooks/               # custom React hooks (e.g. use-cookie.ts)
│   ├── lib/                 # fetch wrapper, client helpers (e.g. api.ts)
│   └── Dockerfile
└── docker-compose.yml       # services: postgres, backend, frontend
```

## Running with Docker

```bash
docker compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`
- PostgreSQL: `localhost:5432` (default user/pass/db: `linky`/`linky`/`linky`)

## Running Manually (without Docker)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # adjust DATABASE_URL
fastapi dev
```

The backend will run at `http://localhost:8000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend will run at `http://localhost:3000`.
