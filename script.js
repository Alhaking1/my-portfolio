// تحديث سنة حقوق النشر
document.getElementById('currentYear').textContent = new Date().getFullYear();

// تنشيط القائمة المتنقلة للجوال
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.width = '100%';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
    });
}

// تغيير لون الهيدر عند التمرير
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.backdropFilter = 'none';
    }
});

// تنعيم التمرير للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // إغلاق القائمة المتنقلة على الجوال
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// إرسال نموذج التواصل (وهمي)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // في الواقع، هنا نرسل البيانات للخادم
        // لكننا نعرض رسالة نجاح للتوضيح
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('شكراً لك! تم استلام رسالتك وسأرد عليك قريباً.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// تحميل الرسوم المتحركة للعناصر
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// مراقبة العناصر لإضافة الرسوم المتحركة
document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// أضف هذا الـ CSS للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .project-card:nth-child(1) { animation-delay: 0.1s; }
    .project-card:nth-child(2) { animation-delay: 0.2s; }
    .project-card:nth-child(3) { animation-delay: 0.3s; }
`;
document.head.appendChild(style);

// تحديث أشرطة المهارات عند التمرير إليها
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(level => {
                const width = level.style.width;
                level.style.width = '0';
                setTimeout(() => {
                    level.style.transition = 'width 1.5s ease-in-out';
                    level.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}