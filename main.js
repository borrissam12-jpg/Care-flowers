// ================================
// KIGALI FLOWERS - MAIN JAVASCRIPT
// Zero-dependency, conversion-optimized
// ================================

// === CONFIGURATION ===
const CONFIG = {
    // IMPORTANT: Replace with your actual WhatsApp number (include country code, no + or spaces)
    // Example: for Rwanda (+250) 788123456, use: 250788123456
    whatsappNumber: '250785137381', // CHANGE THIS!
    
    // Default WhatsApp message
    whatsappMessage: 'Hello! I would like to order flowers from Care Flowers. 🌸',
    
    // Gallery items (EASY TO UPDATE - just add/remove items here)
    galleryItems: [
        {
            name: 'Red Rose Bouquet',
            price: '15,000 RWF',
            oldPrice: '25,000 RWF',
            description: 'Classic red roses - Perfect for romance',
            image: 'images/flower/1 (1).jpeg',
            whatsappMsg: 'I would like to order the Red Rose Bouquet (15,000 RWF)'
        },
        {
            name: 'Mixed Spring Flowers',
            price: '20,000 RWF',
            oldPrice: '35,000 RWF',
            description: 'Vibrant mixed arrangement for any occasion',
            image: 'images/flower/1 (3).jpeg',
            whatsappMsg: 'I would like to order Mixed Spring Flowers (20,000 RWF)'
        },
        {
            name: 'White Lily Elegance',
            price: '18,000 RWF',
            oldPrice: '30,000 RWF',
            description: 'Elegant white lilies for special moments',
            image: 'images/flower/1 (14).jpeg',
            whatsappMsg: 'I would like to order White Lily Elegance (18,000 RWF)'
        },
        {
            name: 'Sunflower Delight',
            price: '12,000 RWF',
            oldPrice: '20,000 RWF',
            description: 'Bright sunflowers to bring joy',
            image: 'images/flower/2 (8).jpeg',
            whatsappMsg: 'I would like to order Sunflower Delight (12,000 RWF)'
        },
        {
            name: 'Premium Wedding Bouquet',
            price: '45,000 RWF',
            oldPrice: '75,000 RWF',
            description: 'Luxurious arrangement for your special day',
            image: 'images/flower/2 (5).jpeg',
            whatsappMsg: 'I would like to order Premium Wedding Bouquet (45,000 RWF)'
        },
        {
            name: 'Corporate Arrangement',
            price: '30,000 RWF',
            oldPrice: '50,000 RWF',
            description: 'Professional flowers for offices & events',
            image: 'images/flower/1 (7).jpeg',
            whatsappMsg: 'I would like to order Corporate Arrangement (30,000 RWF)'
        }
    ]
};

// === WHATSAPP INTEGRATION ===
function openWhatsApp(event, type = 'general') {
    event.preventDefault();
    
    let message = CONFIG.whatsappMessage;
    
    // Customize message based on type
    if (type === 'custom') {
        message = 'Hello! I would like to request a custom bouquet arrangement. 🌸';
    } else if (type === 'loyalty') {
        message = 'Hello! I would like to book flowers and get my loyalty customer code. 🎁';
    }
    
    // Generate WhatsApp URL
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Track conversion (if you add Google Analytics later)
    trackConversion('whatsapp_click', type);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// === GALLERY RENDERING ===
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    // Clear existing items
    galleryGrid.innerHTML = '';
    
    // Render each gallery item
    CONFIG.galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" 
                 alt="${item.name}" 
                 class="gallery-img"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23fce7f3%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2260%22 fill=%22%23d4567a%22%3E🌸%3C/text%3E%3C/svg%3E'">
            <div class="gallery-info">
                <h3 class="gallery-name">${item.name}</h3>
                <div class="gallery-price">
                    ${item.price}
                    ${item.oldPrice ? `<span class="gallery-price-old">${item.oldPrice}</span>` : ''}
                </div>
                <p class="gallery-desc">${item.description}</p>
                <button class="btn-cta" onclick="orderItem(${index})">
                    <span class="whatsapp-icon">📱</span> Order Now
                </button>
            </div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// === ORDER SPECIFIC ITEM ===
function orderItem(itemIndex) {
    const item = CONFIG.galleryItems[itemIndex];
    if (!item) return;
    
    const message = item.whatsappMsg || `I would like to order ${item.name}`;
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Track conversion
    trackConversion('order_click', item.name);
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
}

// === CLOSE PROMO BANNER ===
function closeBanner() {
    const banner = document.getElementById('promoBanner');
    if (banner) {
        banner.style.display = 'none';
        // Save to localStorage so it doesn't show again this session
        try {
            localStorage.setItem('promoBannerClosed', 'true');
        } catch (e) {
            // localStorage might be disabled
        }
    }
}

// === CONVERSION TRACKING (for future analytics) ===
function trackConversion(eventName, eventLabel) {
    // Log to console for now
    console.log(`Conversion Event: ${eventName} - ${eventLabel}`);
    
    // If you add Google Analytics later, uncomment:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, {
    //         'event_category': 'Engagement',
    //         'event_label': eventLabel
    //     });
    // }
    
    // If you add Facebook Pixel later, uncomment:
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'Lead', { content_name: eventLabel });
    // }
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's the WhatsApp link handler
            if (this.classList.contains('btn-cta') || 
                this.classList.contains('whatsapp-float') ||
                this.classList.contains('contact-link')) {
                return;
            }
            
            // Skip if href is just "#"
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offset = 80; // Account for sticky header
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === LAZY LOADING OPTIMIZATION ===
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// === CHECK PROMO BANNER STATUS ===
function checkPromoBanner() {
    try {
        const bannerClosed = localStorage.getItem('promoBannerClosed');
        const banner = document.getElementById('promoBanner');
        
        if (bannerClosed === 'true' && banner) {
            banner.style.display = 'none';
        }
    } catch (e) {
        // localStorage might be disabled
    }
}

// === INITIALIZE ON PAGE LOAD ===
document.addEventListener('DOMContentLoaded', function() {
    // Render gallery
    renderGallery();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Check promo banner status
    checkPromoBanner();
    
    // Log ready status
    console.log('🌸 Care Flowers website loaded successfully!');
    console.log('⚠️  Remember to update the WhatsApp number in main.js');
});

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events (if needed later)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === EXPORT FOR INLINE USE ===
// These functions are called from HTML onclick attributes
window.openWhatsApp = openWhatsApp;
window.orderItem = orderItem;
window.closeBanner = closeBanner;