# Quiz Pilihan Ganda

Aplikasi quiz interaktif menggunakan HTML, Tailwind CSS, JavaScript ES6, dan jQuery.

## Fitur

- ✅ 5 pertanyaan dengan 4 pilihan jawaban
- ✅ Klik untuk memilih jawaban
- ✅ Tombol NEXT untuk lanjut ke soal berikutnya
- ✅ Indikator warna hijau (benar) dan merah (salah)
- ✅ Tampilan skor akhir
- ✅ Tombol RESTART untuk mengulang quiz
- ✅ Progress bar untuk tracking kemajuan
- ✅ Responsive design dengan Tailwind CSS

## Teknologi yang Digunakan

### JavaScript ES6 Features:
1. **let/const** - Deklarasi variabel modern
2. **Arrow Function** - Sintaks fungsi yang lebih ringkas
3. **Template Literal** - String interpolation dengan backticks
4. **Array Methods** - map(), filter(), forEach()

### Framework & Library:
- Tailwind CSS (via CDN)
- jQuery 3.7.1
- Google Fonts (Inter)

## Cara Menjalankan

1. Buka file `index.html` di browser
2. Atau gunakan Live Server di VS Code

## Struktur File

```
tugas/
├── index.html    # Struktur HTML dan UI
├── script.js     # Logika quiz dengan ES6 & jQuery
└── README.md     # Dokumentasi
```

## Implementasi Requirement

### 1. let/const (Materi 1)
```javascript
let currentQuestion = 0;
let score = 0;
const quizData = [...];
```

### 2. Arrow Function (Materi 2)
```javascript
const initQuiz = () => { ... };
const loadQuestion = () => { ... };
const handleNext = () => { ... };
```

### 3. Template Literal (Materi 3)
```javascript
`Soal ${currentQuestion + 1} dari ${quizData.length}`
`${score} / ${quizData.length}`
```

### 4. Array Methods (Materi 7)
```javascript
question.options.map((option, index) => { ... });
quizData.filter(q => ...);
```

## Screenshot

Quiz menampilkan:
- Header dengan gradient background
- Progress bar dinamis
- Pertanyaan dengan styling modern
- Opsi jawaban dengan hover effects
- Feedback visual (hijau/merah)
- Hasil akhir dengan animasi

## Author

Dibuat untuk memenuhi tugas Modul 2 - Web Programming
