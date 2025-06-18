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

// Embedded Data (replacing fetch)
const data = {
    projects: [
        {
            title: "Automation to Implement Dynamic Database Macro",
            technologies: "VBA Macros, SQL, UiPath RPA, BOX",
            description: "Developed a VBA macro and RPA solution to automate large dataset validation for Engineering Change Management, reducing validation time and enhancing dashboard usability for site engineers."
        },
        {
            title: "RPA Automation End-to-End",
            technologies: "UiPath, Oracle Agile PLM, BaaN ERP, VBA, Tableau, SQL",
            description: "Implemented end-to-end RPA automation for ECO processes, eliminating 100% manual effort and achieving 80% efficiency gains by integrating multiple tools and platforms."
        },
        {
            title: "Master Data Quality Check",
            technologies: "BaaN ERP, SQL SSMS, MS Access, VBA",
            description: "Built an ETL process to extract, transform, and load data from BaaN ERP, validating customer changes against Flex BOM, reducing errors and enhancing system reliability."
        },
        {
            title: "Web Task Automator",
            technologies: "Selenium Web Driver, Chrome",
            description: "Automated repetitive web application tasks using Selenium, reducing execution time and minimizing errors, improving overall operational efficiency."
        }
    ],
    certifications: [
        {
            name: "SQL",
            issuer: "HackerRank"
        },
        {
            name: "ETL in Python & SQL",
            issuer: "LinkedIn"
        },
        {
            name: "Agile PLM Super Engineer",
            issuer: "Agile PLM"
        }
    ]
};

// Render Projects
const projectsGrid = document.getElementById('projects-grid');
if (!projectsGrid) {
    console.error('projects-grid element not found');
} else if (data.projects && Array.isArray(data.projects)) {
    projectsGrid.innerHTML = '';
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
    console.error('No projects found or invalid format');
    projectsGrid.innerHTML = '<p>No projects available.</p>';
}

// Render Certifications
const certificationsList = document.getElementById('certifications-list');
if (!certificationsList) {
    console.error('certifications-list element not found');
} else if (data.certifications && Array.isArray(data.certifications)) {
    certificationsList.innerHTML = '';
    data.certifications.forEach(cert => {
        const certItem = document.createElement('li');
        certItem.textContent = `${cert.name} - ${cert.issuer}`;
        certificationsList.appendChild(certItem);
    });
} else {
    console.error('No certifications found or invalid format');
    certificationsList.innerHTML = '<p>No certifications available.</p>';
}
