// Data soal quiz menggunakan array of objects - BRAINROT EDITION 🧠
const quizData = [
    {
        question: "Apa arti dari 'Skibidi' dalam brainrot culture?",
        options: [
            "Nama karakter dari video viral toilet",
            "Bahasa alien dari Mars",
            "Merek shampo baru",
            "Gerakan dance TikTok"
        ],
        correct: 0
    },
    {
        question: "Siapa yang sering disebut sebagai 'Sigma Male'?",
        options: [
            "Orang yang suka makan sigma (α)",
            "Laki-laki independen yang gak butuh validasi",
            "Karakter anime dari Jepang",
            "Superhero baru dari Marvel"
        ],
        correct: 1
    },
    {
        question: "Apa maksud dari 'rizz' di internet slang?",
        options: [
            "Nama makanan Korea",
            "Charisma atau kemampuan menarik perhatian lawan jenis",
            "Brand fashion streetwear",
            "Singkatan dari 'rise and shine'"
        ],
        correct: 1
    },
    {
        question: "Apa kepanjangan dari 'Ohio' dalam meme culture?",
        options: [
            "Only Humans In Ohio",
            "Tempat di mana hal-hal aneh terjadi (meme state)",
            "Organization of Hilarious Internet Objects",
            "Nama planet di Star Wars"
        ],
        correct: 1
    },
    {
        question: "Apa arti 'W' dan 'L' dalam chat internet?",
        options: [
            "Width dan Length (lebar dan panjang)",
            "Win dan Loss (menang dan kalah)",
            "West dan London",
            "White dan Light"
        ],
        correct: 1
    }
];

// State management menggunakan let/const (Materi 1)
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Arrow function untuk inisialisasi quiz (Materi 2)
const initQuiz = () => {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    $('#result-container').addClass('hidden');
    $('#quiz-container').removeClass('hidden');
    loadQuestion();
};

// Arrow function untuk load pertanyaan (Materi 2)
const loadQuestion = () => {
    const question = quizData[currentQuestion];
    selectedAnswer = null;
    
    // Update progress menggunakan template literal (Materi 3)
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    $('#progress-bar').css('width', `${progress}%`);
    $('#progress-text').text(`${currentQuestion + 1}/${quizData.length}`);
    $('#question-number').text(currentQuestion + 1);
    
    // Display question menggunakan template literal (Materi 3)
    $('#question').text(question.question);
    
    // Clear previous options
    $('#options').empty();
    $('#feedback').empty();
    $('#next-btn').prop('disabled', true);
    
    // Generate options menggunakan array method map (Materi 7)
    question.options.map((option, index) => {
        // Template literal untuk create HTML (Materi 3)
        const optionHTML = `
            <button class="option-btn group w-full text-left px-5 py-4 bg-white hover:bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 font-medium text-slate-700 shadow-sm hover:shadow-md" data-index="${index}">
                <span class="flex items-center gap-4">
                    <span class="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-500 border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center font-display font-bold text-sm transition-all duration-300 group-hover:text-white flex-shrink-0">
                        ${String.fromCharCode(65 + index)}
                    </span>
                    <span class="flex-1">${option}</span>
                </span>
            </button>
        `;
        $('#options').append(optionHTML);
    });
    
    // Add click handler menggunakan jQuery
    $('.option-btn').on('click', handleAnswerSelect);
};

// Arrow function untuk handle pemilihan jawaban (Materi 2)
const handleAnswerSelect = function() {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = parseInt($(this).data('index'));
    const correctAnswer = quizData[currentQuestion].correct;
    
    // Disable all buttons
    $('.option-btn').prop('disabled', true).removeClass('hover:bg-slate-50 hover:border-blue-500');
    
    // Check answer dan styling dengan animasi smooth
    $('.option-btn').each(function(index) {
        const $btn = $(this);
        const $badge = $btn.find('span:first');
        
        if (index === correctAnswer) {
            // Correct answer styling
            $btn.removeClass('bg-white border-slate-200')
                .addClass('bg-green-50 border-green-500 ring-2 ring-green-200');
            $badge.removeClass('bg-slate-100 border-slate-200')
                .addClass('bg-green-500 border-green-500 text-white');
        } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            // Wrong answer styling
            $btn.removeClass('bg-white border-slate-200')
                .addClass('bg-red-50 border-red-500 ring-2 ring-red-200');
            $badge.removeClass('bg-slate-100 border-slate-200')
                .addClass('bg-red-500 border-red-500 text-white');
        } else {
            // Other options - dim them
            $btn.addClass('opacity-50');
        }
    });
    
    // Update score dan feedback menggunakan template literal (Materi 3)
    if (selectedAnswer === correctAnswer) {
        score++;
        $('#feedback').html(`
            <span class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 font-semibold">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                Correct!
            </span>
        `);
    } else {
        $('#feedback').html(`
            <span class="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 font-semibold">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                Incorrect
            </span>
        `);
    }
    
    // Enable next button
    $('#next-btn').prop('disabled', false);
};

// Arrow function untuk handle tombol next (Materi 2)
const handleNext = () => {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

// Arrow function untuk menampilkan hasil (Materi 2)
const showResult = () => {
    $('#quiz-container').addClass('hidden');
    $('#result-container').removeClass('hidden');
    
    // Template literal untuk menampilkan skor (Materi 3)
    const percentage = Math.round((score / quizData.length) * 100);
    $('#score').text(`${score} / ${quizData.length}`);
    
    // Conditional message menggunakan template literal (Materi 3)
    let message = '';
    if (percentage === 100) {
        message = 'GIGACHAD CONFIRMED! You\'re absolutely based! 🗿💯';
    } else if (percentage >= 80) {
        message = 'Sheesh! Your rizz is unmatched! 😎🔥';
    } else if (percentage >= 60) {
        message = 'Not bad fam, touch some grass tho 🌿';
    } else if (percentage >= 40) {
        message = 'Bruh moment detected... cooked fr fr �';
    } else {
        message = 'It\'s so over... absolute brainrot victim 🧠❌';
    }
    
    $('#score-message').text(message);
};

// Arrow function untuk restart quiz (Materi 2)
const handleRestart = () => {
    initQuiz();
};

// jQuery document ready
$(document).ready(() => {
    // Initialize quiz
    initQuiz();
    
    // Event listeners menggunakan jQuery
    $('#next-btn').on('click', handleNext);
    $('#restart-btn').on('click', handleRestart);
});

// Contoh penggunaan array methods tambahan (Materi 7)
// Filter soal berdasarkan kategori (jika diperlukan di masa depan)
const filterQuestionsByKeyword = (keyword) => {
    return quizData.filter(q => q.question.toLowerCase().includes(keyword.toLowerCase()));
};

// Get semua jawaban yang benar menggunakan map (Materi 7)
const getCorrectAnswers = () => {
    return quizData.map(q => q.options[q.correct]);
};
