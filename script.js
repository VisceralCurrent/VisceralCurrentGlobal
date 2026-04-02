const canvas = document.getElementById('plasma-canvas');
const ctx = canvas.getContext('2d');

let width, height, centerX, centerY;
let mouse = { x: 0, y: 0, active: false };

const TWO_PI = Math.PI * 2;

// 1. Setup Canvas Size
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
}

window.addEventListener('resize', resize);
resize();

// 2. Interaction Listeners (Mouse & Touch)
const startInteraction = (e) => {
    mouse.active = true;
    updateMouse(e);
};

const updateMouse = (e) => {
    const event = e.touches ? e.touches[0] : e;
    mouse.x = event.clientX;
    mouse.y = event.clientY;
};

canvas.addEventListener('mousedown', startInteraction);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startInteraction(e); }, { passive: false });
window.addEventListener('mousemove', updateMouse);
window.addEventListener('touchmove', (e) => { updateMouse(e); }, { passive: false });
window.addEventListener('mouseup', () => mouse.active = false);
window.addEventListener('touchend', () => mouse.active = false);

// 3. Lightning Generation logic
function drawLightning(x1, y1, x2, y2, segments, color, width, jitter = 25) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    
    for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        // Basic path + random "jitter"
        const px = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
        const py = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
        ctx.lineTo(px, py);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.stroke();
}

// 4. The Loop
function render() {
    // Reset shadow blur to prevent it from applying to the background fill
    ctx.shadowBlur = 0;

    // Clear with a slight trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, width, height);

    if (mouse.active) {
        // Core (White)
        drawLightning(centerX, centerY, mouse.x, mouse.y, 8, '#ffffff', 2, 30);
        // Glow (Cyan/Blue)
        drawLightning(centerX, centerY, mouse.x, mouse.y, 12, '#00d4ff', 1, 35);
        
        // Reset shadow blur so the spark doesn't render with a heavy shadow
        ctx.shadowBlur = 0;

        // Add a spark at the touch point
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, TWO_PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    requestAnimationFrame(render);
}

render();