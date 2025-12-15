// ============================================
// موقع مجيب العباب - مطور ويب
// ============================================

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // ========== تحديث النصوص حسب الهوية الجديدة ==========
    updateContentForStudent();
    
    // ========== تحديث سنة حقوق النشر ==========
    updateCopyrightYear();
    
    // ========== تنشيط القائمة المتنقلة للجوال ==========
    setupMobileMenu();
    
    // ========== تأثير التمرير على الهيدر ==========
    setupHeaderScrollEffect();
    
    // ========== تنعيم التمرير للروابط الداخلية ==========
    setupSmoothScrolling();
    
    // ========== إرسال نموذج التواصل ==========
    setupContactForm();
    
    // ========== تحميل الرسوم المتحركة للعناصر ==========
    setupAnimations();
    
    // ========== تحديث أشرطة المهارات عند التمرير ==========
    setupSkillsAnimation();
});

// ========== الوظائف الرئيسية ==========

// تحديث المحتوى ليعكس هوية طالب الأمن السيبراني
function updateContentForStudent() {
    // تحديث النص في القسم الرئيسي
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = 'طالب أمن سيبراني أتعلم تطوير الويب';
    }
    
    // تحديث النص في قسم عني (إن وجد)
    const aboutSection = document.querySelector('#about p');
    if (aboutSection && aboutSection.textContent.includes('مطور ويب مبتدئ')) {
        aboutSection.textContent = 'أنا مجيب العباب، طالب أمن سيبراني في جامعة الرازي - اليمن. أتعلم تطوير الويب لبناء أساس تقني قوي.';
    }
}

// تحديث سنة حقوق النشر
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// إعداد القائمة المتنقلة للجوال
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isDisplayed = navLinks.style.display === 'flex';
            
            if (isDisplayed) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.width = '100%';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '1000';
            }
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });
    }
}

// تأثير التمرير على الهيدر
function setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'white';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

// تنعيم التمرير للروابط الداخلية
function setupSmoothScrolling() {
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
            }
        });
    });
}

// إعداد نموذج التواصل
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // عرض حالة التحميل
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;
            
            // محاكاة إرسال البيانات (في الواقع هنا نرسل للخادم)
            setTimeout(() => {
                // إظهار رسالة النجاح
                showNotification('شكراً لك! تم استلام رسالتك وسأرد عليك قريباً.', 'success');
                
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // استعادة حالة الزر
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// إظهار الإشعارات
function showNotification(message, type = 'success') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    // إضافة الأنماط
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
    notification.style.color = 'white';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // إضافة الإشعار للصفحة
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// إعداد الرسوم المتحركة
function setupAnimations() {
    // إضافة أنماط CSS للرسوم المتحركة
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
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
    
    document.head.appendChild(animationStyles);
    
    // مراقبة العناصر لإضافة الرسوم المتحركة
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
    
    // مراقبة العناصر المهمة
    document.querySelectorAll('.project-card, .skill-item, .contact-item, .education-card').forEach(el => {
        observer.observe(el);
    });
}

// رسوم متحركة لأشرطة المهارات
function setupSkillsAnimation() {
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
}

// ========== وظائف إضافية مفيدة ==========

// تحديث التاريخ والوقت الحي (يمكن إضافته لاحقاً)
function updateLiveDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    return now.toLocaleDateString('ar-YE', options);
}

// تحميل المشاريع ديناميكياً (للمستقبل)
function loadProjects() {
    // يمكن تحميل المشاريع من ملف JSON لاحقاً
    const projects = [
        {
            title: "الموقع الشخصي",
            description: "موقعي الشخصي لعرض المهارات والمشاريع",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "https://alhaking1.github.io/my-portfolio"
        }
        // يمكن إضافة المزيد هنا
    ];
    
    return projects;
}

// تحقق من الاتصال بالإنترنت
function checkOnlineStatus() {
    if (!navigator.onLine) {
        showNotification('أنت غير متصل بالإنترنت', 'error');
    }
    
    window.addEventListener('online', () => {
        showNotification('تم استعادة الاتصال بالإنترنت', 'success');
    });
    
    window.addEventListener('offline', () => {
        showNotification('فقدت الاتصال بالإنترنت', 'error');
    });
}

// تفعيل التحقق من الاتصال (اختياري)
// checkOnlineStatus();

// ========== تفعيل الميزات عند الحاجة ==========

// مثال: يمكن تفعيل هذه لاحقاً
// console.log("موقع مجيب العباب يعمل بنجاح!");
// console.log("تاريخ اليوم:", updateLiveDateTime());
// إضافة تأثيرات للأقسام السيبرانية
function setupCybersecurityEffects() {
    const specCards = document.querySelectorAll('.spec-card');
    
    specCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'var(--shadow)';
        });
    });
}

// تفعيل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود السابق ...
    setupCybersecurityEffects();
});