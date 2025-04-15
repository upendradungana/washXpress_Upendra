document.addEventListener('DOMContentLoaded', function() {


    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });


    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would send this to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // // Scroll reveal animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .pricing-card, .location-card, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-fadeInUp');
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animations on load
    animateOnScroll();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
});




     // FAQ toggle functionality
document.querySelectorAll('.faq-toggle').forEach(toggle => {
toggle.addEventListener('click', function() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('i');
    
    // Toggle the content
    content.classList.toggle('hidden');
    
    // Rotate the icon
    icon.classList.toggle('rotate-180');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-toggle').forEach(otherToggle => {
        if (otherToggle !== this) {
            otherToggle.nextElementSibling.classList.add('hidden');
            otherToggle.querySelector('i').classList.remove('rotate-180');
        }
    });
    });
});

/// footer

document.getElementById('year').textContent = new Date().getFullYear();

    // Handle newsletter subscription
    function subscribe(event) {
      event.preventDefault();
      alert('Subscribed successfully!');
    }

     // Geolocation functionality
     document.getElementById('find-me-btn').addEventListener('click', function() {
        const status = document.getElementById('location-status');
        const distanceText = document.getElementById('distance-text');
        const nearestLocation = document.getElementById('nearest-location');
        const directionsLink = document.getElementById('nearest-location-link');
        
        status.textContent = "Locating...";
        
        if (!navigator.geolocation) {
            status.textContent = "Geolocation is not supported by your browser";
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Our location coordinates (Phuentsholing)
                const washXpressLat = 26.867141;
                const washXpressLng = 89.394196;
                
                // User's coordinates
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Calculate distance (simplified calculation)
                const distance = calculateDistance(
                    userLat, userLng, 
                    washXpressLat, washXpressLng
                );
                
                // Update UI
                distanceText.textContent = distance.toFixed(1);
                status.textContent = "Location found!";
                nearestLocation.classList.remove('hidden');
                
                // Set up directions link
                directionsLink.href = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${washXpressLat},${washXpressLng}&travelmode=driving`;
            },
            function() {
                status.textContent = "Unable to retrieve your location";
            }
        );
    });
    
    // Helper function to calculate distance between two coordinates (in km)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c)*2;
    }