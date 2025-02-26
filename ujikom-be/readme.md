# RESTFULL API ADMIN JOKI
<br>

**Nama:** Faiz Rizky Muzamil <br>
<br>

## Deskripsi Projek 

**API Admin Joki** adalah sebuah Rest Full API yang dirancang untuk memudahkan pengelolaan DATA Joki Games Mobile Legend menggunakan Express JS sebagai framework dan sequelize dalam pemilihan orm di Node.js. API ini memungkinkan Admin untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada Customer, Stock, dan Pembayaran

## Dependencies / Teknologi yang digunakan

1. **express**

    Express JS sebagai framework Node.js untuk mengelola request dan response HTTP

    ```bash
   npm i express
    ```

2. **mysql**

    package untuk melakukan koneksi ke database

    ```bash
    npm i mysql
    ```

3. **dotenv**

    Dotenv untuk mengatur variabel lingkungan
    ```bash
    npm i dotenv
    ```

4. **cors**

    Untuk memberikan akses pada frontend

    ```bash
    npm i cors
    ```
5. **sequelize**

    Sebagai Orm yang dipakai

    ```bash
    npm i sequelize

6. **body parser**

    Berfungsi untuk membuat data dapat diakses melalui `req.body` .

    ```bash
    npm install body-parser
    ```


7. **nodemon**

    jalankan dengan mengetikan perintah ( nodemon index / npm run dev )

    ```bash
    npm install nodemon
    ```

    Perintah ini akan menjalankan server secara terus menerus

    Aplikasi akan berjalan pada port yang ditentukan di file `.env` .

    <br>


    ## Cara Penggunaan

1. Pastikan Node.js dan npm telah terinstall di komputer Anda.
2. Clone atau download projek ini ke direktori lokal Anda.
3. Jalankan `npm install` untuk menginstall dependensi yang diperlukan.
4. Buat file `env` dan beri variabel PORT dan DB_NAME (sesuai nama database).
5. Jalankan `node models/index.js` untuk membuat Table.
6. Untuk melakukan testing / mengisi contoh data jalankan `node seeders/seeders.js` (opsional).
6. Jika table database sudah dibuat jalankan aplikasi dengan command `node index.js` / `nodemon index.js`.
7. Aplikasi akan berjalan di `http://localhost:PORT`, dengan PORT adalah nomor port yang ditentukan dalam file `.env`.

<br>


<!-- - **Class Diagram**

<img src="./image/relasidrawio.png" />

<br>

- **ERD (Entity Relationship Diagram)**

<img src="./image/ERD.png" />
<br> -->


- **Relasi Table**

<img src="./image/image.png" />

<br>
<br>
<br>
