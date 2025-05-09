document.addEventListener('DOMContentLoaded', function() {

    // Sticky Navbar (basic version)
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;

    window.onscroll = function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky-nav"); // You can add CSS for .sticky-nav if needed
        } else {
            navbar.classList.remove("sticky-nav");
        }
        // Active link highlighting on scroll
        highlightActiveLink();
    };

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height if it's fixed/sticky and overlaps
                const navbarHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation link based on scroll position
    function highlightActiveLink() {
        let scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('main section[id]');
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // 50px offset for better timing
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`#navbar a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            } else {
                if (correspondingLink) {
                    correspondingLink.classList.remove('active');
                }
            }
        });

        // Special case for hero section at the very top
        if (scrollPosition < sections[0].offsetTop - navbarHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('#navbar a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }


    // Skill level visualization
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--level', level); // Sets the CSS variable
    });

    // Contact Form (Placeholder - no actual submission)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.elements['name'].value;
            const email = this.elements['email'].value;
            const message = this.elements['message'].value;

            console.log('Form submitted (placeholder):');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Thank you for your message! (This is a demo, no email was sent)');
            this.reset();
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Initial call to highlight link if page loads on a section
    highlightActiveLink();
});
