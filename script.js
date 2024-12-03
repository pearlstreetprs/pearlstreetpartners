// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const body = document.body;

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (nav?.classList.contains('active') && 
        !nav.contains(e.target) && 
        !hamburger?.contains(e.target)) {
        nav.classList.remove('active');
        hamburger?.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scroll navigation for top and footer nav
document.querySelectorAll('.nav a, .footer-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (nav) {
            nav.classList.remove('active');
            hamburger?.classList.remove('active');
            body.style.overflow = '';
        }

        if (targetElement) {
            const headerOffset = 80; // Adjust offset for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    });
});


// Loading screen animation
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 1000);
        }, 2000);
    }
});

// Typewriter effect
const words = ['Family Offices', 'Strategic Acquirers', 'Institutional Investors'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeWords() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const currentWord = words[wordIndex];

    if (isWaiting) {
        isWaiting = false;
        setTimeout(typeWords, 2000);
        return;
    }

    if (!isDeleting && charIndex <= currentWord.length) {
        typewriterElement.innerHTML = `<em>${currentWord.substring(0, charIndex)}</em>`;
        charIndex++;
        setTimeout(typeWords, 100);
    } else if (!isDeleting && charIndex > currentWord.length) {
        isWaiting = true;
        isDeleting = true;
        setTimeout(typeWords, 1500);
    } else if (isDeleting && charIndex > 0) {
        typewriterElement.innerHTML = `<em>${currentWord.substring(0, charIndex - 1)}</em>`;
        charIndex--;
        setTimeout(typeWords, 50);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWords, 500);
    }
}

typeWords();

// Numbers animation
let hasAnimated = false;

const animateNumbers = () => {
    if (hasAnimated) return;
    hasAnimated = true;
    
    const counters = document.querySelectorAll(".record-value");
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute("data-target"));
        const format = counter.getAttribute("data-format");
        let current = 0;
        const duration = 2000;
        const steps = 50;
        const increment = target / steps;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (format === "billion") {
                    counter.textContent = `$${(current / 1000000000).toFixed(1)}B+`;
                } else {
                    counter.textContent = Math.ceil(current).toLocaleString();
                }
                setTimeout(updateCounter, duration / steps);
            } else {
                if (format === "billion") {
                    counter.textContent = `$${(target / 1000000000).toFixed(1)}B+`;
                } else {
                    counter.textContent = Math.ceil(target).toLocaleString();
                }
            }
        };

        updateCounter();
    });
};

// Intersection Observer setup
const recordObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
        }
    });
}, { threshold: 0.5 });

// Start observing the record section
const recordSection = document.querySelector(".record-section");
if (recordSection) {
    recordObserver.observe(recordSection);
}

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Services tabs
const updateServiceContent = (index) => {
    const content = document.querySelector('.services-text');
    if (!content) return;

    const services = [
        {
            title: "Capital Raising (Debt and Equity)",
            description: "We specialize in structuring tailored debt and equity capital raises that align with your business goals. Our process connects you with investors who bring not just funding but strategic industry insights and valuable networks.<br><br>Our global experience across the US, EU, and EMEA ensures we identify the ideal partners for your growth, securing optimal terms for long-term success."
        },
        {
            title: "Mergers & Acquisitions",
            description: "Our M&A advisory services guide you through every stage of the process, from identifying opportunities to closing the deal. We ensure seamless execution while maximizing value and minimizing risks.<br><br>Whether you're acquiring, merging, or divesting, we tailor strategies to meet your unique objectives and drive business growth."
        },
        {
            title: "IPO Advisory",
            description: "Preparing for an IPO is a complex journey, and our comprehensive advisory services ensure you're ready at every stage. From planning to execution, we help craft compelling strategies to attract investors and meet regulatory requirements.<br><br>With our expertise, your transition to the public markets will be smooth, setting the foundation for sustained success and growth."
        },
        {
            title: "Specialized Financings",
            description: "We offer tailored financing solutions designed to meet unique business needs. From mezzanine financing to bridge loans, we provide innovative strategies to tackle complex challenges.<br><br>Our deep investor network ensures access to funding that fuels growth, enhances liquidity, and positions your business for success."
        },
        {
            title: "Deal Origination",
            description: "Our deal origination services connect you with exclusive investment opportunities through our extensive global network. We identify and vet prospects that align with your strategic goals.<br><br>By combining market insights with strong connections, we help you secure partnerships that drive sustainable growth and long-term value."
        }
    ];
    
    
    

    // Update the updateServiceContent function's template literal to use an anchor instead of a button:
content.innerHTML = `
<h3>${services[index].title}</h3>
<p>${services[index].description}</p>
<a href="https://calendly.com/pearlstreetprs/psp-intro-call?background_color=1a1a1a&text_color=ffffff&primary_color=1870ed" target="_blank" class="cta-button">Schedule a meeting <span class="arrow">→</span></a>
`;
};

document.querySelectorAll('.services-tabs .tab').forEach((tab, index) => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.services-tabs .tab').forEach(t => 
            t.classList.remove('active'));
        tab.classList.add('active');
        updateServiceContent(index);
    });
});

