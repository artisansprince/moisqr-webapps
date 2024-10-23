# Panduan Untuk Installasi dan Running Backend Nestjs
Baik, kita akan melakukan instalasi **NestJS CLI** tanpa menggunakan flag `-g`. Berikut langkah-langkahnya:

1. **Buka terminal** dan buat folder utama `moisqr`:
   ```bash
   mkdir moisqr
   cd moisqr
   ```

2. **Buat folder untuk backend**:
   ```bash
   mkdir backend
   ```

3. **Masuk ke folder backend**:
   ```bash
   cd backend
   ```

4. **Inisialisasi project Node.js** dan install **NestJS CLI** di dalam folder backend:
   ```bash
   npm init -y
   npm install @nestjs/cli
   ```

5. **Buat folder baru untuk aplikasi NestJS** bernama `nest-app`:
Karena menggunakan nest cli di local folder, yakni di folder backend, maka kita harus membuat folder lain untuk menyimpan nestjs di dalam folder backend.
   ```bash
   mkdir nest-app
   cd nest-app
   ```

6. **Buat project NestJS** di dalam folder `nest-app`:
   ```bash
   npx nest new .
   ```

Dengan langkah-langkah ini, struktur foldernya akan menjadi seperti ini:

```
/moisqr
│
├── /backend
│   ├── package.json     # Dependencies untuk backend
│   ├── /nest-app        # Folder untuk project NestJS
│   │   ├── /src         # Kode sumber
│   │   ├── package.json  # Dependencies dan skrip untuk NestJS
│   │   └── ...
│
└── /frontend            # Folder untuk frontend
```

Ini memastikan bahwa semua dependensi terkait NestJS hanya berada di dalam folder `nest-app` tanpa menggunakan instalasi global.


## Panduan Menjalankan Backend Nestjs Setelah Clone
Berikut adalah panduan untuk menjalankan backend NestJS setelah melakukan clone dari repository:

## Panduan Menjalankan Backend NestJS Setelah Clone

1. **Buka terminal** dan navigasikan ke folder `moisqr-webapps/backend/nest-app`:
   ```bash
   cd path/to/moisqr-webapps/backend/nest-app
   ```

2. **Install dependencies** yang diperlukan untuk project NestJS. Jalankan perintah berikut:
   ```bash
   npm install
   ```

3. **Jalankan aplikasi NestJS**. Setelah semua dependencies terinstall, kamu bisa menjalankan aplikasi dengan perintah berikut:
   ```bash
   npm run start
   ```

   Jika kamu ingin menjalankan aplikasi dalam mode development (hot-reloading), gunakan:
   ```bash
   npm run start:dev
   ```

4. **Akses aplikasi**. Setelah aplikasi berjalan, buka browser dan akses:
   ```
   http://localhost:3000
   ```

   Ini adalah URL default di mana aplikasi NestJS akan berjalan.

5. **Berhenti menjalankan aplikasi**. Jika kamu ingin menghentikan aplikasi, cukup tekan `Ctrl + C` di terminal.

### Catatan Tambahan:
- Pastikan **Node.js** dan **npm** sudah terinstal di sistemmu.
- Jika kamu ingin menjalankan aplikasi di port yang berbeda, kamu bisa mengatur port di file `main.ts` atau dengan menambahkan variabel lingkungan.
- Untuk konfigurasi lebih lanjut atau penggunaan fitur lainnya, kamu bisa merujuk ke [dokumentasi resmi NestJS](https://docs.nestjs.com/).

Dengan panduan ini, kamu seharusnya bisa menjalankan aplikasi NestJS setelah melakukan clone dari repository. Jika ada pertanyaan lebih lanjut atau perlu penjelasan tambahan, silakan tanya!


# Panduan Untuk Installasi dan Running Backend Nestjs