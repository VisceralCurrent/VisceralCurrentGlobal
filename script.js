// --- Global Application State ---
const appState = {
    isFrequencyCanvasVisible: false,
    isMatrixCanvasVisible: false,
    isModalOpen: false, // Already used, but good to group it
};

// --- Navigation Scroll Effect & Mobile Menu ---
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Portal Sidebar Elements
const masterySidebar = document.getElementById('mastery-sidebar');
const portalToggles = document.querySelectorAll('.portal-toggle');
const closePortalBtn = document.getElementById('close-portal-btn');

const infiniteProgress = document.getElementById('infinite-progress');
const infiniteMath = document.getElementById('infinite-math');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-visceral-dark/80', 'backdrop-blur-md', 'border-white/10', 'py-3');
            navbar.classList.remove('bg-transparent', 'border-transparent', 'py-4');
        } else {
            navbar.classList.remove('bg-visceral-dark/80', 'backdrop-blur-md', 'border-white/10', 'py-3');
            navbar.classList.add('bg-transparent', 'border-transparent', 'py-4');
        }
    }

    // Infinite Sum Progress Tracker Calculation
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollTop / (docHeight || 1), 1);
    
    if (infiniteProgress) infiniteProgress.style.width = `${scrollPercent * 100}%`;
    
    if (infiniteMath) {
        if (scrollTop > 150) {
            infiniteMath.style.opacity = '1';
            if (scrollPercent >= 0.99) {
                infiniteMath.innerHTML = `Area of Impact: S = <span class="text-white text-sm font-bold ml-2">∞</span>`;
            } else {
                const calculation = (scrollPercent * 100 * 3.14159).toFixed(2);
                infiniteMath.innerText = `Integrating: S = ${calculation}`;
            }
        } else {
            infiniteMath.style.opacity = '0';
        }
    }
});

function toggleMenu() {
    if (!mobileMenu) return;
    const isClosed = mobileMenu.classList.contains('translate-x-full');
    if (isClosed) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = 'auto';
    }
}

if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// --- Mastery 360 Portal Logic ---
function togglePortal() {
    if (!masterySidebar) return;
    const isClosed = masterySidebar.classList.contains('-translate-x-full');
    if (isClosed) {
        masterySidebar.classList.remove('-translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        masterySidebar.classList.add('-translate-x-full');
        document.body.style.overflow = 'auto';
    }
}
portalToggles.forEach(btn => btn.addEventListener('click', togglePortal));
if(closePortalBtn) closePortalBtn.addEventListener('click', togglePortal);

// Automatically close portal when a navigational link inside it is clicked
const portalLinks = document.querySelectorAll('#mastery-sidebar a');
portalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If navigating to a new page, prevent default to avoid the browser dropping the navigation during the slide animation
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            setTimeout(() => { window.location.href = href; }, 300);
        }
        
        if (!masterySidebar.classList.contains('-translate-x-full')) {
            togglePortal();
        }
    });
});

// --- Interactive Phi Slider Logic ---
window.updatePhi = function(value) {
    const phiDisplay = document.getElementById('phi-display');
    const sDisplay = document.getElementById('s-display');
    if (phiDisplay) phiDisplay.innerText = parseFloat(value).toFixed(3);
    
    if (sDisplay) {
        const inverse = 3.01 - parseFloat(value); 
        const sum = Math.pow(10, inverse * 2.5).toFixed(0);
        
        if (value <= 1.05) {
            sDisplay.innerHTML = 'S = <span class="text-white text-lg font-bold">∞</span>';
        } else {
            sDisplay.innerText = `S = ${parseInt(sum).toLocaleString()}`;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('phi-slider')) window.updatePhi(document.getElementById('phi-slider').value);
});

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

// --- Dynamic Text Highlight on Scroll ---
const highlightElements = document.querySelectorAll('.scroll-highlight');

