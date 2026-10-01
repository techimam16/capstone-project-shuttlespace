# 🏸 ShuttleSpace - Badminton Court Booking System

**ShuttleSpace** adalah aplikasi web full-stack untuk sistem pemesanan (booking) lapangan bulu tangkis secara online dan real-time. Aplikasi ini memudahkan pengguna untuk melihat ketersediaan slot waktu lapangan, melakukan reservasi, serta menyediakan panel khusus bagi admin untuk mengelola data lapangan dan status pemesanan.

---

## 🚀 Tech Stack

### Backend
- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) (v5)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM & Migrations**: [Drizzle ORM](https://orm.drizzle.team/) & Drizzle Kit
- **Autentikasi**: JSON Web Token (JWT) & bcryptjs
- **Containerization**: Docker & Docker Compose

### Frontend
- **Framework & Bundler**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## ✨ Fitur Utama

- 🔐 **Autentikasi & Otorisasi**: Registrasi dan Login dengan enkripsi password (bcrypt) serta proteksi endpoint berbasis JWT Role (`user` & `admin`).
- 🏸 **Katalog & Manajemen Lapangan**: Melihat daftar lapangan, detail harga, tipe permukaan, dan fitur CRUD lapangan untuk admin.
- 📅 **Pengecekan Ketersediaan Waktu Real-Time**: Grid visual ketersediaan slot jam untuk mencegah pemesanan ganda (double-booking).
- 📝 **Pemesanan Lapangan (Booking)**: Alur pemesanan interaktif dengan validasi ketersediaan dan status otomatis.
- 📋 **Riwayat Pemesanan**: Halaman riwayat pemesanan pengguna dengan badge status interaktif.
- 📊 **Admin Dashboard**: Panel kontrol admin untuk konfirmasi, penyelesaian, atau pembatalan jadwal pemesanan.

---

## 📁 Struktur Direktori

```text
shuttlespace-booking-system/
├── backend/
│   ├── drizzle/               # File migrasi SQL Drizzle
│   ├── postman/               # File export Postman Collection & Environment
│   ├── src/
│   │   ├── config/            # Konfigurasi database & environment
│   │   ├── controllers/       # Controller logic (Auth, Booking, Lapangan, User)
│   │   ├── db/                # Schema database & script seed
│   │   ├── middlewares/       # Auth guard, error handling, validator
│   │   ├── routes/            # Definisi endpoint API
│   │   └── utils/             # Helper validasi
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── drizzle.config.js
│   └── package.json
├── frontend/
│   ├── public/                # Asset publik & ikon
│   ├── src/
│   │   ├── assets/            # Gambar dan logo
│   │   ├── components/        # Komponen UI (Navbar, Modal, Grid, dll)
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── pages/             # Halaman User & Admin
│   │   └── utils/             # API client & formatting helper
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml         # Konfigurasi multi-container PostgreSQL & Backend
└── README.md
```

---

## 🛠️ Panduan Memulai (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18+) & `npm`
- [PostgreSQL](https://www.postgresql.org/) (jika menjalankan database lokal tanpa Docker)
- [Docker](https://www.docker.com/) & Docker Compose (opsional, direkomendasikan)

---

### Cara 1: Menggunakan Docker Compose (Direkomendasikan untuk Backend & Database)

1. **Clone repositori**:
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd shuttlespace-booking-system
   ```

2. **Siapkan environment file backend**:
   Salin contoh file `.env.example` ke `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   *Sesuaikan `JWT_SECRET` di `backend/.env` dengan string rahasia Anda.*

3. **Jalankan container backend & database**:
   ```bash
   docker compose up --build
   ```
   *Docker Compose akan otomatis menyiapkan PostgreSQL, menjalankan migrasi database, membuat akun admin bawaan, dan menyalakan API backend di port `3000`.*

4. **Jalankan frontend**:
   Di terminal terpisah:
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```
   Aplikasi frontend dapat diakses melalui `http://localhost:5173`.

---

### Cara 2: Menjalankan Secara Manual (Local Setup)

#### 1. Setup Backend

1. Buka folder backend dan pasang dependensi:
   ```bash
   cd backend
   npm install
   ```

2. Buat file `.env` di dalam folder `backend/`:
   ```env
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/shuttlespace_db
   JWT_SECRET=supersecretkey_shuttlespace
   ```

3. Jalankan migrasi database:
   ```bash
   npm run db:migrate
   ```

4. Jalankan seeder akun Admin bawaan:
   ```bash
   npm run seed:admin
   ```

5. Jalankan backend development server:
   ```bash
   npm run dev
   ```
   Backend berjalan di: `http://localhost:3000`

---

#### 2. Setup Frontend

1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Buat file `.env` di dalam folder `frontend/`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. Jalankan development server frontend:
   ```bash
   npm run dev
   ```
   Buka browser di: `http://localhost:5173`

---

## 👤 Akun Bawaan (Default Seed)

Setelah menjalankan migrasi / script seed admin:
- **Role**: Admin
- **Username**: `admin_shuttlespace`
- **Password**: `adminpw123`

---

## 📮 Dokumentasi API (Postman)

Koleksi Postman untuk pengujian endpoint API tersedia di direktori `backend/postman/`:
- `backend/postman/Pengujian API Proyek ShuttleSpace.postman_collection.json`
- `backend/postman/ShuttleSpace Local.postman_environment.json`

Impor kedua file tersebut ke dalam aplikasi **Postman** untuk menguji alur autentikasi, booking, dan manajemen lapangan.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan Capstone Project Web Development KSM Multimedia.
