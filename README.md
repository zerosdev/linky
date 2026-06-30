# Linky

Aplikasi sederhana URL shortener — memendekkan URL panjang menjadi tautan singkat yang mudah dibagikan. Dibangun dengan **FastAPI** (backend) dan **Next.js** (frontend).

## Status

🚧 Dalam pengembangan. Backend masih berupa skeleton FastAPI, frontend belum di-scaffold.

## Fitur (rencana)

- Membuat short link dari URL panjang
- Redirect dari short link ke URL asli
- Autentikasi pengguna
- Statistik klik per link

## Tech Stack

- **Backend**: Python, FastAPI, Uvicorn
- **Frontend**: Next.js

## Struktur Proyek

```
linky/
├── backend/
│   ├── app/
│   │   ├── api/            # route/endpoint
│   │   ├── core/           # konfigurasi inti
│   │   ├── db/             # koneksi & setup database
│   │   ├── dependencies/   # dependency injection FastAPI
│   │   ├── models/         # model database
│   │   ├── repositories/   # akses data
│   │   ├── schemas/        # schema request/response (Pydantic)
│   │   ├── services/       # logika bisnis
│   │   ├── utils/          # helper/utility
│   │   └── main.py         # entry point FastAPI
│   └── requirements.txt
└── frontend/                # Next.js (belum di-scaffold)
```

## Menjalankan Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend akan berjalan di `http://localhost:8000`.

## Menjalankan Frontend

Frontend belum di-scaffold. Untuk memulai:

```bash
cd frontend
npx create-next-app@latest .
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`.