function updateScrollHighlights() {
    const windowHeight = window.innerHeight;
    
    highlightElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Start the effect when the top of the element is 85% down the viewport
        // End the effect when the bottom of the element is 40% down the viewport
        const startPos = windowHeight * 0.85;
        const endPos = windowHeight * 0.40;
        
        let percentage = 0;
        
        if (rect.top <= startPos && rect.bottom >= endPos) {
            percentage = ((startPos - rect.top) / (startPos - endPos)) * 100;
        } else if (rect.top < endPos) {
            percentage = 100;
        }
        
        el.style.setProperty('--scroll-pct', `${Math.max(0, Math.min(100, percentage))}%`);
    });
}

updateScrollHighlights(); // Initial check

// --- Parallax Floating Math Equations ---
const parallaxAnchors = document.querySelectorAll('.parallax-anchor');

function updateParallax() {
    const windowHeight = window.innerHeight;
    parallaxAnchors.forEach(anchor => {
        const rect = anchor.getBoundingClientRect();
        // Calculate distance from the center of the viewport
        const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
        const element = anchor.querySelector('.parallax-element');
        if (element) {
            // Multiply by a small decimal for subtle floating effect
            const yOffset = centerOffset * 0.12; 
            element.style.transform = `translateY(${yOffset}px)`;
        }
    });
}

// --- Custom Cursor Integration ---
const cursorDot = document.getElementById('custom-cursor-dot');
const cursorRing = document.getElementById('custom-cursor-ring');
let cMouseX = window.innerWidth / 2;
let cMouseY = window.innerHeight / 2;
let ringX = cMouseX;
let ringY = cMouseY;
let targetScale = 1;
let currentScale = 1;

// Only hide the default cursor if the custom cursor HTML is actually on the page
if (cursorDot && cursorRing) {
    document.body.classList.add('custom-cursor-active');
}

window.addEventListener('mousemove', (e) => {
    cMouseX = e.clientX;
    cMouseY = e.clientY;
    
    // Dot instantly follows the mouse
    if (cursorDot) {
        cursorDot.style.transform = `translate3d(${cMouseX}px, ${cMouseY}px, 0) translate(-50%, -50%)`;
    }
});

function animateCursor() {
    // Smoothly interpolate the ring to the target coordinates and scale
    ringX += (cMouseX - ringX) * 0.15;
    ringY += (cMouseY - ringY) * 0.15;
    currentScale += (targetScale - currentScale) * 0.15;
    
    if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
    }
}

// Hover Effect Triggers for Interactive Elements
const hoverTargets = document.querySelectorAll('.node-card, a, button');
hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        targetScale = 2.5;
        if (cursorRing) {
            cursorRing.style.backgroundColor = 'rgba(0, 229, 255, 0.1)';
            cursorRing.style.borderColor = 'rgba(0, 229, 255, 0.8)';
        }
    });
    target.addEventListener('mouseleave', () => {
        targetScale = 1;
        if (cursorRing) {
            cursorRing.style.backgroundColor = 'transparent';
            cursorRing.style.borderColor = 'rgba(0, 229, 255, 0.5)';
        }
    });
});

// --- Mastery 360 Accordion Logic ---
function toggleAccordion(element) {
    const content = element.querySelector('.accordion-content');
    const icon = element.querySelector('.fa-chevron-down');
    
    if (element.classList.contains('active')) {
        element.classList.remove('active');
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        element.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        icon.style.transform = 'rotate(180deg)';
    }
}

// --- 3D Tilt Effect for Node Cards ---
const nodeCards = document.querySelectorAll('.node-card');
nodeCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position within the card
        const y = e.clientY - rect.top;  // Y position within the card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees of tilt
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transition = 'transform 0.1s ease-out, border-color 0.4s ease, box-shadow 0.4s ease';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';

        card.addEventListener('transitionend', () => {
            card.style.transform = '';
            card.style.transition = '';
        }, { once: true }); // Clean up inline styles after reset transition completes
    });
});

// --- 528Hz Visceral Frequency Audio ---
let audioCtx;
let oscillator;
let gainNode;

