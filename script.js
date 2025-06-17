// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.innerHTML = `<i class="fas fa-${document.body.classList.contains('dark') ? 'sun' : 'moon'}"></i>`;
});

// Smooth Scroll for Nav Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Fetch and Render Projects and Certifications
fetch('data.json')
    .then(response => {
        console.log('Fetch response status:', response.status, response.statusText);
        if (!response.ok) {
            throw new Error(`Failed to fetch data.json: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched data:', data);
        // Render Projects
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) {
            console.error('projects-grid element not found');
            return;
        }
        if (data.projects && Array.isArray(data.projects)) {
            projectsGrid.innerHTML = ''; // Clear any error message
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p><strong>Technologies:</strong> ${project.technologies}</p>
                    <p>${project.description}</p>
                `;
                projectsGrid.appendChild(projectCard);
            });
        } else {
            console.error('No projects found in data.json or invalid format');
            projectsGrid.innerHTML = '<p>No projects available.</p>';
        }

        // Render Certifications
        const certificationsList = document.getElementById('certifications-list');
        if (!certificationsList) {
            console.error('certifications-list element not found');
            return;
        }
        if (data.certifications && Array.isArray(data.certifications)) {
            certificationsList.innerHTML = ''; // Clear any error message
            data.certifications.forEach(cert => {
                const certItem = document.createElement('li');
                certItem.textContent = `${cert.name} - ${cert.issuer}`;
                certificationsList.appendChild(certItem);
            });
        } else {
            console.error('No certifications found in data.json or invalid format');
            certificationsList.innerHTML = '<p>No certifications available.</p>';
        }
    })
    .catch(error => {
        console.error('Error loading data.json:', error.message, error.stack);
        const projectsGrid = document.getElementById('projects-grid');
        const certificationsList = document.getElementById('certifications-list');
        if (projectsGrid) {
            projectsGrid.innerHTML = '<p>Error loading projects.</p>';
        }
        if (certificationsList) {
            certificationsList.innerHTML = '<p>Error loading certifications.</p>';
        }
    });