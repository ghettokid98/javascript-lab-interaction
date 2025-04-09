document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = 'Light Mode';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        });
    }

    // Real-time Clock
    function updateClock() {
        const now = new Date();
        const datetimeElements = document.querySelectorAll('#datetime');
        
        if (datetimeElements.length > 0) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            const formattedDate = now.toLocaleDateString(undefined, options);
            
            datetimeElements.forEach(el => {
                el.textContent = formattedDate;
            });
        }
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Image Slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        showSlide(0);
        setInterval(nextSlide, 5000);
    }

    // Smooth Scrolling
    document.querySelectorAll('.scroll-down').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Toggle
    document.querySelectorAll('.question')?.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.icon');
            
            answer.classList.toggle('visible');
            
            if (icon) {
                icon.textContent = answer.classList.contains('visible') ? '−' : '+';
            }
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            const message = document.getElementById('messageInput').value.trim();
            
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('show');
            });
            
            const responseEl = document.getElementById('response');
            if (responseEl) {
                responseEl.className = '';
                responseEl.style.display = 'none';
            }
            
            let isValid = true;
            
            if (name === '') {
                document.getElementById('nameError').textContent = 'Name is required';
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email is required';
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email';
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('messageError').textContent = 'Message is required';
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            }
            
            if (isValid && responseEl) {
                responseEl.textContent = `Thank you, ${name}! We'll contact you soon at ${email}.`;
                responseEl.classList.add('success');
                contactForm.reset();
            }
        });
    }

  // Load Users with toggle functionality
const loadUsersBtn = document.getElementById('loadUsersBtn');
if (loadUsersBtn) {
    let isUsersVisible = false;
    let usersData = [];

    loadUsersBtn.addEventListener('click', async () => {
        const userList = document.getElementById('userList');
        if (!userList) return;

        // If we already have the data, just toggle visibility
        if (usersData.length > 0) {
            isUsersVisible = !isUsersVisible;
            userList.style.display = isUsersVisible ? 'block' : 'none';
            loadUsersBtn.textContent = isUsersVisible ? 'Hide Users' : 'Show Users';
            return;
        }

        // First time click - load the data
        try {
            loadUsersBtn.disabled = true;
            loadUsersBtn.textContent = 'Loading...';
            
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            
            usersData = await res.json();
            userList.innerHTML = '';
            
            if (usersData.length === 0) {
                userList.innerHTML = '<li>No users found</li>';
                return;
            }
            
            usersData.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} - ${user.email}`;
                userList.appendChild(li);
            });

            isUsersVisible = true;
            loadUsersBtn.textContent = 'Hide Users';
        } catch (err) {
            console.error("Failed to load users:", err);
            userList.innerHTML = '<li>Error loading users. Please try again.</li>';
            isUsersVisible = true;
            loadUsersBtn.textContent = 'Hide Users';
        } finally {
            loadUsersBtn.disabled = false;
        }
    });
}

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', toggleBackToTop);
        toggleBackToTop();
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
}