function init528HzAudio() {
    if (!audioCtx) {
        // Initialize the audio context upon first user interaction
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = 'sine'; // Pure mathematical wave
        oscillator.frequency.value = 528; // The Miracle Resonance

        gainNode.gain.value = 0; // Start completely muted

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
    }
}

function play528Hz() {
    if (!audioCtx) init528HzAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Smooth fade in to an ambient 10% volume
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 1.5);
}

function stop528Hz() {
    if (gainNode && audioCtx) {
        // Smooth fade out back to absolute zero
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.0);
    }
}

// --- Enhanced Canvas Synchronicity Engine ---
const canvas = document.getElementById('frequencyCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const statusMsg = document.getElementById('statusMessage');

let time = 0;
let baseFrequency = 0.015;
let targetAmplitude = 40;
let currentAmplitude = 40;
let isPerturbed = false;

function resizeCanvas() {
    if (!canvas || !canvas.parentElement) return;
    // High DPI (Retina) support per High-Performance Canvas Optimization standards
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reset and scale securely
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
}

function drawWaves() {
    if (!canvas || !ctx) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);
    
    // Smoothly interpolate amplitude back to normal
    currentAmplitude += (targetAmplitude - currentAmplitude) * 0.05;

    // Define wave layers (Foreground, Midground, Background)
    const layers = [
        { color: 'rgba(0, 229, 255, 0.15)', freqMod: 0.8, ampMod: 1.5, phaseMod: 0, lineWidth: 1 },
        { color: 'rgba(0, 229, 255, 0.4)', freqMod: 1.2, ampMod: 0.8, phaseMod: 2, lineWidth: 2 },
        { color: 'rgba(0, 229, 255, 1)', freqMod: 1.0, ampMod: 1.0, phaseMod: 1, lineWidth: 3 }
    ];

    // The Breathing Universe Mechanic: Oscillates global amplitude smoothly
    const cosmicBreath = 1 + (Math.sin(time * 0.5) * 0.25);

    layers.forEach(layer => {
        ctx.beginPath();
        ctx.lineWidth = layer.lineWidth;
        ctx.strokeStyle = layer.color;
        
        // Add a slight glow to the main wave
        if(layer.lineWidth === 3) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(0, 229, 255, 0.5)';
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
            
            const y = centerY + ((y1 + y2) * 0.5) * amp * taper * cosmicBreath;
            
            ctx.lineTo(x, y);
        }

        ctx.stroke();
    });

    time += isPerturbed ? 0.15 : 0.03;
}

function shiftPhase() {
    if (isPerturbed) return; // Prevent spamming
    
    play528Hz(); // Trigger the 528Hz resonance
    
    baseFrequency = 0.04; // Speed up briefly
    const phrases = [
        "INITIATING NARRATIVE FORENSIC ENGINEERING...",
        "CALIBRATING THE SOVEREIGN PROTOCOL...",
        "SYNTHESIZING BUDDHA, MENTALIST, AND CHRIST CONSCIOUSNESS...",
        "ALIGNING WITH THE VISCERAL CURRENT.",
        "UNIVERSAL SOVEREIGNTY ACHIEVED."
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
                baseFrequency = 0.015; // Reset speed
                targetAmplitude = 40; // Return to normal
                isPerturbed = false;
                statusMsg.classList.add("animate-pulse");
                stop528Hz(); // Fade out the resonance
            }, 1500);
        }
    }, 30);
}

