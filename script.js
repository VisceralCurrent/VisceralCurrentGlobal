// --- Navigation Scroll Effect & Mobile Menu ---
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-visceral-dark/80', 'backdrop-blur-md', 'border-white/10', 'py-3');
        navbar.classList.remove('bg-transparent', 'border-transparent', 'py-4');
    } else {
        navbar.classList.remove('bg-visceral-dark/80', 'backdrop-blur-md', 'border-white/10', 'py-3');
        navbar.classList.add('bg-transparent', 'border-transparent', 'py-4');
    }
});

function toggleMenu() {
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    if (isClosed) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    }
}

mobileBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// --- Scroll Reveal Animations ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Enhanced Canvas Synchronicity Engine ---
const canvas = document.getElementById('frequencyCanvas');
const ctx = canvas.getContext('2d');
const statusMsg = document.getElementById('statusMessage');

let time = 0;
let baseFrequency = 0.015;
let targetAmplitude = 40;
let currentAmplitude = 40;
let isPerturbed = false;

function resizeCanvas() {
    // High DPI support
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}

function drawWaves() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);
    
    // Smoothly interpolate amplitude back to normal
    currentAmplitude += (targetAmplitude - currentAmplitude) * 0.05;

    // Define wave layers (Foreground, Midground, Background)
    const layers = [
        { color: 'rgba(212, 175, 55, 0.15)', freqMod: 0.8, ampMod: 1.5, phaseMod: 0, lineWidth: 1 },
        { color: 'rgba(212, 175, 55, 0.4)', freqMod: 1.2, ampMod: 0.8, phaseMod: 2, lineWidth: 2 },
        { color: 'rgba(212, 175, 55, 1)', freqMod: 1.0, ampMod: 1.0, phaseMod: 1, lineWidth: 3 }
    ];

    layers.forEach(layer => {
        ctx.beginPath();
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.color;
        
        // Add a slight glow to the main wave
        if(layer.lineWidth === 3) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        } else {
            ctx.shadowBlur = 0;
        }

        ctx.moveTo(0, centerY);

        for (let x = 0; x <= width; x += 2) {
            // Complex sine wave generation for organic movement
            const freq = baseFrequency * layer.freqMod;
            const amp = currentAmplitude * layer.ampMod;
            
            const y1 = Math.sin(x * freq + time + layer.phaseMod);
            const y2 = Math.sin(x * freq * 0.5 - time * 0.5); // Secondary interference
            
            // Taper edges to 0
            const taper = Math.sin((x / width) * Math.PI); 
            
            const y = centerY + ((y1 + y2) * 0.5) * amp * taper;
            
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    });

    time += isPerturbed ? 0.15 : 0.03;
    requestAnimationFrame(drawWaves);
}

function shiftPhase() {
    if (isPerturbed) return; // Prevent spamming
    
    const phrases = [
        "RECALIBRATING PURPOSE (P)...",
        "INTEGRATING PAST (p) INTO ORIGIN (o)...",
        "AMPLIFYING VISCERAL CURRENT (v)...",
        "SYNCHRONICITY ALIGNMENT DETECTED.",
        "PHASE SHIFT (ϕ) COMPLETE."
    ];
    
    isPerturbed = true;
    targetAmplitude = 120; // Spike the wave
    
    let charIndex = 0;
    const targetPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Typewriter effect for status message
    statusMsg.innerText = "";
    statusMsg.classList.remove("animate-pulse");
    
    const typeWriter = setInterval(() => {
        statusMsg.innerText += targetPhrase.charAt(charIndex);
        charIndex++;
        if (charIndex >= targetPhrase.length) {
            clearInterval(typeWriter);
            setTimeout(() => {
                targetAmplitude = 40; // Return to normal
                isPerturbed = false;
                statusMsg.classList.add("animate-pulse");
            }, 1500);
        }
    }, 30);
}

function calculateImpact() {
    const messages = [
        "Analyzing Origin Data...",
        "Integrating Area of Impact...",
        "Bypassing Local Boundaries...",
        "IMPACT SET TO INFINITE SCALAR."
    ];
    
    let i = 0;
    statusMsg.classList.remove("animate-pulse");
    
    const interval = setInterval(() => {
        statusMsg.innerText = messages[i];
        // Cause minor visual perturbations
        targetAmplitude = 60 + (Math.random() * 40);
        i++;
        
        if (i === messages.length) {
            clearInterval(interval);
            setTimeout(() => {
                targetAmplitude = 40;
                statusMsg.classList.add("animate-pulse");
            }, 2000);
        }
    }, 800);
    
    // Scroll down to the visualizer smoothly
    document.getElementById('frequencyCanvas').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize Canvas
window.addEventListener('load', () => {
    resizeCanvas();
    drawWaves();
    console.log("%c[VISCERAL CURRENT ONLINE]", "color: #d4af37; font-weight: bold; font-size: 14px;");
    console.log("%cArchitecture for Infinite Potential successfully initialized.", "color: #94a3b8;");
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 250);
});