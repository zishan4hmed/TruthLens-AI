"use strict";

/* ==========================================
   DOM Ready
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================
   Initialize
========================================== */

function initializeApp(){

    setupNavbar();

    setupMobileMenu();

    setupSmoothScroll();

    setupHeroButtons();

    setupScrollReveal();

    setupActiveNavigation();

    setupScrollProgress();

    setupBackToTop();

    setupHeroParallax();

    setupFloatingCards();

}

function setupNavbar(){

    const navbar = document.querySelector(".navbar");

    if(!navbar) return;

    function updateNavbar(){

        if(window.scrollY > 30){
            navbar.classList.add("scrolled");
        }
        else{
            navbar.classList.remove("scrolled");
        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

}


/* ==========================================
   Mobile Menu
========================================== */

function setupMobileMenu(){

    const menuButton =
        document.querySelector(".mobile-menu-btn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if(!menuButton || !mobileMenu) return;

    menuButton.addEventListener("click",()=>{

        mobileMenu.classList.toggle("active");

        const icon =
            menuButton.querySelector("i");

        if(mobileMenu.classList.contains("active")){
            icon.className = "ri-close-line";
        }
        else{
            icon.className = "ri-menu-line";
        }

    });

    /* Close menu after clicking a link */

    const links =
        mobileMenu.querySelectorAll("a");

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            mobileMenu.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.className = "ri-menu-line";

        });

    });
    /* Mobile Login Button */

    const mobileLoginBtn =
        document.getElementById("mobileLoginBtn");

    const desktopLoginBtn =
        document.getElementById("loginBtn");

    if (mobileLoginBtn && desktopLoginBtn) {

        mobileLoginBtn.addEventListener("click", () => {

            desktopLoginBtn.click();

            mobileMenu.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.className = "ri-menu-line";

        });

    }


    /* Mobile Get Started Button */

    const mobileDashboardBtn =
        document.getElementById("mobileDashboardBtn");

    const desktopDashboardBtn =
        document.getElementById("dashboardBtn");

    if (mobileDashboardBtn && desktopDashboardBtn) {

        mobileDashboardBtn.addEventListener("click", () => {

            desktopDashboardBtn.click();

            mobileMenu.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.className = "ri-menu-line";

        });

    }


}

/* ==========================================
   Smooth Scroll
========================================== */

function setupSmoothScroll(){

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link=>{

        link.addEventListener("click",e=>{

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if(!target) return;

            e.preventDefault();

            window.scrollTo({

                top:
                target.offsetTop-90,

                behavior:"smooth"

            });

        });

    });

}

/* ==========================================
   Hero Buttons
========================================== */

function setupHeroButtons(){

    const buttons =
    document.querySelectorAll(".hero-buttons .btn");

    buttons.forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            button.style.transform="translateY(-5px) scale(1.02)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="";

        });

    });

    const analyzeNowBtn =
    document.getElementById("analyzeNowBtn");

    if(analyzeNowBtn){

        analyzeNowBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            const analyzer =
            document.getElementById("analyzer");

            if(analyzer){

                analyzer.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }

        });

    }

    const watchDemoBtn =
    document.getElementById("watchDemoBtn");

    if(watchDemoBtn){

        watchDemoBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            alert(`TruthLens AI Demo

✔ Login
✔ Paste News
✔ AI Analysis
✔ AI Report
✔ Save History

Video Demo Coming Soon 🚀`);

        });

    }

}

/* ==========================================
   Scroll Reveal
========================================== */

function setupScrollReveal(){

    const elements=document.querySelectorAll(

        ".glass-card,.feature-card,.stat-card,.floating-card"

    );

    const observer=new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.15

        }

    );

    elements.forEach(el=>{

        el.classList.add("hidden");

        observer.observe(el);

    });

}
/* ==========================================
   Active Navigation
========================================== */