function calculateImpact() {
    if (isPerturbed) return;
    isPerturbed = true;

    play528Hz(); // Trigger the 528Hz resonance

    const messages = [
        "AUDITING 81-NODE MATRIX...",
        "BALANCING TRIADS OF PERCEPTION...",
        "TRANSMUTING PAST INTO KINETIC FUEL...",
        "ZERO POINT EQUILIBRIUM ACHIEVED.",
        "INTEGRATING PHASE SHIFT (ϕ)...",
        "CALCULATING AREA OF IMPACT: A = ∫(ν⋅ϕ)dt...",
        "VERIFYING INFINITE SUM (S)...",
        "ZERO POINT EQUILIBRIUM ACHIEVED: ∞"
    ];
    
    let i = 0;
    statusMsg.classList.remove("animate-pulse");
    
    // Scroll down to the visualizer smoothly
    document.getElementById('frequencyCanvas').scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    const interval = setInterval(() => {
        statusMsg.innerText = messages[i];
        // Exponentially increase perturbation and speed
        targetAmplitude = 60 + (i * 25) + (Math.random() * 20);
        baseFrequency = 0.015 + (i * 0.01); 
        i++;
        
        if (i === messages.length) {
            clearInterval(interval);
            setTimeout(() => {
                targetAmplitude = 40;
                baseFrequency = 0.015;
                isPerturbed = false;
                statusMsg.classList.add("animate-pulse");
                stop528Hz(); // Fade out the resonance
            }, 3000);
        }
    }, 800);
}

// --- Codex 3D Modal ---
const codexModal = document.getElementById('codex-modal');
const codexModalContent = document.getElementById('codex-modal-content');
const codex3dContainer = document.getElementById('codex-3d-container');

let scene, camera, renderer, codexObject, animationId;
let is3DInitialized = false;

function init3DCodex() {
    if (!codex3dContainer) return;
    if (is3DInitialized) return;
    is3DInitialized = true;

    scene = new THREE.Scene();
    
    const rect = codex3dContainer.getBoundingClientRect();
    camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width, rect.height);
    codex3dContainer.appendChild(renderer.domElement);

    // Create a mystical 3D object (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x00e5ff, // Electric Blue
        wireframe: true,
        emissive: 0x004466,
        emissiveIntensity: 0.5
    });
    
    codexObject = new THREE.Mesh(geometry, material);
    scene.add(codexObject);

    // Add particle field around the codex
    const particlesGeometry = new THREE.BufferGeometry();
    // Throttle particles for mobile devices
    const particlesCount = window.innerWidth < 768 ? 150 : 500;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    codex3dContainer.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.offsetX - previousMousePosition.x,
                y: e.offsetY - previousMousePosition.y
            };
            codexObject.rotation.y += deltaMove.x * 0.01;
            codexObject.rotation.x += deltaMove.y * 0.01;
        }
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });

    // Touch support for interaction
    codex3dContainer.addEventListener('touchstart', (e) => { 
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.touches[0].clientX - previousMousePosition.x,
                y: e.touches[0].clientY - previousMousePosition.y
            };
            codexObject.rotation.y += deltaMove.x * 0.01;
            codexObject.rotation.x += deltaMove.y * 0.01;
            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
    }, { passive: true });

    function animate() {
        animationId = requestAnimationFrame(animate);
        if (!isDragging) {
            codexObject.rotation.y += 0.005;
            codexObject.rotation.x += 0.002;
        }
        
        // Return from camera shake
        camera.position.x += (0 - camera.position.x) * 0.1;
        camera.position.y += (0 - camera.position.y) * 0.1;
        
        // Decay the strike flare
        if (codexObject.material.emissiveIntensity > 0.5) {
            codexObject.material.emissiveIntensity -= 0.05;
        }

        particlesMesh.rotation.y -= 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        if (!codexModal.classList.contains('pointer-events-none')) {
            const newRect = codex3dContainer.getBoundingClientRect();
            camera.aspect = newRect.width / newRect.height;
            camera.updateProjectionMatrix();
            renderer.setSize(newRect.width, newRect.height);
        }
    });
}

function openCodexModal() {
    if (!codexModal || !codexModalContent) return;
    codexModal.classList.remove('pointer-events-none', 'opacity-0');
    codexModalContent.classList.remove('scale-95', 'opacity-0');
    document.body.style.overflow = 'hidden';
    appState.isModalOpen = true;

    // Dynamic Date Update
    const dateEl = document.getElementById('codex-date');
    if (dateEl) {
        const today = new Date();
        const formattedDate = `${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}.${today.getFullYear()}`;
        dateEl.innerText = `Live Transmission // Calibration ${formattedDate}`;
    }

    // Staggered Text Reveal
    const revealElements = document.querySelectorAll('.codex-reveal');
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove('opacity-0', 'translate-y-4');
        }, 300 + (index * 150)); // Delay starts after the modal fade-in
    });
    
    // Slight delay to allow modal to become visible before rendering
    setTimeout(() => {
        init3DCodex();
        if (camera && renderer) {
            const rect = codex3dContainer.getBoundingClientRect();
            camera.aspect = rect.width / (rect.height || 1); // Avoid division by zero
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height);
        }
    }, 300);
}

