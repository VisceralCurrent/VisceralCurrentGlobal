// Interactive script for Visceral Current webpage

document.addEventListener('DOMContentLoaded', function() {
    // Side menu toggle
    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('side-menu');

    hamburger.addEventListener('click', function() {
        sideMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    // Close side menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!sideMenu.contains(event.target) && !hamburger.contains(event.target)) {
            sideMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });

    // Realms interactivity
    const realms = document.querySelectorAll('.realm');

    realms.forEach(realm => {
        const sphere = realm.querySelector('.sphere');
        const trinity = realm.querySelector('.trinity');

        sphere.addEventListener('click', function() {
            trinity.classList.toggle('hidden');
        });

        // Add courses of action on understanding hover
        const understandings = trinity.querySelectorAll('.understanding');
        understandings.forEach(understanding => {
            understanding.addEventListener('mouseenter', function() {
                // Create 3 action nodes
                if (!understanding.querySelector('.actions')) {
                    const actions = document.createElement('div');
                    actions.className = 'actions';
                    actions.innerHTML = `
                        <div class="action">Action 1</div>
                        <div class="action">Action 2</div>
                        <div class="action">Action 3</div>
                    `;
                    understanding.appendChild(actions);
                }
            });

            understanding.addEventListener('mouseleave', function() {
                const actions = understanding.querySelector('.actions');
                if (actions) {
                    actions.remove();
                }
            });
        });
    });

    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Glow effect on hover for elements
    const hoverElements = document.querySelectorAll('.card, .entity-card, .equation-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px var(--accent-cyan)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Mastery 360 Matrix interactions
    const matrixCells = document.querySelectorAll('.matrix-cell');
    const nodeDetail = document.getElementById('node-detail');
    const nodeNumber = document.getElementById('node-number');
    const nodeDescription = document.getElementById('node-description');
    const closeDetail = document.getElementById('close-detail');

    if (matrixCells.length > 0) {
        matrixCells.forEach(cell => {
            cell.addEventListener('click', function() {
                const nodeId = this.getAttribute('data-node');
                nodeNumber.textContent = nodeId;
                // Placeholder descriptions - can be expanded with actual content
                if (nodeId <= 9) {
                    nodeDescription.textContent = `Origin Node ${nodeId}: Foundational Phase Shift parameter.`;
                } else if (nodeId <= 72) {
                    nodeDescription.textContent = `Current Node ${nodeId}: Operational Visceral Current multiplier.`;
                } else {
                    nodeDescription.textContent = `Infinite Node ${nodeId}: Convergence layer for Undeniable impact.`;
                }
                nodeDetail.classList.remove('hidden');
            });
        });

        closeDetail.addEventListener('click', function() {
            nodeDetail.classList.add('hidden');
        });
    }
});