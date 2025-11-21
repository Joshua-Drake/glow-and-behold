// Dynamically load blog entries for the blog page
document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');
    if (blogList) {
        // List of blog entries (manually maintained, as static HTML cannot read directory)
        const entries = [
            {
                title: 'Learning to Formulate',
                date: '10 January 2026',
                desc: 'A personal journey into the art and science of skincare formulation, and the lessons learned along the way.',
                link: 'blog_entries/learning-to-formulate.html'
            },
            {
                title: 'The Limits of Carrier Oils',
                date: '24 January 2026',
                desc: 'Exploring the strengths and limitations of carrier oils in natural skincare, and why balance matters.',
                link: 'blog_entries/limits-of-carrier-oils.html'
            }
        ];
        blogList.innerHTML = entries.map(entry => `
            <li>
                <span class="blog-title">${entry.title}</span>
                <span class="blog-meta">${entry.date}</span>
                <span class="blog-desc">${entry.desc}</span>
                <a class="blog-link" href="${entry.link}">Read more &rarr;</a>
            </li>
        `).join('');
    }
});
// Modal logic for More Info
document.addEventListener('DOMContentLoaded', function() {
    // Redirect Find Out More button to educate page (correct path for each content page)
    var ctaBtns = document.querySelectorAll('.btn-cta .btn-cta-text');
    ctaBtns.forEach(function(span) {
        var btn = span.parentElement;
        if (btn) {
            btn.addEventListener('click', function(e) {
                // Determine correct path based on current location
                var path = window.location.pathname;
                if (path.endsWith('/index.html') || path.endsWith('/shop/shop.html')) {
                    window.location.href = 'educate/educate.html';
                } else if (path.includes('/about/') || path.includes('/educate/') || path.includes('/events/') || path.includes('/story/') || path.includes('/contact/') || path.includes('/blog/')) {
                    window.location.href = '../educate/educate.html';
                } else if (path.endsWith('/cart/cart.html')) {
                    window.location.href = '../educate/educate.html';
                } else {
                    window.location.href = 'educate/educate.html';
                }
            });
        }
    });
        // Sliding search bar logic
        const searchBtn = document.querySelector('.search-btn');
        const searchBar = document.getElementById('search-bar');
        if (searchBtn && searchBar) {
            searchBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                searchBar.classList.toggle('open');
                if (searchBar.classList.contains('open')) {
                    searchBar.querySelector('input').focus();
                }
            });
            // Close search bar when clicking outside
            document.addEventListener('click', function(e) {
                if (!searchBar.contains(e.target) && !searchBtn.contains(e.target)) {
                    searchBar.classList.remove('open');
                }
            });
        }
    const modal = document.getElementById('info-modal');
    if (!modal) return;
    const modalClose = modal.querySelector('.modal-close');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');
    const moreInfoButtons = document.querySelectorAll('.more-info');
    moreInfoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = btn.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const desc = card.querySelector('.product-description').textContent;
            const price = card.querySelector('.product-price').textContent;
            modalProductName.textContent = name;
            modalProductDescription.textContent = desc;
            modalProductPrice.textContent = price;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
class ProductCarousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.cards = document.querySelectorAll('.product-card');
        this.currentIndex = 0;
        this.cardsPerView = this.getCardsPerView();
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        window.addEventListener('resize', () => {
            this.cardsPerView = this.getCardsPerView();
            this.updateCarousel();
        });
        
        this.updateCarousel();
    }

    getCardsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 1024) return 2;
        return 3;
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }

    next() {
        const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 32;
        const offset = -(this.currentIndex * (cardWidth + gap));
        
        this.track.style.transform = `translateX(${offset}px)`;
        
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.cards.length - this.cardsPerView;
        
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.cards.length - this.cardsPerView ? '0.5' : '1';
    }
}

class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.nav = document.querySelector('.main-nav');
        this.isOpen = false;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.toggleMenu();
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.nav.contains(e.target) && 
                !this.toggle.contains(e.target)) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.nav.classList.toggle('active');
        
        const spans = this.toggle.querySelectorAll('span');
        if (this.isOpen) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
}

class ShoppingCart {
    constructor() {
        this.cartBtn = document.querySelector('.cart-btn');
        this.cartCount = document.querySelector('.cart-count');
        this.count = 0;
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });

        // Cart button is now a link; no JS event needed
    }

    addToCart(e) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        this.count++;
        this.updateCartCount();
        
        e.target.textContent = 'Added!';
        e.target.style.backgroundColor = '#7fa593';
        
        setTimeout(() => {
            e.target.textContent = 'Add to Cart';
            e.target.style.backgroundColor = '';
        }, 1500);

        console.log(`Added "${productName}" to cart. Total items: ${this.count}`);
    }

    updateCartCount() {
        this.cartCount.textContent = this.count;
        
        this.cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            this.cartCount.style.transform = 'scale(1)';
        }, 200);
    }

    viewCart() {
        // No longer needed; cart page exists
    }
}

class Search {
    constructor() {
        this.searchBtn = document.querySelector('.search-btn');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // No prompt or alert; handled by sliding bar UI
    }
}

class ProductInfo {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const moreInfoButtons = document.querySelectorAll('.more-info');
        // Modal logic now handles More Info
    }

    showInfo(e) {
        // No longer used; replaced by modal
    }
}

class CTAButton {
    constructor() {
        this.ctaBtn = document.querySelector('.btn-cta');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.ctaBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            console.log('CTA clicked - Learn more about our natural ingredients!');
        });
    }
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                console.log(`Navigation to ${href} - Full pages coming soon!`);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductCarousel();
    new MobileMenu();
    new ShoppingCart();
    new Search();
    new ProductInfo();
    new CTAButton();
    setupSmoothScroll();
    
    console.log('Glow & Behold - Website loaded successfully! 🌿');
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