function closeCodexModal() {
    if (!codexModal || !codexModalContent) return;
    codexModal.classList.add('pointer-events-none', 'opacity-0');
    codexModalContent.classList.add('scale-95', 'opacity-0');
    document.body.style.overflow = 'auto';
    appState.isModalOpen = false;
    if (animationId) {
        cancelAnimationFrame(animationId); // Stop the 3D render loop to save resources
    }
    
    // Reset Text Reveal for next time
    const revealElements = document.querySelectorAll('.codex-reveal');
    revealElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-4');
    });
}

// --- Terminal Sequence Modal ---
const terminalModal = document.getElementById('terminal-modal');
const terminalContent = document.getElementById('terminal-content');
const terminalOutput = document.getElementById('terminal-output');
let terminalTimeoutIds = [];

function downloadUserManual() {
    if (!terminalModal || !terminalContent || !terminalOutput) return;
    terminalModal.classList.remove('pointer-events-none', 'opacity-0');
    terminalContent.classList.remove('scale-95', 'opacity-0');
    document.body.style.overflow = 'hidden';
    terminalOutput.innerHTML = '';
    
    const lines = [
        "> [ INITIATE CONNECTION : ALIGN WITH THE CURRENT ]",
        "> ESTABLISHING MULTIDIMENSIONAL PLATFORM...",
        "> BYPASSING LOCAL BOUNDARIES...",
        "> AUTHENTICATING 81 NODE MATRIX...",
        "> ACCESSING MASTERY 360 ARCHIVES...",
        "> DECRYPTING SECTORS I, II, III, & IV...",
        "> DECRYPTING THE SOVEREIGN PROTOCOL...",
        "[OK] TRIADS OF PERCEPTION ALIGNED.",
        "> COMPILING THE ORIGIN (p)... DONE.",
        "> MEASURING VISCERAL CURRENT (ν)... DONE.",
        "> CALCULATING INFINITE SUM (S) FOR UNIVERSAL SOVEREIGNTY... DONE.",
        "> GENERATING USER_MANUAL_LEGACY.PDF...",
        "[SYS] ENCRYPTING WITH NARRATIVE FORENSIC ENGINEERING...",
        "[SYS] DOWNLOAD COMMENCING..."
    ];

    let lineIdx = 0;
    
    const addLine = () => {
        if (lineIdx < lines.length) {
            const lineDiv = document.createElement('div');
            // Color coding based on prefixes
            lineDiv.className = lines[lineIdx].startsWith('[OK]') ? 'text-visceral-gold font-bold' : (lines[lineIdx].startsWith('[SYS]') ? 'text-blue-400' : 'text-green-500');
            terminalOutput.appendChild(lineDiv);
            
            let charIdx = 0;
            const text = lines[lineIdx];
            const typeInterval = setInterval(() => {
                lineDiv.textContent += text[charIdx];
                charIdx++;
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
                if (charIdx >= text.length) {
                    clearInterval(typeInterval);
                    lineIdx++;
                    const nextTimeout = setTimeout(addLine, Math.random() * 300 + 100);
                    terminalTimeoutIds.push(nextTimeout);
                }
            }, 15);
            terminalTimeoutIds.push(typeInterval);
        } else {
            const finalTimeout = setTimeout(() => {
                const finalLine = document.createElement('div');
                finalLine.className = 'text-white font-bold mt-4 animate-pulse cursor-pointer';
                finalLine.textContent = "DOWNLOAD COMPLETE. CLICK HERE TO CLOSE TERMINAL.";
                finalLine.onclick = closeTerminal;
                terminalOutput.appendChild(finalLine);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                
                // Trigger real browser download with the legacy parameters
                const blobContent = `VISCERAL CURRENT: THE CODEX OF INFINITE POTENTIAL.\n\nTHE SOVEREIGN PROTOCOL: TRIADS OF PERCEPTION\n============================================\nI. Internal Architecture (The Eye of the Storm) - Composure & Neutrality.\nII. Strategic Overlay (The Mentalist's Gambit) - Formless Precision & 81-Node Duality.\nIII. Expansion Equation (The Empire Builder) - Christ-Consciousness & Infinite Legacy.\n\nTHE 81 NODE MATRIX\n==================\nEvery node of existence must be activated through the Trinity of Flow to scale impact to absolute infinity.\n\n1. The Origin (p) - Potential & Past\n2. Visceral Current (ν) - Kinetic Presence\n3. Infinite Sum (S) - Legacy & Scaling\n\nMASTERY 360: THE LIBRARY OF RESONANCE\n=====================================\n\nSECTOR I: POWER & STRATEGY\nFocus: Navigating the mechanics of human interaction.\n\nNODE 01\nBooks: The 48 Laws of Power, The 33 Strategies of War, Mastery\nFlow: Perform a Phase Shift (ϕ), Map Area of Impact (A), Recalibrate to 528 Hz.\n\nSECTOR II: CONSCIOUSNESS & FREQUENCY\nFocus: Aligning with the mathematical certainty of synchronicity.\n\nNODE 10\nBooks: Power vs. Force, Letting Go, The Map of Consciousness\nFlow: Calibrate project Area of Impact, Release resistance, Shift from Chasing to Choosing.\n\nSECTOR III: WARRIOR & PERCEPTION\nFocus: Breaking the mirrors of self-reflection.\n\nNODE 19\nBooks: Journey to Ixtlan, A Separate Reality, The Teachings of Don Juan\nFlow: Erase a Phase Shift (ϕ), Stalk with predatory silence, Build Codex for the Dreaming body.\n\nSECTOR IV: RESOURCE DYNAMICS\nFocus: The practical refinement of energy into structured growth.\n\nNODE 28 (Schedule 1: Sales Budget)\nFlow: The Origin (o) of all digital architecture. We do not write code until the market intent is quantified.\n\nNODE 29 (Schedule 2: Purchases)\nFlow: Align resources exactly with the projected impact. Eliminate operational Phase Shifts (ϕ).\n\nNODE 30 (Schedule 6: Net Income)\nFlow: The final integration over time (dt). If the result doesn't scale to infinity, pivot the frequency.\n\n\nFinal output calculated for: Universal Sovereignty\nResult: ∞\n\n[SYSTEM END]`;
                
                const blob = new Blob([blobContent], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Visceral_Current_User_Manual.txt';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }, 500);
            terminalTimeoutIds.push(finalTimeout);
        }
    };
    
    const startTimeout = setTimeout(addLine, 500);
    terminalTimeoutIds.push(startTimeout);
}

function closeTerminal() {
    terminalModal.classList.add('pointer-events-none', 'opacity-0');
    terminalContent.classList.add('scale-95', 'opacity-0');
    document.body.style.overflow = 'auto';
    terminalTimeoutIds.forEach(id => clearTimeout(id));
    terminalTimeoutIds.forEach(id => clearInterval(id));
    terminalTimeoutIds = [];
}

// --- 81 Node Matrix Visualizer ---
const matrixCanvas = document.getElementById('matrix-canvas');
const matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;
let matrixNodes = [];
let matrixWidth, matrixHeight;
let matrixTime = 0;

function initMatrix() {
    if (!matrixCanvas) return;
    
    // Hardware-Aware Execution: HiDPI Canvas Scaling
    const dpr = window.devicePixelRatio || 1;
    matrixWidth = matrixCanvas.offsetWidth;
    matrixHeight = matrixCanvas.offsetHeight;
    
    matrixCanvas.width = matrixWidth * dpr;
    matrixCanvas.height = matrixHeight * dpr;
    if (matrixCtx) matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    matrixNodes = [];
    const cols = 9;
    const rows = 9;
    
    // Make it a perfectly square grid dynamically centered
    // Increase the grid width on mobile so it doesn't compress too tightly
    const gridSize = Math.min(matrixWidth, matrixHeight) * (window.innerWidth < 768 ? 0.95 : 0.85);
    const startX = (matrixWidth - gridSize) / 2;
    const startY = (matrixHeight - gridSize) / 2;
    const step = gridSize / 8; // 8 gaps for 9 nodes

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            matrixNodes.push({
                col: col,
                row: row,
                x: startX + col * step,
                y: startY + row * step,
                baseRadius: 1.5,
                glowRadius: 0,
                targetGlow: 0,
                activationTimer: Math.random() * 200,
                connections: []
            });
        }
    }
    
    // Setup connections (right and down) for a wireframe grid pattern
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            const idx = col * rows + row;
            if (col < cols - 1) matrixNodes[idx].connections.push((col + 1) * rows + row);
            if (row < rows - 1) matrixNodes[idx].connections.push(col * rows + (row + 1));
        }
    }
}

