#!/bin/sh
echo "Menunggu database siap..."
sleep 3

echo "Menjalankan migrasi..."
npm run db:migrate

echo "Menjalankan seed admin (aman dijalankan berkali-kali)..."
node src/db/seed-admin.js || true

echo "Menjalankan server..."
npm run dev