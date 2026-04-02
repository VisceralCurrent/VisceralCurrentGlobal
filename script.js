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

// --- Interactive Lightning Background ---
const lightningCanvas = document.getElementById('lightning-canvas');
const lightningCtx = lightningCanvas.getContext('2d');
let lightningWidth, lightningHeight, lightningOriginX;
let mouse = { x: 0, y: 0, active: false };
const TWO_PI = Math.PI * 2;

function resizeLightningCanvas() {
    lightningWidth = lightningCanvas.width = window.innerWidth;
    lightningHeight = lightningCanvas.height = window.innerHeight;
}

const startInteraction = (e) => {
    mouse.active = true;
    // Pick a random starting X coordinate along the width of the screen
    lightningOriginX = Math.random() * lightningWidth;
    updateMouse(e);
};

const endInteraction = () => {
    mouse.active = false;
};

const updateMouse = (e) => {
    const event = e.touches ? e.touches[0] : e;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
};

function drawLightning(x1, y1, x2, y2, segments, color, width, jitter = 25) {
    lightningCtx.beginPath();
    lightningCtx.moveTo(x1, y1);
    
    for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
        const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
        lightningCtx.lineTo(px, py);
    }

    lightningCtx.strokeStyle = color;
    lightningCtx.lineWidth = width;
    lightningCtx.shadowBlur = 15;
    lightningCtx.shadowColor = color;
    lightningCtx.stroke();
}

function lightningRender() {
    lightningCtx.shadowBlur = 0;
    // Clear with a trail effect using the site's dark background color
    lightningCtx.fillStyle = 'rgba(5, 5, 6, 0.2)';
    lightningCtx.fillRect(0, 0, lightningWidth, lightningHeight);

    if (mouse.active) {
        // Core (White)
        drawLightning(lightningOriginX, 0, mouse.x, mouse.y, 8, '#ffffff', 1.5, 30);
        // Glow (Visceral Gold)
        drawLightning(lightningOriginX, 0, mouse.x, mouse.y, 12, 'rgba(212, 175, 55, 0.4)', 4, 45);
    }

    requestAnimationFrame(lightningRender);
}


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

// --- Initialization & Global Event Listeners ---

window.addEventListener('load', () => {
    // Initialize Synchronicity Engine
    resizeCanvas();
    drawWaves();

    // Initialize Lightning Background
    resizeLightningCanvas();
    lightningRender();

    console.log("%c[VISCERAL CURRENT ONLINE]", "color: #d4af37; font-weight: bold; font-size: 14px;");
    console.log("%cArchitecture for Infinite Potential successfully initialized.", "color: #94a3b8;");
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        resizeLightningCanvas();
    }, 250);
});

// Lightning interaction listeners
window.addEventListener('mousedown', startInteraction);
window.addEventListener('touchstart', (e) => { e.preventDefault(); startInteraction(e); }, { passive: false });
window.addEventListener('mousemove', updateMouse);
window.addEventListener('touchmove', (e) => { updateMouse(e); }, { passive: false });
window.addEventListener('mouseup', endInteraction);
window.addEventListener('touchend', endInteraction);