function drawMatrix() {
    if (!matrixCtx) return;
    
    matrixCtx.clearRect(0, 0, matrixWidth, matrixHeight);
    matrixTime += 0.015;
    
    // Draw connection grid
    matrixCtx.strokeStyle = 'rgba(0, 229, 255, 0.05)';
    matrixCtx.lineWidth = 1;
    matrixCtx.beginPath();
    
    matrixNodes.forEach(node => {
        node.connections.forEach(connIdx => {
            const target = matrixNodes[connIdx];
            matrixCtx.moveTo(node.x, node.y);
            matrixCtx.lineTo(target.x, target.y);
        });
    });
    matrixCtx.stroke();
    
    // Draw 81 nodes
    matrixNodes.forEach(node => {
        // The Flow: Breathing diagonal wave effect
        const wave = Math.max(0, Math.sin(node.col * 0.4 + node.row * 0.4 - matrixTime)) * 4;
        
        // The Origin: Random spark effect
        node.activationTimer--;
        if (node.activationTimer <= 0) {
            node.targetGlow = 8 + Math.random() * 12;
            node.activationTimer = 100 + Math.random() * 300;
        }
        
        if (node.glowRadius > 0) {
            node.glowRadius += (0 - node.glowRadius) * 0.05;
        }
        if (node.targetGlow > 0) {
            node.glowRadius += (node.targetGlow - node.glowRadius) * 0.2;
            if (Math.abs(node.targetGlow - node.glowRadius) < 0.5) node.targetGlow = 0;
        }

        const totalGlow = node.glowRadius + wave;

        // Node core
        matrixCtx.beginPath();
        matrixCtx.arc(node.x, node.y, node.baseRadius, 0, Math.PI * 2);
        matrixCtx.fillStyle = `rgba(0, 229, 255, ${0.3 + totalGlow * 0.05})`;
        matrixCtx.fill();
        
        // Node ethereal glow
        if (totalGlow > 0.5) {
            matrixCtx.beginPath();
            matrixCtx.arc(node.x, node.y, node.baseRadius + totalGlow, 0, Math.PI * 2);
            const gradient = matrixCtx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.baseRadius + totalGlow);
            gradient.addColorStop(0, 'rgba(0, 229, 255, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 229, 255, 0)');
            matrixCtx.fillStyle = gradient;
            matrixCtx.fill();
        }
    });
    
}

