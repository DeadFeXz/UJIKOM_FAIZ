# README

## Cara Menjalankan Proyek

### 1. Persiapan Awal
Sebelum menjalankan proyek, pastikan telah mengunduh dan menginstal:
- [Node.js](https://nodejs.org/) (disarankan versi terbaru)
- [XAMPP](https://www.apachefriends.org/download.html) untuk menjalankan server MySQL dan Apache
- [Git](https://git-scm.com/) (opsional, untuk mengelola repositori kode)
- Paket dependensi proyek dengan menjalankan `npm install` di setiap folder proyek

### 2. Menjalankan Dashboard Admin
1. Buka terminal dan masuk ke direktori `ujikom-dashboard`.
2. Jalankan perintah berikut:
   ```sh
   npm start
   ```
3. Jika belum menginstal React, lakukan instalasi terlebih dahulu dengan perintah:
   ```sh
   npm install
   ```
4. Setelah dijalankan, dashboard admin akan berjalan di `http://localhost:3000`.

### 3. Menjalankan Backend
1. Buka terminal dan masuk ke direktori `ujikom-be`.
2. Pastikan XAMPP sudah berjalan.
3. Jalankan server backend dengan perintah:
   ```sh
   nodemon index
   ```
4. Backend akan berjalan di `http://localhost:3001`.

### 4. Menjalankan Landing Page
1. Buka terminal dan masuk ke direktori `ujikom-fe`.
2. Jalankan perintah berikut:
   ```sh
   npm start
   ```
3. Jika belum menginstal dependensi, jalankan:
   ```sh
   npm install
   ```
4. Setelah dijalankan, landing page akan tampil di browser.

Setelah ketiga file berjalan, Anda dapat melihat seluruh tampilan dan sistemnya. Terima kasih!

