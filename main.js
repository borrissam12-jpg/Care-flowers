// ================================
// CARE FLOWERS - PREMIUM JS
// Luxury E-Commerce Experience
// ================================

const CONFIG = {
    whatsappNumber: '250785137381',
    whatsappMessage: 'Hello! I would like to inquire about your artisanal floral arrangements.',
    
    // Urgency messages (rotates per product)
    urgencyMessages: [
        'Only 3 left today',
        'Limited availability',
        'Popular this week',
        'High demand',
        'Few remaining'
    ],
    
    collection: [
        {
            name: 'Classic Rose Collection',
            price: '17,000',
            oldPrice: '25,000',
            description: 'Hand-selected premium roses arranged in our signature style. Perfect for expressing love and admiration.',
            image: 'images/flower/1 (1).jpeg',
            tag: '32% OFF'
        },
        {
            name: 'Spring Garden',
            price: '25,000',
            oldPrice: '35,000',
            description: 'A vibrant celebration of seasonal blooms featuring tulips, peonies, and garden roses.',
            image: 'images/flower/1 (3).jpeg',
            tag: '29% OFF'
        },
        {
            name: 'Elegant Lily',
            price: '25,000',
            oldPrice: '30,000',
            description: 'Pure white lilies arranged with eucalyptus and delicate greenery. Timeless sophistication.',
            image: 'images/flower/1 (14).jpeg',
            tag: 'BESTSELLER'
        },
        {
            name: 'Sunlit Meadow',
            price: '15,000',
            oldPrice: '25,000',
            description: 'Cheerful sunflowers paired with wildflowers. Brings warmth to any space.',
            image: 'images/flower/2 (8).jpeg',
            tag: '40% OFF'
        },
        {
            name: 'Bridal Couture',
            price: '15,000',
            oldPrice: '25,000',
            description: 'Our most luxurious arrangement. Orchids, peonies, and premium roses in an exquisite design.',
            image: 'images/flower/2 (5).jpeg',
            tag: 'SIGNATURE'
        },
        {
            name: 'Executive Suite',
            price: '10,000',
            oldPrice: '25,000',
            description: 'Sophisticated arrangement designed for corporate environments. Makes a lasting impression.',
            image: 'images/flower/1 (7).jpeg',
            tag: '60% OFF'
        }
    ]
};

// === LOYALTY CODE GENERATOR ===
function generateLoyaltyCode() {
    const prefix = 'CF';
    const number = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${number}`;
}

// === INITIALIZATION === 
document.addEventListener('DOMContentLoaded', () => {
    initCollection();
    initSmoothScroll();
    initMobileMenu();
    initScrollEffects();
    checkAnnouncementBar();
    
    console.log('🌸 Care Flowers initialized');
});

// === COLLECTION RENDERING ===
function initCollection() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;
    
    CONFIG.collection.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Get urgency message (rotates per product)
        const urgency = CONFIG.urgencyMessages[index % CONFIG.urgencyMessages.length];
        
        card.innerHTML = `
            <div class="collection-image">
                <img src="${item.image}" 
                     alt="${item.name}"
                     loading="lazy"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 500%22%3E%3Crect fill=%22%23F5F5F4%22 width=%22400%22 height=%22500%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22 fill=%22%2378716C%22 font-family=%22system-ui%22%3EImage Coming Soon%3C/text%3E%3C/svg%3E'">
                <span class="collection-tag">${item.tag}</span>
                <span class="collection-urgency">${urgency}</span>
            </div>
            <div class="collection-info">
                <h3 class="collection-name">${item.name}</h3>
                <p class="collection-description">${item.description}</p>
                <div class="collection-price-row">
                    <span class="collection-price">${item.price} RWF</span>
                    ${item.oldPrice ? `<span class="collection-price-old">${item.oldPrice} RWF</span>` : ''}
                </div>
                <button class="btn-primary" onclick="orderItem(${index})">Order Now</button>
            </div>
        `;
        
        grid.appendChild(card);
        
        // Stagger animation
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// === WHATSAPP INTEGRATION ===
function openWhatsApp(event, type = 'general') {
    event.preventDefault();
    
    let message = CONFIG.whatsappMessage;
    
    if (type === 'custom') {
        message = `Hello Care Flowers,

I would like to request a custom floral design.

Occasion:
Preferred style:
Color preferences:
Budget:
Delivery date:

Please let me know what's possible. Thank you!`;
    }
    
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    trackEvent('whatsapp_click', type);
}

// === ORDER ITEM WITH PRE-QUALIFICATION & LOYALTY CODE ===
function orderItem(index) {
    const item = CONFIG.collection[index];
    if (!item) return;
    
    // Generate unique loyalty code
    const loyaltyCode = generateLoyaltyCode();
    
    // Structured WhatsApp message (pre-qualification)
    const message = `Hello Care Flowers,

I would like to order:
━━━━━━━━━━━━━━━━
• Bouquet: ${item.name}
• Price: ${item.price} RWF
━━━━━━━━━━━━━━━━

Delivery Information:
• Location: 
• Preferred time: 
• Recipient name: 
• Special message card: 

━━━━━━━━━━━━━━━━
Your loyalty code: ${loyaltyCode}
(Keep this for future discounts)

Thank you!`;
    
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    trackEvent('order_click', item.name);
}

// === ANNOUNCEMENT BAR ===
function closeAnnouncement() {
    const bar = document.getElementById('announcementBar');
    if (!bar) return;
    
    bar.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    bar.style.transform = 'translateY(-100%)';
    bar.style.opacity = '0';
    
    setTimeout(() => bar.remove(), 300);
    
    try {
        sessionStorage.setItem('announcementClosed', 'true');
    } catch (e) {}
}

function checkAnnouncementBar() {
    try {
        if (sessionStorage.getItem('announcementClosed') === 'true') {
            const bar = document.getElementById('announcementBar');
            if (bar) bar.remove();
        }
    } catch (e) {}
}

// === MOBILE MENU ===
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        const isOpen = nav.style.display === 'flex';
        nav.style.display = isOpen ? 'none' : 'flex';
        toggle.classList.toggle('active');
    });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.onclick) return;
            
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;
            
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// === SCROLL EFFECTS ===
function initScrollEffects() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Header shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.testimonial-card, .guarantee-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// === ANALYTICS ===
function trackEvent(eventName, eventLabel) {
    console.log(`📊 Event: ${eventName} - ${eventLabel}`);
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: 'Engagement',
            event_label: eventLabel
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: eventLabel
        });
    }
    
    // Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('track', eventName, { label: eventLabel });
    }
}

// === EXPORT FUNCTIONS ===
window.openWhatsApp = openWhatsApp;
window.orderItem = orderItem;
window.closeAnnouncement = closeAnnouncement;

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise:', e.reason);
});