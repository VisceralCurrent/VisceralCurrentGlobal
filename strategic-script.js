const canvas = document.getElementById('flowCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('activateFlow');

let width, height;
let time = 0;
let speedMod = 0.02;
let ampMod = 30;
let targetAmp = 30;
let isActive = false;

function resize() {
    // Support for High-DPI (Retina) Displays
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
}

window.addEventListener('resize', resize);
resize();

function drawFlow() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw 3 layered waves for depth
    for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        
        // Alternate styling based on layer
        ctx.lineWidth = j === 1 ? 2 : 1;
        ctx.strokeStyle = j === 1 ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.15)';
        
        if (j === 1) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#d4af37';
        } else {
            ctx.shadowBlur = 0;
        }

        for (let i = 0; i <= width; i += 10) {
            const y = (height / 2) 
                    + Math.sin(i * 0.005 + time + j) * ampMod 
                    + Math.cos(i * 0.008 - time + j) * (ampMod * 0.5);
            
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }
        ctx.stroke();
    }
    
    time += speedMod;
    
    // Smooth mathematical interpolation for absolute flow
    const targetSpeed = isActive ? 0.08 : 0.02;
    speedMod += (targetSpeed - speedMod) * 0.05;
    ampMod += (targetAmp - ampMod) * 0.05;

    requestAnimationFrame(drawFlow);
}

drawFlow();

// Phase Shift Interaction
btn.addEventListener('click', () => {
    isActive = !isActive;
    targetAmp = isActive ? 100 : 30;
    btn.innerText = isActive ? "Current Active" : "Initialize Phase Shift";
});