// --- Initialization & Global Event Listeners ---

function bootstrapApplication() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.pointerEvents = 'none';
        setTimeout(() => loadingOverlay.remove(), 1000);
    }

    try {
        if (window.appInitialized) return; // Prevent double-execution
        window.appInitialized = true;
        
        // Initialize Synchronicity Engine
        resizeCanvas();

        // Initialize 81 Node Matrix
        initMatrix();

        // Initialize Base44 Torus Knot
        initTorusKnot();

        // Setup performance observers
        setupPerformanceObservers();

        // Start the single, unified animation loop
        masterLoop();
        
        console.log("%c[VISCERAL CURRENT ONLINE]", "color: #00e5ff; font-weight: bold; font-size: 14px;");
        console.log("%cArchitecture for Infinite Potential successfully initialized.", "color: #94a3b8;");
    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

// Bulletproof Initialization Logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApplication);
} else {
    bootstrapApplication(); // Document already finished loading, execute immediately
}

// --- MASTER ANIMATION LOOP ---
function masterLoop() {
    // Pause all heavy rendering if the browser tab is inactive (Saves Battery/CPU)
    if (document.hidden) { requestAnimationFrame(masterLoop); return; }

    // Always run these core animations
    animateCursor();
    drawTorus();

    // Conditionally run expensive canvas animations only when they are visible
    if (appState.isFrequencyCanvasVisible) {
        drawWaves();
    }
    if (appState.isMatrixCanvasVisible) {
        drawMatrix();
    }

    // Run scroll-dependent animations
    updateParallax();
    updateScrollHighlights();
    updateTimelineParallax();

    requestAnimationFrame(masterLoop);
}

