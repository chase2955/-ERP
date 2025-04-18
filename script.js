// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Update header title
            const headerTitle = document.querySelector('header h1');
            headerTitle.textContent = this.textContent.trim();
            
            // Here you would typically load the corresponding content
            // For now, we'll just show an alert
            if (this.getAttribute('href') !== '#dashboard') {
                alert('이 기능은 현재 개발 중입니다.');
            }
        });
    });
});

// Sample data for demonstration
const repairData = {
    ongoing: 12,
    waiting: 5,
    completed: 128,
    monthlyRevenue: 15280000
};

// Update stats periodically (simulating real-time updates)
function updateStats() {
    // Randomly adjust the numbers slightly to simulate real-time changes
    repairData.ongoing += Math.floor(Math.random() * 3) - 1;
    repairData.waiting += Math.floor(Math.random() * 2) - 1;
    repairData.completed += Math.floor(Math.random() * 2);
    repairData.monthlyRevenue += Math.floor(Math.random() * 100000) - 50000;

    // Update the display
    document.querySelectorAll('.stat-number').forEach((stat, index) => {
        switch(index) {
            case 0:
                stat.textContent = repairData.ongoing;
                break;
            case 1:
                stat.textContent = repairData.waiting;
                break;
            case 2:
                stat.textContent = repairData.completed;
                break;
            case 3:
                stat.textContent = '₩' + repairData.monthlyRevenue.toLocaleString();
                break;
        }
    });
}

// Update stats every 5 seconds
setInterval(updateStats, 5000);

// Mobile responsive menu toggle
const toggleMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 
        sidebar.style.transform === 'translateX(0px)' ? 
        'translateX(-100%)' : 'translateX(0px)';
};

// Add mobile menu button if screen is small
if (window.innerWidth <= 768) {
    const header = document.querySelector('.header-content');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.className = 'menu-toggle';
    menuButton.onclick = toggleMenu;
    header.insertBefore(menuButton, header.firstChild);
}

// Handle window resize
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.style.transform = 'translateX(0)';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
    }
}); 