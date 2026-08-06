# Media Pembelajaran Interaktif 3D: Konsep Elektronika Dasar

Proyek ini adalah sebuah purwarupa (prototype) aplikasi web interaktif yang digunakan sebagai **Media Pembelajaran Konsep Elektronika Dasar**. Aplikasi ini dirancang untuk memudahkan mahasiswa atau siswa dalam memahami komponen-komponen elektronika (seperti Resistor, Kapasitor, Induktor, Dioda, Transistor, dan IC) melalui visualisasi model 3 Dimensi (3D) yang interaktif.

Proyek ini dibuat khusus untuk keperluan demonstrasi dan **Sidang Skripsi**.

---

## 🤖 Latar Belakang Pembuatan (Dibuat dengan AI)

Satu hal yang sangat spesial dari proyek ini adalah **cara pembuatannya**. Aplikasi web ini **tidak diprogram (coding) secara manual dari nol oleh pembuatnya**. 

Sebaliknya, aplikasi ini dibuat menggunakan teknologi Kecerdasan Buatan (AI) tingkat lanjut, yaitu **AI Agent Gemini 3.1 Pro** yang berjalan di lingkungan **Antigravity**. 

**Peran Pembuat (Mahasiswa Elektro):**
1. Merancang konsep media pembelajaran dan alur logika fitur.
2. Memberikan perintah (prompt), instruksi fitur, dan penyesuaian detail kepada AI.
3. Mencari, mengunduh, dan menyediakan aset model 3D dari [Sketchfab](https://sketchfab.com).
4. Menyediakan aset suara (audio) untuk penjelasan masing-masing komponen, suara dibuat di elevenlabs.

**Peran AI (Gemini 3.1 Pro):**
1. Menulis seluruh kode program (coding web) berdasarkan instruksi dari pembuat.
2. Merancang tata letak (UI/UX) dan mengubah tema web (misal dari mode gelap ke terang).
3. Menyatukan model 3D, logika tombol anotasi, dan logika pemutar audio menjadi satu sistem yang utuh dan interaktif.

---

## ✨ Fitur Utama Aplikasi

Bagi pengguna (terutama dari jurusan Teknik Elektro), aplikasi ini menawarkan fitur-fitur berikut:

1. **Eksplorasi Model 3D Interaktif**: Pengguna dapat memutar (drag/swipe) dan memperbesar (zoom) model 3D dari komponen elektronika untuk melihat bentuk aslinya dari berbagai sudut.
2. **Anotasi (Titik Panas / Hotspot)**: Terdapat titik-titik interaktif pada bagian-bagian spesifik komponen (misalnya pada kaki Emitor, Basis, Kolektor pada Transistor).
3. **Panel Penjelasan Interaktif**: Jika titik anotasi diklik, sebuah panel akan muncul memberikan penjelasan rinci mengenai fungsi spesifik dari bagian tersebut.
4. **Penjelasan Audio Terintegrasi**: 
   - Saat komponen pertama kali dibuka, aplikasi otomatis memutar suara pengenalan komponen (Intro).
   - Saat anotasi diklik, aplikasi memutar suara penjelasan khusus untuk bagian tersebut.
   - Suara diatur dengan logika eksklusif agar tidak saling bertabrakan (jika satu diputar, yang lain otomatis berhenti).
5. **Kategorisasi Komponen**: Komponen dibagi menjadi dua kelompok utama, yaitu **Komponen Pasif** (Resistor, Kapasitor, Induktor) dan **Komponen Aktif** (Dioda, Transistor, IC).

---

## 🛠️ Teknologi yang Digunakan

Meskipun dibuat oleh AI, web ini dibangun di atas pondasi teknologi standar industri modern:

- **Next.js & React (Kerangka Kerja Web)**: Digunakan untuk membangun struktur antarmuka halaman dan perpindahan antar komponen secara sangat cepat tanpa perlu memuat ulang (reload) halaman secara keseluruhan.
- **Three.js & React Three Fiber (Mesin Render 3D)**: Teknologi inti yang memungkinkan model 3D (file .glb) bisa dirender (ditampilkan) dan diputar-putar secara interaktif langsung di dalam browser web.
- **Tailwind CSS (Desain Tampilan)**: Digunakan untuk mempercantik tampilan warna (seperti tema terang yang bersih), membuat animasi visual pada tombol suara (audio equalizer), dan tata letak agar responsif (rapi di laptop maupun HP).

---

## 📦 Sumber Aset 3D

Seluruh visualisasi model komponen 3D yang digunakan dalam aplikasi ini diunduh dari platform pihak ketiga yang menyediakan aset 3D (baik gratis maupun berbayar), yaitu:
- **[Sketchfab](https://sketchfab.com)**

Model-model ini kemudian diunduh (atau disematkan/embed) dan diintegrasikan ke dalam sistem web menggunakan penampil (viewer) 3D khusus yang dirancang oleh AI.

---

## 📝 Langkah-Langkah Singkat Proses Pembuatan

Jika Anda ditanya oleh dosen penguji saat sidang mengenai *bagaimana langkah pembuatan aplikasi ini*, berikut adalah alur logikanya:

1. **Konseptualisasi Kebutuhan (Manual)**: Menentukan bahwa media pembelajaran yang paling efektif untuk mengenali fisik elektronika adalah visualisasi 3D yang dapat diputar, bukan sekadar gambar diam (2D).
2. **Pengumpulan Aset (Manual)**: 
   - Mencari model 3D yang merepresentasikan bentuk asli (Resistor, Kapasitor, dll) di Sketchfab.
   - Menulis naskah (script) penjelasan tiap komponen dan merekam suara (audio).
3. **Mendelegasikan Tugas Pemrograman ke AI (Prompting)**: 
   - Memerintahkan AI Gemini 3.1 Pro untuk membuat struktur *website* awal.
   - Meminta AI memasukkan kanvas 3D ke dalam website agar dapat membaca file model 3D.
4. **Membangun Interaktivitas (Tanya-Jawab dengan AI)**:
   - "Saya ingin ada titik-titik anotasi di atas kaki komponen."
   - "Saya ingin panel penjelasan muncul di samping ketika titik diklik."
   - "Masukkan fitur pemutar audio. Suaranya tidak boleh tumpang tindih; jika satu bunyi, yang lama harus mati."
5. **Penentuan Titik Koordinat (Semi-Manual)**: Menggunakan fitur pendeteksi koordinat (debugger) yang dibuat oleh AI. Saya mengklik bagian kaki komponen 3D di layar, lalu menyalin angka koordinat (X, Y, Z)-nya ke dalam basis data agar titik anotasi muncul di tempat yang sangat akurat.
6. **Penyempurnaan Tampilan**: Menginstruksikan AI untuk mengubah warna gelap menjadi tema cerah yang bersih, serta merapikan posisi tombol kontrol.

---

## 🚀 Cara Menjalankan Aplikasi

Jika Anda ingin menjalankan aplikasi web ini di komputer lokal (misalnya untuk presentasi sidang tanpa internet stabil):

1. Pastikan **Node.js** sudah terinstal di komputer.
2. Buka folder proyek ini di Terminal (Command Prompt / PowerShell).
3. Ketik perintah: `npm install` (untuk mengunduh modul-modul pendukung).
4. Ketik perintah: `npm run dev` (untuk menyalakan server lokal).
5. Buka browser internet (Chrome/Edge) dan akses URL: `http://localhost:3000`