// --- Intersection Observers for Performance ---
function setupPerformanceObservers() {
    const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'frequencyCanvas') appState.isFrequencyCanvasVisible = entry.isIntersecting;
            if (entry.target.id === 'matrix-canvas') appState.isMatrixCanvasVisible = entry.isIntersecting;
        });
    }, { threshold: 0.01 });

    if (canvas) canvasObserver.observe(canvas);
    if (matrixCanvas) canvasObserver.observe(matrixCanvas);
}

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        initMatrix();
    }, 250);
});

// --- Hero Torus Knot (Base44 Upgrade) ---
let torusScene, torusCamera, torusRenderer, torusMesh;
let isTorusInitialized = false;

function initTorusKnot() {
    const container = document.getElementById('torus-canvas-container');
    if (!container) return;
    
    if (typeof THREE === 'undefined') {
        setTimeout(initTorusKnot, 100);
        return;
    }
    
    torusScene = new THREE.Scene();
    torusCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    torusCamera.position.z = 25;

    torusRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    torusRenderer.setSize(window.innerWidth, window.innerHeight);
    torusRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(torusRenderer.domElement);

    // Throttle rendering geometry dynamically for mobile
    const segments = window.innerWidth < 768 ? 64 : 150;
    const geometry = new THREE.TorusKnotGeometry(12, 1.5, segments, 20);
    
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x00e5ff,
        emissive: 0xd4af37,
        emissiveIntensity: 0.15,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });

    torusMesh = new THREE.Mesh(geometry, material);
    torusScene.add(torusMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    torusScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00e5ff, 2, 100);
    pointLight.position.set(10, 10, 10);
    torusScene.add(pointLight);

    isTorusInitialized = true;
}

let tMouseX = 0, tMouseY = 0;
window.addEventListener('mousemove', (e) => {
    tMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    tMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function drawTorus() {
    if (!isTorusInitialized || !torusMesh) return;
    
    // Natural ambient rotation
    torusMesh.rotation.x += 0.002;
    torusMesh.rotation.y += 0.003;
    
    // Mouse-reactive quantum intent
    torusMesh.rotation.x += tMouseY * 0.02;
    torusMesh.rotation.y += tMouseX * 0.02;

    torusRenderer.render(torusScene, torusCamera);
}

// --- Phase Shift Parallax Timeline ---
function updateTimelineParallax() {
    const timelineItems = document.querySelectorAll('.parallax-timeline-item');
    if (!timelineItems.length) return;
    
    const windowHeight = window.innerHeight;
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2) - (windowHeight / 2);
        
        const speed = index % 2 === 0 ? 0.05 : 0.08;
        const yOffset = centerOffset * speed;
        
        const content = item.querySelector('.glass-panel');
        if (content) {
            content.style.transform = `translateY(${yOffset}px)`;
        }
    });
}