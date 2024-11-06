Berikut struktur folder untuk aplikasi Express.js yang dilengkapi dengan file-file yang dibutuhkan, termasuk file migrasi, konfigurasi database, dan pengaturan route dasar:

```plaintext
museum-object-info-system
├── config
│   └── db.js                    # Koneksi database MariaDB
├── controllers
│   └── authController.js        # Controller untuk autentikasi admin
├── migrations
│   ├── migration-up.js          # File migrasi untuk membuat tabel
│   └── migration-down.js        # File migrasi untuk menghapus tabel
├── models                       # Folder untuk file model (optional jika ingin pisahkan query SQL)
│   └── adminModel.js            # Model untuk operasi database tabel admins
├── routes
│   └── authRoutes.js            # Route untuk autentikasi admin
├── .env                         # File environment untuk menyimpan konfigurasi sensitif
├── app.js                       # Setup utama Express.js dan middleware
├── server.js                    # Server entry point
└── package.json                 # File konfigurasi npm
```

### Penjelasan Struktur Folder

- **config/db.js**: File ini berisi konfigurasi koneksi database MariaDB, sehingga aplikasi dapat terhubung ke database.

- **controllers/authController.js**: Controller untuk menangani logika autentikasi admin, seperti login dan validasi token.

- **migrations/**: Folder ini berisi file migrasi. `migration-up.js` untuk membuat tabel, dan `migration-down.js` untuk menghapus tabel.

- **models/adminModel.js**: File ini menyimpan fungsi untuk melakukan operasi database khusus tabel `admins`. 

- **routes/authRoutes.js**: Berisi definisi route untuk autentikasi, misalnya `POST /login` untuk login admin.

- **.env**: File untuk menyimpan konfigurasi yang sensitif seperti `DB_HOST`, `DB_USER`, `DB_PASS`, dll.

- **app.js**: File setup Express.js, termasuk middleware dan pengaturan route.

- **server.js**: Entry point untuk menjalankan server Express.js.

