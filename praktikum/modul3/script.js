// Fungsi untuk menampilkan loading state
function tampilkanLoading() {
    $("#buku-container").html(`
        <div class="flex flex-col items-center justify-center py-24">
            <div class="relative">
                <div class="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute top-0"></div>
            </div>
            <p class="mt-6 text-lg font-semibold text-gray-600">Memuat koleksi buku...</p>
            <p class="mt-2 text-sm text-gray-400">Mohon tunggu sebentar</p>
        </div>
    `);
    $("#stats-bar").addClass("hidden");
}

// Fungsi utama untuk mengambil data buku
async function ambilBuku(query = "javascript") {
    tampilkanLoading();
    
    try {
        // URL API dengan query parameter
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`;
        const respons = await fetch(url);

        if (!respons.ok) {
            throw new Error(`HTTP error! Status: ${respons.status}`);
        }

        const data = await respons.json();

        // Update stats bar
        const resultCount = data.items ? data.items.length : 0;
        $("#result-count").text(resultCount);
        $("#search-term").text(query);
        $("#stats-bar").removeClass("hidden");

        // Bersihkan isi kontainer
        $("#buku-container").empty();

        // Cek jika tidak ada data
        if (!data.items || data.items.length === 0) {
            $("#buku-container").html(`
                <div class="flex flex-col items-center justify-center py-24">
                    <div class="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <p class="text-2xl font-bold text-gray-700 mb-3">Tidak Ada Hasil Ditemukan</p>
                    <p class="text-gray-500 mb-6 max-w-md text-center">Maaf, tidak ada buku yang sesuai dengan pencarian "<span class="font-semibold">${query}</span>"</p>
                    <button onclick="$('#search-input').val('').focus()" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                        Coba Kata Kunci Lain
                    </button>
                </div>
            `);
            return;
        }

        const $grid = $(
            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>'
        );

        // Loop semua hasil
        $.each(data.items, function (i, buku) {
            const info = buku.volumeInfo;
            const judul = info.title || "Tanpa Judul";
            const penulis = info.authors
                ? info.authors.join(", ")
                : "Tidak Diketahui";
            const penerbit = info.publisher || "Tidak Diketahui";
            const tahun = info.publishedDate ? info.publishedDate.substring(0, 4) : "-";
            const gambar = info.imageLinks
                ? info.imageLinks.thumbnail.replace('http:', 'https:')
                : "https://via.placeholder.com/128x180/e5e7eb/6b7280?text=No+Cover";
            const link = info.previewLink || "#";
            const rating = info.averageRating || null;
            const ratingCount = info.ratingsCount || 0;
            const deskripsi = info.description 
                ? info.description.substring(0, 120) + "..." 
                : "Deskripsi tidak tersedia untuk buku ini.";
            const pageCount = info.pageCount || "-";
            const kategori = info.categories ? info.categories[0] : "General";

            const $card = $(`
                <div class="book-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col">
                    <!-- Book Cover -->
                    <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
                        <img src="${gambar}" alt="Cover ${judul}" 
                            class="book-cover relative z-10 w-32 h-48 object-cover rounded-lg shadow-xl border border-gray-200">
                        ${rating ? `
                        <div class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            ${rating}
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- Book Info -->
                    <div class="p-5 flex-1 flex flex-col">
                        <!-- Category Badge -->
                        <div class="mb-3">
                            <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                ${kategori}
                            </span>
                        </div>
                        
                        <!-- Title -->
                        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                            ${judul}
                        </h3>
                        
                        <!-- Author -->
                        <p class="text-sm text-gray-600 mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span class="font-medium line-clamp-1">${penulis}</span>
                        </p>
                        
                        <!-- Publisher & Year -->
                        <p class="text-xs text-gray-500 mb-3 flex items-center gap-2">
                            <svg class="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                            </svg>
                            ${penerbit} • ${tahun}
                        </p>
                        
                        <!-- Description -->
                        <p class="text-xs text-gray-600 mb-4 line-clamp-3 flex-1">
                            ${deskripsi}
                        </p>
                        
                        <!-- Stats Row -->
                        <div class="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                            ${rating ? `
                            <div class="flex items-center gap-1 text-xs text-gray-600">
                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span class="font-semibold">${rating}</span>
                                <span class="text-gray-400">(${ratingCount})</span>
                            </div>
                            ` : ''}
                            <div class="flex items-center gap-1 text-xs text-gray-600">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span class="font-medium">${pageCount} hal</span>
                            </div>
                        </div>
                        
                        <!-- Action Button -->
                        <a href="${link}" target="_blank"
                            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group">
                            <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            <span>Preview Buku</span>
                        </a>
                    </div>
                </div>
            `);

            $grid.append($card);
        });

        // Tambahkan ke container
        $("#buku-container").append($grid);
    } catch (error) {
        console.error("Gagal fetch data:", error);
        $("#buku-container").html(`
            <div class="flex flex-col items-center justify-center py-24">
                <div class="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <p class="text-2xl font-bold text-gray-700 mb-3">Gagal Memuat Data</p>
                <p class="text-gray-500 mb-6 max-w-md text-center">Terjadi kesalahan saat mengambil data dari Google Books API. Silakan coba lagi.</p>
                <button onclick="ambilBuku($('#search-input').val())" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Coba Lagi
                </button>
            </div>
        `);
    }
}

// Event handler untuk tombol pencarian
function handleSearch() {
    const query = $("#search-input").val().trim();
    if (query) {
        ambilBuku(query);
    } else {
        alert("Mohon masukkan kata kunci pencarian!");
    }
}

// Jalankan saat halaman dimuat
$(document).ready(() => {
    // Load default search
    ambilBuku("JavaScript");
    
    // Event listener untuk tombol search
    $("#search-btn").on("click", function(e) {
        e.preventDefault();
        handleSearch();
    });
    
    // Event listener untuk form submit
    $("#search-form").on("submit", function(e) {
        e.preventDefault();
        handleSearch();
    });
    
    // Event listener untuk Enter key di input
    $("#search-input").on("keypress", function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            handleSearch();
        }
    });
    
    // Event listener untuk quick search buttons
    $(".quick-search").on("click", function() {
        const query = $(this).data("query");
        $("#search-input").val(query);
        ambilBuku(query);
    });
});
