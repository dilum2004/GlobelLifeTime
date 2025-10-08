  
        const articles = [
            {
                id: 1,
                category: 'Technology',
                title: 'Artificial Intelligence Transforms Healthcare Diagnosis',
                excerpt: 'New AI system demonstrates remarkable accuracy in detecting diseases early, potentially saving millions of lives through advanced machine learning algorithms.',
                image: 'https://picsum.photos/600/400?random=10',
                author: 'Sarah Johnson',
                time: '3 hours ago',
                views: '12.5K',
                comments: 89
            },
            {
                id: 2,
                category: 'World',
                title: 'Global Climate Summit Addresses Urgent Environmental Concerns',
                excerpt: 'World leaders convene to discuss comprehensive strategies for combating climate change and implementing sustainable development goals across nations.',
                image: 'https://picsum.photos/600/400?random=11',
                author: 'Michael Chen',
                time: '5 hours ago',
                views: '23.8K',
                comments: 156
            },
            {
                id: 3,
                category: 'Business',
                title: 'Stock Markets Reach New Heights Amid Economic Recovery',
                excerpt: 'Major indices show strong performance as investors respond positively to economic indicators suggesting robust growth in key sectors.',
                image: 'https://picsum.photos/600/400?random=12',
                author: 'Emma Williams',
                time: '7 hours ago',
                views: '18.2K',
                comments: 94
            },
            {
                id: 4,
                category: 'Sports',
                title: 'Championship Finals Set Record-Breaking Attendance',
                excerpt: 'Historic sporting event draws unprecedented crowds as teams compete in the most anticipated matchup of the season.',
                image: 'https://picsum.photos/600/400?random=13',
                author: 'David Martinez',
                time: '9 hours ago',
                views: '31.4K',
                comments: 203
            },
            {
                id: 5,
                category: 'Science',
                title: 'Breakthrough Discovery in Renewable Energy Research',
                excerpt: 'Scientists unveil revolutionary solar technology that promises to dramatically increase efficiency and reduce costs of clean energy production.',
                image: 'https://picsum.photos/600/400?random=14',
                author: 'Dr. Lisa Anderson',
                time: '11 hours ago',
                views: '15.7K',
                comments: 112
            },
            {
                id: 6,
                category: 'Politics',
                title: 'Legislative Reform Package Passes With Bipartisan Support',
                excerpt: 'Historic agreement reached on comprehensive policy changes addressing key national priorities and social programs.',
                image: 'https://picsum.photos/600/400?random=15',
                author: 'Robert Taylor',
                time: '14 hours ago',
                views: '9.8K',
                comments: 67
            },
            {
                id: 6,
                category: 'sports',
                title: 'SL vs IN',
                excerpt: 'Sri Lanka vs India 1st Test Match',
                image: 'https://picsum.photos/600/400?random=15',
                author: 'Dilum',
                time: '14 hours ago',
                views: '9.8K',
                comments: 67
            }
        ];

        let currentFilter = 'all';

        function renderArticles(filteredArticles = articles) {
            const container = document.getElementById('articles-container');
            container.innerHTML = filteredArticles.map(article => `
                <div class="article-card" data-category="${article.category}">
                    <img src="${article.image}" alt="${article.title}" class="article-image">
                    <div class="article-content">
                        <div class="article-category">${article.category}</div>
                        <h3 class="article-title">${article.title}</h3>
                        <p class="article-excerpt">${article.excerpt}</p>
                        <a href="#" class="read-more-btn">Read More <i class="fas fa-arrow-right"></i></a>
                        <div class="article-meta">
                            <div class="article-author">
                                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=c8102e&color=fff" alt="${article.author}">
                                <span>${article.author}</span>
                            </div>
                            <div class="article-stats">
                                <div class="stat-item">
                                    <i class="far fa-clock"></i>
                                    <span>${article.time}</span>
                                </div>
                                <div class="stat-item">
                                    <i class="far fa-eye"></i>
                                    <span>${article.views}</span>
                                </div>
                                <div class="stat-item">
                                    <i class="far fa-comment"></i>
                                    <span>${article.comments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function filterByCategory(category, event) {
            if (event) {
                event.preventDefault();
                // Update active state in navbar
                document.querySelectorAll('.nav-category').forEach(cat => {
                    cat.classList.remove('active');
                });
                event.target.classList.add('active');
            }
            
            currentFilter = category;
            if (category === 'all') {
                renderArticles(articles);
            } else {
                const filtered = articles.filter(article => article.category === category);
                renderArticles(filtered);
            }
        }

        function handleSearch(query) {
            const searchResults = document.getElementById('searchResults');
            
            if (!query.trim()) {
                searchResults.classList.remove('active');
                return;
            }
            
            const filtered = articles.filter(article => 
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                article.category.toLowerCase().includes(query.toLowerCase())
            );
            
            if (filtered.length > 0) {
                searchResults.innerHTML = filtered.map(article => `
                    <div class="search-result-item" onclick="scrollToArticle(${article.id})">
                        <div style="font-weight: 600; margin-bottom: 0.3rem;">${article.title}</div>
                        <div style="font-size: 0.85rem; color: var(--light-text);">${article.category} • ${article.time}</div>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--light-text);">No articles found</div>';
                searchResults.classList.add('active');
            }
        }

        function scrollToArticle(articleId) {
            document.getElementById('searchInput').value = '';
            document.getElementById('searchResults').classList.remove('active');
            alert(`Opening article #${articleId}`);
        }

        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            const searchBox = document.getElementById('searchInput');
            const searchResults = document.getElementById('searchResults');
            if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.classList.remove('active');
            }
        });

        // Initialize
        renderArticles();
