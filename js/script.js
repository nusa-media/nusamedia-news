// Global variables
        let isLoggedIn = false;
        let editingNewsId = null;
        let selectedImages = [];
        let newsIdToDelete = null;

        // Sample news data with enhanced properties
        const newsData = [
            {
                id: 1,
                title: "Pemerintah Luncurkan Program Digitalisasi UMKM Nasional",
                summary: "Program ini bertujuan untuk membantu UMKM Indonesia beradaptasi dengan era digital dan meningkatkan daya saing di pasar global.",
                content: "Jakarta - Pemerintah Indonesia resmi meluncurkan program digitalisasi UMKM nasional yang bertujuan untuk membantu usaha mikro, kecil, dan menengah beradaptasi dengan era digital. Program ini merupakan bagian dari upaya pemerintah untuk meningkatkan daya saing UMKM di pasar global.\n\nMenteri Koperasi dan UKM, Teten Masduki, menjelaskan bahwa program ini akan memberikan pelatihan digital marketing, bantuan platform e-commerce, dan akses ke teknologi finansial untuk UMKM di seluruh Indonesia.\n\n'Kami berkomitmen untuk membantu UMKM Indonesia berkembang di era digital ini. Program ini akan menjangkau 1 juta UMKM dalam 2 tahun ke depan,' ujar Teten dalam konferensi pers di Jakarta.\n\nProgram ini juga akan bekerja sama dengan berbagai platform digital dan startup teknologi untuk memberikan solusi terbaik bagi UMKM Indonesia.",
                category: "ekonomi",
                date: new Date(),
                images: ["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e5e7eb'/%3E%3Ctext x='200' y='125' text-anchor='middle' fill='%236b7280' font-size='16' font-family='Arial'%3EBerita Ekonomi%3C/text%3E%3C/svg%3E"],
                featured: true,
                views: 1250,
                likes: 45,
                comments: []
            },
            {
                id: 2,
                title: "Tim Nasional Indonesia Raih Medali Emas di Kejuaraan Asia",
                summary: "Prestasi gemilang atlet Indonesia di ajang bergengsi tingkat Asia menunjukkan kemajuan olahraga nasional.",
                content: "Bangkok - Tim nasional Indonesia berhasil meraih medali emas dalam kejuaraan bulu tangkis Asia 2024 yang berlangsung di Bangkok, Thailand. Kemenangan ini menjadi bukti nyata kemajuan olahraga Indonesia di tingkat regional.\n\nPasangan ganda putra Indonesia, Marcus Fernaldi Gideon dan Kevin Sanjaya Sukamuljo, berhasil mengalahkan pasangan dari Malaysia dengan skor 21-18, 21-16 dalam pertandingan final yang berlangsung sengit.\n\n'Ini adalah hasil kerja keras tim selama bertahun-tahun. Kami bangga bisa mengharumkan nama Indonesia di tingkat Asia,' kata Marcus setelah pertandingan.\n\nPrestasi ini diharapkan dapat memotivasi atlet-atlet muda Indonesia untuk terus berprestasi di tingkat internasional.",
                category: "olahraga",
                date: new Date(Date.now() - 86400000),
                images: ["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23fef3c7'/%3E%3Ctext x='200' y='125' text-anchor='middle' fill='%23d97706' font-size='16' font-family='Arial'%3EBerita Olahraga%3C/text%3E%3C/svg%3E"],
                featured: true,
                views: 890,
                likes: 67,
                comments: []
            },
            {
                id: 3,
                title: "Breakthrough Teknologi AI Buatan Anak Bangsa Mencuri Perhatian Dunia",
                summary: "Inovasi teknologi kecerdasan buatan karya mahasiswa Indonesia berhasil meraih pengakuan internasional.",
                content: "Bandung - Sebuah inovasi teknologi kecerdasan buatan (AI) yang dikembangkan oleh mahasiswa Institut Teknologi Bandung berhasil mencuri perhatian dunia internasional. Teknologi ini mampu mendeteksi penyakit dengan akurasi tinggi menggunakan analisis gambar medis.\n\nTim yang dipimpin oleh Andi Pratama, mahasiswa Teknik Informatika ITB, berhasil mengembangkan algoritma AI yang dapat mendeteksi kanker paru-paru dengan akurasi 95% hanya dari foto rontgen.\n\n'Kami menggunakan deep learning dan neural network untuk menganalisis pola-pola yang tidak terlihat oleh mata manusia,' jelasnya.\n\nInovasi ini telah menarik perhatian beberapa perusahaan teknologi global dan diharapkan dapat diimplementasikan di rumah sakit untuk membantu diagnosis dini.",
                category: "teknologi",
                date: new Date(Date.now() - 172800000),
                images: ["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23dbeafe'/%3E%3Ctext x='200' y='125' text-anchor='middle' fill='%232563eb' font-size='16' font-family='Arial'%3EBerita Teknologi%3C/text%3E%3C/svg%3E"],
                featured: false,
                views: 654,
                likes: 32,
                comments: []
            }
        ];

        let filteredNews = [...newsData];
        let currentCategory = 'semua';
        let currentTimeFilter = 'all';
        let displayedNewsCount = 6;
        let nextNewsId = Math.max(...newsData.map(n => n.id)) + 1;

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            updateCurrentDate();
            displayNews();
            displayPopularNews();
            setupImageUpload();
            setupCharacterCounters();
            setupMobileSearch();
            checkLoginStatus();
        });

        function checkLoginStatus() {
            const savedLoginStatus = localStorage.getItem('adminLoggedIn');
            if (savedLoginStatus === 'true') {
                isLoggedIn = true;
                updateLoginUI();
            }
        }

        function updateCurrentDate() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            document.getElementById('current-date').textContent = now.toLocaleDateString('id-ID', options);
        }

        function getTimeAgo(date) {
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffMinutes < 5) return 'Baru saja';
            if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
            if (diffHours < 24) return `${diffHours} jam lalu`;
            if (diffDays === 1) return 'Hari ini';
            if (diffDays === 2) return '1 hari lalu';
            if (diffDays <= 7) return `${diffDays - 1} hari lalu`;
            if (diffDays <= 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
            return `${Math.floor(diffDays / 30)} bulan lalu`;
        }

        function displayNews() {
            const latestContainer = document.getElementById('latest-news');
            
            latestContainer.innerHTML = '';
            latestContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
            
            const latestNews = filteredNews.slice(0, displayedNewsCount);
            latestNews.forEach(news => {
                latestContainer.innerHTML += createLatestNewsCard(news);
            });
        }

        function createFeaturedNewsCard(news) {
            const imageCount = news.images ? news.images.length : 0;
            const mainImage = imageCount > 0 ? news.images[0] : getDefaultImage(news.category);
            
            return `
                <div class="news-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative" onclick="openNewsDetail(${news.id})">
                    ${isLoggedIn ? `
                        <div class="admin-controls absolute top-2 right-2 z-10 flex space-x-1">
                            <button onclick="event.stopPropagation(); editNews(${news.id})" class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-lg">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button onclick="event.stopPropagation(); deleteNews(${news.id})" class="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    ` : ''}
                    <img src="${mainImage}" alt="${news.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">${news.category.toUpperCase()}</span>
                                <span class="text-gray-500 text-sm ml-2">${getTimeAgo(news.date)}</span>
                            </div>
                            ${imageCount > 1 ? `
                                <div class="flex items-center text-gray-500 text-xs">
                                    <i class="fas fa-images mr-1"></i>
                                    <span>${imageCount}</span>
                                </div>
                            ` : ''}
                        </div>
                        <h3 class="font-bold text-lg mb-2 text-gray-800 hover:text-red-600">${news.title}</h3>
                        <p class="text-gray-600 text-sm mb-3">${news.summary}</p>
                        <div class="flex items-center justify-between text-sm text-gray-500">
                            <div class="flex items-center space-x-4">
                                <span><i class="fas fa-eye mr-1"></i>${news.views || 0}</span>
                                <span><i class="fas fa-heart mr-1"></i>${news.likes || 0}</span>
                                <span><i class="fas fa-comment mr-1"></i>${news.comments ? news.comments.length : 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function createLatestNewsCard(news) {
            const imageCount = news.images ? news.images.length : 0;
            const mainImage = imageCount > 0 ? news.images[0] : getDefaultImage(news.category);
            
            return `
                <div class="news-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg relative" onclick="openNewsDetail(${news.id})">
                    ${isLoggedIn ? `
                        <div class="admin-controls absolute top-2 right-2 z-10 flex space-x-1">
                            <button onclick="event.stopPropagation(); editNews(${news.id})" class="bg-blue-600 text-white p-1 rounded hover:bg-blue-700 shadow-lg">
                                <i class="fas fa-edit text-xs"></i>
                            </button>
                            <button onclick="event.stopPropagation(); deleteNews(${news.id})" class="bg-red-600 text-white p-1 rounded hover:bg-red-700 shadow-lg">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    ` : ''}
                    <img src="${mainImage}" alt="${news.title}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center">
                                <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">${news.category.toUpperCase()}</span>
                                <span class="text-gray-500 text-sm ml-2">${getTimeAgo(news.date)}</span>
                            </div>
                            ${imageCount > 1 ? `
                                <div class="flex items-center text-gray-500 text-xs">
                                    <i class="fas fa-images mr-1"></i>
                                    <span>${imageCount}</span>
                                </div>
                            ` : ''}
                        </div>
                        <h3 class="font-semibold text-gray-800 hover:text-red-600 mb-2 line-clamp-2">${news.title}</h3>
                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${news.summary}</p>
                        <div class="flex items-center space-x-4 text-xs text-gray-500">
                            <span><i class="fas fa-eye mr-1"></i>${news.views || 0}</span>
                            <span><i class="fas fa-heart mr-1"></i>${news.likes || 0}</span>
                            <span><i class="fas fa-comment mr-1"></i>${news.comments ? news.comments.length : 0}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        function getDefaultImage(category) {
            const colors = {
                politik: '%23dcfce7',
                ekonomi: '%23e5e7eb',
                olahraga: '%23fef3c7',
                teknologi: '%23dbeafe',
                hiburan: '%23fce7f3'
            };
            const textColors = {
                politik: '%2316a34a',
                ekonomi: '%236b7280',
                olahraga: '%23d97706',
                teknologi: '%232563eb',
                hiburan: '%23ec4899'
            };
            
            return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='${colors[category] || colors.ekonomi}'/%3E%3Ctext x='200' y='125' text-anchor='middle' fill='${textColors[category] || textColors.ekonomi}' font-size='16' font-family='Arial'%3EBerita ${category.charAt(0).toUpperCase() + category.slice(1)}%3C/text%3E%3C/svg%3E`;
        }

        function displayPopularNews() {
            const container = document.getElementById('popular-news');
            const popularNews = newsData.slice(0, 5);
            
            container.innerHTML = '';
            popularNews.forEach((news, index) => {
                container.innerHTML += `
                    <div class="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded" onclick="openNewsDetail(${news.id})">
                        <span class="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">${index + 1}</span>
                        <div>
                            <h4 class="text-sm font-medium text-gray-800 hover:text-red-600 leading-tight">${news.title}</h4>
                            <div class="flex items-center text-xs text-gray-500 mt-1">
                                <span class="mr-3">${getTimeAgo(news.date)}</span>
                                <span><i class="fas fa-eye mr-1"></i>${news.views || 0}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Login/Logout Functions
        function openLoginModal() {
            document.getElementById('login-modal').classList.remove('hidden');
        }

        function closeLoginModal() {
            document.getElementById('login-modal').classList.add('hidden');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }

        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'nusamedia news' && password === 'nusamedia-oke') {
                isLoggedIn = true;
                localStorage.setItem('adminLoggedIn', 'true');
                updateLoginUI();
                closeLoginModal();
                showNotification('Login berhasil! Selamat datang, Admin.', 'success');
            } else {
                showNotification('Username atau password salah!', 'error');
            }
        }

        function logout() {
            isLoggedIn = false;
            localStorage.removeItem('adminLoggedIn');
            updateLoginUI();
            showNotification('Logout berhasil!', 'success');
        }

        function updateLoginUI() {
            const adminControls = document.getElementById('admin-controls');
            const loginBtn = document.getElementById('login-btn');
            const logoutBtn = document.getElementById('logout-btn');
            
            if (isLoggedIn) {
                adminControls.classList.remove('hidden');
                loginBtn.classList.add('hidden');
                logoutBtn.classList.remove('hidden');
            } else {
                adminControls.classList.add('hidden');
                loginBtn.classList.remove('hidden');
                logoutBtn.classList.add('hidden');
            }
            
            displayNews(); // Refresh to show/hide admin controls
        }

        // Add/Edit News Functions
        function openAddNewsModal() {
            if (!isLoggedIn) {
                showNotification('Silakan login terlebih dahulu!', 'error');
                return;
            }
            
            editingNewsId = null;
            document.getElementById('modal-title').textContent = 'Tambah Berita Baru';
            document.getElementById('submit-btn-text').textContent = 'Publikasikan Berita';
            document.getElementById('news-form').reset();
            clearImagePreviews();
            document.getElementById('add-news-modal').classList.remove('hidden');
        }

        function closeAddNewsModal() {
            document.getElementById('add-news-modal').classList.add('hidden');
            clearImagePreviews();
            editingNewsId = null;
        }

        function editNews(newsId) {
            if (!isLoggedIn) return;
            
            const news = newsData.find(n => n.id === newsId);
            if (!news) return;
            
            editingNewsId = newsId;
            document.getElementById('modal-title').textContent = 'Edit Berita';
            document.getElementById('submit-btn-text').textContent = 'Update Berita';
            
            document.getElementById('news-category').value = news.category;
            document.getElementById('news-title').value = news.title;
            document.getElementById('news-summary').value = news.summary;
            document.getElementById('news-content').value = news.content;
            
            // Load existing images
            selectedImages = news.images ? [...news.images] : [];
            updateImagePreviews();
            
            document.getElementById('add-news-modal').classList.remove('hidden');
        }

        function handleAddNews(event) {
            event.preventDefault();
            
            const category = document.getElementById('news-category').value;
            const title = document.getElementById('news-title').value;
            const summary = document.getElementById('news-summary').value;
            const content = document.getElementById('news-content').value;
            
            if (!category || !title || !summary || !content) {
                showNotification('Semua field wajib diisi!', 'error');
                return;
            }
            
            const newsData_item = {
                id: editingNewsId || nextNewsId++,
                title,
                summary,
                content,
                category,
                date: editingNewsId ? newsData.find(n => n.id === editingNewsId).date : new Date(),
                images: selectedImages.length > 0 ? [...selectedImages] : [getDefaultImage(category)],
                featured: false,
                views: editingNewsId ? newsData.find(n => n.id === editingNewsId).views : 0,
                likes: editingNewsId ? newsData.find(n => n.id === editingNewsId).likes : 0,
                comments: editingNewsId ? newsData.find(n => n.id === editingNewsId).comments : []
            };
            
            if (editingNewsId) {
                const index = newsData.findIndex(n => n.id === editingNewsId);
                newsData[index] = newsData_item;
                showNotification('Berita berhasil diupdate!', 'success');
            } else {
                newsData.unshift(newsData_item);
                showNotification('Berita berhasil dipublikasikan!', 'success');
            }
            
            filteredNews = [...newsData];
            displayNews();
            displayPopularNews();
            closeAddNewsModal();
        }

        // Delete News Functions
        function deleteNews(newsId) {
            if (!isLoggedIn) return;
            
            newsIdToDelete = newsId;
            document.getElementById('delete-modal').classList.remove('hidden');
        }

        function closeDeleteModal() {
            document.getElementById('delete-modal').classList.add('hidden');
            newsIdToDelete = null;
        }

        function confirmDelete() {
            if (newsIdToDelete) {
                const index = newsData.findIndex(n => n.id === newsIdToDelete);
                if (index > -1) {
                    newsData.splice(index, 1);
                    filteredNews = [...newsData];
                    displayNews();
                    displayPopularNews();
                    showNotification('Berita berhasil dihapus!', 'success');
                }
            }
            closeDeleteModal();
        }

        // Image Upload Functions
        function setupImageUpload() {
            const uploadArea = document.getElementById('image-upload-area');
            const fileInput = document.getElementById('news-images');
            
            uploadArea.addEventListener('click', () => fileInput.click());
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                handleFiles(e.dataTransfer.files);
            });
            
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        selectedImages.push(e.target.result);
                        updateImagePreviews();
                    };
                    reader.readAsDataURL(file);
                } else {
                    showNotification('File harus berupa gambar dan maksimal 10MB!', 'error');
                }
            });
        }

        function updateImagePreviews() {
            const container = document.getElementById('image-preview-container');
            const grid = document.getElementById('image-preview-grid');
            const counter = document.getElementById('image-count');
            
            if (selectedImages.length > 0) {
                container.classList.remove('hidden');
                counter.textContent = selectedImages.length;
                
                grid.innerHTML = '';
                selectedImages.forEach((image, index) => {
                    grid.innerHTML += `
                        <div class="image-preview relative bg-gray-100 rounded-lg overflow-hidden">
                            <img src="${image}" alt="Preview ${index + 1}" class="w-full h-24 object-cover">
                            <div class="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                                ${index + 1}
                            </div>
                            <button type="button" onclick="removeImage(${index})" class="delete-btn absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700">
                                <i class="fas fa-trash text-xs"></i>
                            </button>
                        </div>
                    `;
                });
            } else {
                container.classList.add('hidden');
            }
        }

        function addMoreImages() {
            document.getElementById('news-images').click();
        }

        function removeImage(index) {
            selectedImages.splice(index, 1);
            updateImagePreviews();
        }

        function clearAllImages() {
            selectedImages = [];
            updateImagePreviews();
        }

        function clearImagePreviews() {
            selectedImages = [];
            document.getElementById('image-preview-container').classList.add('hidden');
            document.getElementById('news-images').value = '';
        }

        // Character Counter Functions
        function setupCharacterCounters() {
            const titleInput = document.getElementById('news-title');
            const summaryInput = document.getElementById('news-summary');
            const contentInput = document.getElementById('news-content');
            
            titleInput.addEventListener('input', () => updateCounter('title-counter', titleInput.value.length));
            summaryInput.addEventListener('input', () => updateCounter('summary-counter', summaryInput.value.length));
            contentInput.addEventListener('input', () => updateCounter('content-counter', contentInput.value.length));
        }

        function updateCounter(counterId, length) {
            document.getElementById(counterId).textContent = length;
        }

        // Mobile Search Setup
        function setupMobileSearch() {
            document.getElementById('search-input-mobile').addEventListener('input', searchNews);
        }

        // News Detail Functions
        function openNewsDetail(newsId) {
            const news = newsData.find(n => n.id === newsId);
            if (!news) return;
            
            // Increment views
            news.views = (news.views || 0) + 1;
            
            const modal = document.getElementById('news-detail-modal');
            const content = document.getElementById('news-detail-content');
            
            const imageGallery = news.images && news.images.length > 0 ? `
                <div class="mb-6">
                    ${news.images.length === 1 ? `
                        <img src="${news.images[0]}" alt="${news.title}" class="w-full h-64 object-cover rounded-lg">
                    ` : `
                        <div class="gallery-grid mb-2">
                            ${news.images.map((img, index) => `
                                <img src="${img}" alt="${news.title} ${index + 1}" class="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80" onclick="viewFullImage('${img}')">
                            `).join('')}
                        </div>
                        <p class="text-sm text-gray-500 text-center">${news.images.length} gambar</p>
                    `}
                </div>
            ` : '';
            
            content.innerHTML = `
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <span class="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-medium">${news.category.toUpperCase()}</span>
                        <span class="text-gray-500 text-sm ml-3">${getTimeAgo(news.date)}</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">${news.title}</h1>
                    <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <span><i class="fas fa-eye mr-1"></i>${news.views || 0} views</span>
                        <span><i class="fas fa-heart mr-1"></i>${news.likes || 0} likes</span>
                        <span><i class="fas fa-comment mr-1"></i>${news.comments ? news.comments.length : 0} komentar</span>
                    </div>
                </div>
                
                ${imageGallery}
                
                <div class="prose max-w-none mb-6">
                    <p class="text-lg text-gray-700 font-medium mb-4">${news.summary}</p>
                    <div class="text-gray-700 leading-relaxed whitespace-pre-line">${news.content}</div>
                </div>
                
                <!-- Interaction Buttons -->
                <div class="border-t pt-4 mb-6">
                    <div class="flex items-center space-x-4 mb-4">
                        <button onclick="likeNews(${news.id})" class="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                            <i class="fas fa-heart"></i>
                            <span>Suka (${news.likes || 0})</span>
                        </button>
                        <button onclick="shareNews(${news.id})" class="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <i class="fas fa-share"></i>
                            <span>Bagikan</span>
                        </button>
                    </div>
                    
                    <!-- Share Options -->
                    <div id="share-options-${news.id}" class="hidden mb-4">
                        <div class="flex flex-wrap gap-2">
                            <button onclick="shareToFacebook(${news.id})" class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                                <i class="fab fa-facebook mr-1"></i>Facebook
                            </button>
                            <button onclick="shareToTikTok(${news.id})" class="px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800">
                                <i class="fab fa-tiktok mr-1"></i>TikTok
                            </button>
                            <button onclick="shareToWhatsApp(${news.id})" class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                                <i class="fab fa-whatsapp mr-1"></i>WhatsApp
                            </button>
                            <button onclick="copyLink(${news.id})" class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                                <i class="fas fa-link mr-1"></i>Copy Link
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Comments Section -->
                <div class="border-t pt-4">
                    <h3 class="text-lg font-semibold mb-4">Komentar (${news.comments ? news.comments.length : 0})</h3>
                    
                    <!-- Add Comment Form -->
                    <div class="mb-6">
                        <div class="space-y-3">
                            <input type="text" id="comment-name-${news.id}" placeholder="Nama Anda" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <textarea id="comment-text-${news.id}" placeholder="Tulis komentar..." rows="3" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                            <button onclick="addComment(${news.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Kirim Komentar
                            </button>
                        </div>
                    </div>
                    
                    <!-- Comments List -->
                    <div id="comments-list-${news.id}">
                        ${news.comments && news.comments.length > 0 ? 
                            news.comments.map(comment => `
                                <div class="bg-gray-50 rounded-lg p-4 mb-3">
                                    <div class="flex items-center mb-2">
                                        <span class="font-medium text-gray-800">${comment.name}</span>
                                        <span class="text-gray-500 text-sm ml-2">${getTimeAgo(comment.date)}</span>
                                    </div>
                                    <p class="text-gray-700">${comment.text}</p>
                                </div>
                            `).join('') : 
                            '<p class="text-gray-500 text-center py-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>'
                        }
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            displayNews(); // Update view count in cards
        }

        function closeNewsDetail() {
            document.getElementById('news-detail-modal').classList.add('hidden');
        }

        function likeNews(newsId) {
            const news = newsData.find(n => n.id === newsId);
            if (news) {
                news.likes = (news.likes || 0) + 1;
                showNotification('Terima kasih atas like Anda!', 'success');
                openNewsDetail(newsId); // Refresh detail view
            }
        }

        function shareNews(newsId) {
            const shareOptions = document.getElementById(`share-options-${newsId}`);
            shareOptions.classList.toggle('hidden');
        }

        function shareToFacebook(newsId) {
            const news = newsData.find(n => n.id === newsId);
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(news.title)}`;
            window.open(url, '_blank', 'width=600,height=400');
        }

        function shareToTikTok(newsId) {
            const news = newsData.find(n => n.id === newsId);
            // TikTok doesn't have a direct share URL like Twitter, so we'll copy the text for sharing
            const shareText = `${news.title} - ${window.location.href}`;
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('Teks berhasil disalin! Buka TikTok untuk membagikan.', 'success');
            });
        }

        function shareToWhatsApp(newsId) {
            const news = newsData.find(n => n.id === newsId);
            const url = `https://wa.me/?text=${encodeURIComponent(news.title + ' - ' + window.location.href)}`;
            window.open(url, '_blank');
        }

        function copyLink(newsId) {
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Link berhasil disalin!', 'success');
            });
        }

        function addComment(newsId) {
            const nameInput = document.getElementById(`comment-name-${newsId}`);
            const textInput = document.getElementById(`comment-text-${newsId}`);
            
            const name = nameInput.value.trim();
            const text = textInput.value.trim();
            
            if (!name || !text) {
                showNotification('Nama dan komentar harus diisi!', 'error');
                return;
            }
            
            const news = newsData.find(n => n.id === newsId);
            if (news) {
                if (!news.comments) news.comments = [];
                news.comments.unshift({
                    name,
                    text,
                    date: new Date()
                });
                
                nameInput.value = '';
                textInput.value = '';
                
                showNotification('Komentar berhasil ditambahkan!', 'success');
                openNewsDetail(newsId); // Refresh detail view
            }
        }

        function viewFullImage(imageSrc) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4';
            modal.innerHTML = `
                <div class="relative max-w-4xl max-h-full">
                    <img src="${imageSrc}" alt="Full size" class="max-w-full max-h-full object-contain">
                    <button onclick="this.parentElement.parentElement.remove()" class="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Notification Function
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            
            notificationText.textContent = message;
            
            if (type === 'error') {
                notification.className = 'notification bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
            } else {
                notification.className = 'notification bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
            }
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Filter Functions (existing code continues...)
        function filterByCategory(category) {
            currentCategory = category;
            
            document.querySelectorAll('.category-filter').forEach(el => el.classList.remove('active', 'text-red-600', 'font-bold'));
            event.target.classList.add('active', 'text-red-600', 'font-bold');
            
            applyFilters();
        }

        function filterByTime(timeFilter) {
            currentTimeFilter = timeFilter;
            
            document.querySelectorAll('.time-filter').forEach(el => {
                el.classList.remove('active', 'bg-red-600', 'text-white');
                el.classList.add('bg-gray-200', 'text-gray-700');
            });
            event.target.classList.add('active', 'bg-red-600', 'text-white');
            event.target.classList.remove('bg-gray-200', 'text-gray-700');
            
            applyFilters();
        }

        function applyFilters() {
            const now = new Date();
            
            filteredNews = newsData.filter(news => {
                const categoryMatch = currentCategory === 'semua' || news.category === currentCategory;
                
                let timeMatch = true;
                const diffTime = now - news.date;
                const diffDays = diffTime / (1000 * 60 * 60 * 24);
                
                switch(currentTimeFilter) {
                    case 'today':
                        timeMatch = diffDays < 1;
                        break;
                    case 'yesterday':
                        timeMatch = diffDays >= 1 && diffDays < 2;
                        break;
                    case 'week':
                        timeMatch = diffDays >= 7 && diffDays < 14;
                        break;
                    case 'month':
                        timeMatch = diffDays >= 30;
                        break;
                    default:
                        timeMatch = true;
                }
                
                return categoryMatch && timeMatch;
            });
            
            displayedNewsCount = 6;
            displayNews();
        }

        function searchNews() {
            const searchTerm = document.getElementById('search-input').value.toLowerCase() || 
                             document.getElementById('search-input-mobile').value.toLowerCase();
            
            if (searchTerm === '') {
                applyFilters();
                return;
            }
            
            filteredNews = newsData.filter(news => {
                const categoryMatch = currentCategory === 'semua' || news.category === currentCategory;
                const searchMatch = news.title.toLowerCase().includes(searchTerm) || 
                                  news.summary.toLowerCase().includes(searchTerm) ||
                                  news.content.toLowerCase().includes(searchTerm);
                
                return categoryMatch && searchMatch;
            });
            
            displayedNewsCount = 6;
            displayNews();
        }

        // Search functionality
        document.getElementById('search-input').addEventListener('input', searchNews);

        function toggleDateFilter() {
            const modal = document.getElementById('date-filter-modal');
            modal.classList.toggle('hidden');
        }

        function filterByDate() {
            const dateFrom = new Date(document.getElementById('date-from').value);
            const dateTo = new Date(document.getElementById('date-to').value);
            
            if (dateFrom && dateTo) {
                filteredNews = newsData.filter(news => {
                    const newsDate = new Date(news.date.toDateString());
                    const categoryMatch = currentCategory === 'semua' || news.category === currentCategory;
                    const dateMatch = newsDate >= dateFrom && newsDate <= dateTo;
                    
                    return categoryMatch && dateMatch;
                });
                
                displayedNewsCount = 6;
                displayNews();
                toggleDateFilter();
            }
        }

        function clearDateFilter() {
            document.getElementById('date-from').value = '';
            document.getElementById('date-to').value = '';
            applyFilters();
            toggleDateFilter();
        }

        function loadMoreNews() {
            displayedNewsCount += 6;
            displayNews();
        }

        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
                if (e.target.id === 'login-modal') closeLoginModal();
                if (e.target.id === 'add-news-modal') closeAddNewsModal();
                if (e.target.id === 'news-detail-modal') closeNewsDetail();
                if (e.target.id === 'date-filter-modal') toggleDateFilter();
                if (e.target.id === 'delete-modal') closeDeleteModal();
            }
        });