function setupActiveNavigation(){

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    if(!sections.length || !navLinks.length) return;

    function updateActiveLink(){

        let currentSection = "";

        sections.forEach(section=>{

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if(window.scrollY >= sectionTop &&
               window.scrollY < sectionTop + sectionHeight){

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + currentSection){

                link.classList.add("active");

            }

        });

    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink);

}

/* ==========================================
   Scroll Progress Bar
========================================== */

function setupScrollProgress(){

    let progress = document.querySelector(".scroll-progress");

    if(!progress){

        progress = document.createElement("div");

        progress.className = "scroll-progress";

        document.body.appendChild(progress);

    }

    function updateProgress(){

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage =
            (scrollTop / documentHeight) * 100;

        progress.style.width = percentage + "%";

    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

}

/* ==========================================
   Back To Top Button
========================================== */

function setupBackToTop(){

    let button = document.querySelector(".back-to-top");

    if(!button){

        button = document.createElement("button");

        button.className = "back-to-top";

        button.innerHTML = '<i class="ri-arrow-up-line"></i>';

        document.body.appendChild(button);

    }

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    function toggleButton(){

        if(window.scrollY > 400){

            button.classList.add("show");

        }

        else{

            button.classList.remove("show");

        }

    }

    toggleButton();

    window.addEventListener("scroll", toggleButton);

}

/* ==========================================
   Hero Mouse Parallax
========================================== */

function setupHeroParallax(){

    const visual = document.querySelector(".hero-visual");

    if(!visual) return;

    document.addEventListener("mousemove",(event)=>{

        const x =
            (event.clientX / window.innerWidth - 0.5) * 20;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 20;

        visual.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}

/* ==========================================
   Floating Cards Animation
========================================== */

function setupFloatingCards(){

    const cards =
        document.querySelectorAll(".floating-card");

    cards.forEach((card,index)=>{

        card.style.animationDelay =
            `${index * 0.8}s`;

    });

}

/* ==========================================
   Performance Optimization
========================================== */

function throttle(callback, delay){

    let waiting = false;

    return function(){

        if(waiting) return;

        callback.apply(this, arguments);

        waiting = true;

        setTimeout(()=>{

            waiting = false;

        }, delay);

    };

}
/* ==========================================
   Loading Animation
========================================== */

function setupLoadingScreen(){

    window.addEventListener("load",()=>{

        document.body.classList.add("loaded");

    });

}

/* ==========================================
   Button Ripple Effect
========================================== */

function setupRippleEffect(){

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = button.getBoundingClientRect();

            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            button.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

}

/* ==========================================
   Keyboard Accessibility
========================================== */

function setupKeyboardNavigation(){

    document.addEventListener("keydown",(e)=>{

        if(e.key === "Escape"){

            document.activeElement.blur();

        }

    });

}

/* ==========================================
   Window Resize
========================================== */

function setupResizeHandler(){

    window.addEventListener("resize",

        throttle(()=>{

            const visual = document.querySelector(".hero-visual");

            if(visual){

                visual.style.transform = "";

            }

        },200)

    );

}

/* ==========================================
   Developer Message
========================================== */

function developerConsole(){

    console.log(

`%c
████████╗██████╗ ██╗   ██╗████████╗██╗  ██╗██╗     ███████╗███╗   ██╗███████╗
╚══██╔══╝██╔══██╗██║   ██║╚══██╔══╝██║  ██║██║     ██╔════╝████╗  ██║██╔════╝
   ██║   ██████╔╝██║   ██║   ██║   ███████║██║     █████╗  ██╔██╗ ██║███████╗
   ██║   ██╔══██╗██║   ██║   ██║   ██╔══██║██║     ██╔══╝  ██║╚██╗██║╚════██║
   ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║███████╗███████╗██║ ╚████║███████║
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝

TruthLens AI
Premium AI Fake News Detector
`,

"color:#38bdf8;font-weight:bold;"

    );

}

/* ==========================================
   Initialize Remaining Features
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    setupLoadingScreen();

    setupRippleEffect();

    setupKeyboardNavigation();

    setupResizeHandler();

    developerConsole();

});