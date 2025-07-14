// Loading animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);
});

// Mouse follower
const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Scroll animations
const scrollSections = document.querySelectorAll('.scroll-section');
function checkScroll() {
    scrollSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
let galleryImages = [];

if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    // Collect all gallery images
    galleryImages = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            showLightboxImage(currentImageIndex);
            lightbox.classList.remove('hidden');
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    function showLightboxImage(index) {
        lightboxImg.src = galleryImages[index];
        
        // Update navigation button visibility
        if (lightboxPrev) {
            lightboxPrev.style.display = index === 0 ? 'none' : 'flex';
        }
        if (lightboxNext) {
            lightboxNext.style.display = index === galleryImages.length - 1 ? 'none' : 'flex';
        }
    }
    
    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showLightboxImage(currentImageIndex);
        }
    }
    
    function showNextImage() {
        if (currentImageIndex < galleryImages.length - 1) {
            currentImageIndex++;
            showLightboxImage(currentImageIndex);
        }
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key and add arrow key navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Navigation for multi-page setup
function navigateToPage(page) {
    window.location.href = page;
}

// Update navigation links for multi-page setup
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        switch(href) {
            case '#home':
                link.setAttribute('href', 'index.html');
                break;
            case '#about':
                link.setAttribute('href', 'about.html');
                break;
            case '#services':
                link.setAttribute('href', 'services.html');
                break;
            case '#events':
                link.setAttribute('href', 'events.html');
                break;
            case '#gallery':
                link.setAttribute('href', 'gallery.html');
                break;
            case '#contact':
                link.setAttribute('href', 'contact.html');
                break;
        }
    });
});