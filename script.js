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
    const modalOverlay = document.getElementById('modal-overlay');
    const nodeNumber = document.getElementById('node-number');
    const nodeDescription = document.getElementById('node-description');
    const closeDetail = document.getElementById('close-detail');

    if (matrixCells.length > 0) {
        let activeCell = null;

        matrixCells.forEach(cell => {
            // Hover effects
            cell.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });

            cell.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });

            // Click to show details
            cell.addEventListener('click', function(e) {
                e.stopPropagation();
                if (activeCell) {
                    activeCell.classList.remove('active');
                }
                activeCell = this;
                this.classList.add('active');

                const nodeId = parseInt(this.getAttribute('data-node'));
                nodeNumber.textContent = nodeId;

                // Use library data if available, otherwise fallback
                let description = '';
                let title = '';
                let realm = '';

                if (typeof getNodeData !== 'undefined') {
                    const nodeData = getNodeData(nodeId);
                    if (nodeData) {
                        title = nodeData.title;
                        description = nodeData.content;
                        const realmData = getRealmByNode(nodeId);
                        realm = realmData ? realmData.name : '';
                    }
                } else {
                    // Fallback descriptions
                    if (nodeId <= 9) {
                        title = `Origin Node ${nodeId}`;
                        description = `Foundational Phase Shift parameter. This node represents the initial input for the Visceral Current transformation.`;
                    } else if (nodeId <= 72) {
                        const layer = Math.floor((nodeId - 10) / 9) + 2;
                        title = `Current Node ${nodeId}`;
                        description = `Operational Visceral Current multiplier in Layer ${layer}.`;
                    } else {
                        title = `Infinite Node ${nodeId}`;
                        description = `Convergence layer for Undeniable impact.`;
                    }
                }

                // Update modal content
                nodeNumber.textContent = nodeId;
                nodeDescription.textContent = description;
                
                // Add realm if available
                if (realm) {
                    nodeNumber.innerHTML = `${nodeId} <span style="font-size: 0.8rem; opacity: 0.7;">• ${realm}</span>`;
                }

                nodeDetail.classList.remove('hidden');
                if (modalOverlay) modalOverlay.classList.add('active');
            });
        });

        // Close modal
        const closeModal = () => {
            nodeDetail.classList.add('hidden');
            if (modalOverlay) modalOverlay.classList.remove('active');
            if (activeCell) {
                activeCell.classList.remove('active');
                activeCell = null;
            }
        };

        closeDetail.addEventListener('click', closeModal);

        // Close on overlay click
        if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !nodeDetail.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});