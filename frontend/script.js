// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Initialize resume builder functionality
    if (document.getElementById('resume-form')) {
        initResumeBuilder();
    }
    
    // Initialize cover letter builder functionality
    if (document.getElementById('cover-letter-form')) {
        initCoverLetterBuilder();
    }
});

// Resume Builder Functionality
function initResumeBuilder() {
    // Counters for dynamic fields
    let educationCount = 1;
    let experienceCount = 1;
    let projectCount = 1;
    let achievementCount = 1;
    
    // Add Education Field
    document.getElementById('add-education').addEventListener('click', function() {
        const container = document.getElementById('education-container');
        const newItem = document.createElement('div');
        newItem.className = 'education-item form-grid';
        newItem.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" name="education[${educationCount}][degree]" placeholder="e.g., B.Tech Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" name="education[${educationCount}][institution]" placeholder="e.g., Vellore Institute of Technology">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" name="education[${educationCount}][location]" placeholder="e.g., Chennai, India">
            </div>
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="text" name="education[${educationCount}][year]" placeholder="e.g., 2023 - 2027">
            </div>
            <div class="form-group full-width">
                <label>Details</label>
                <input type="text" name="education[${educationCount}][details]" placeholder="e.g., CGPA: 8.37/10">
            </div>
            <button type="button" class="btn btn-outline remove-btn" style="grid-column: 1 / -1; margin-top: 10px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(newItem);
        
        // Add remove functionality
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(newItem);
        });
        
        educationCount++;
    });
    
    // Add Experience Field
    document.getElementById('add-experience').addEventListener('click', function() {
        const container = document.getElementById('experience-container');
        const newItem = document.createElement('div');
        newItem.className = 'experience-item form-grid';
        newItem.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" name="experience[${experienceCount}][title]" placeholder="e.g., Software Trainee Intern">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="experience[${experienceCount}][company]" placeholder="e.g., Sahajanand Laser Technology Ltd.">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" name="experience[${experienceCount}][location]" placeholder="e.g., Gandhinagar, India">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="experience[${experienceCount}][duration]" placeholder="e.g., May 2025 - June 2025">
            </div>
            <div class="form-group full-width">
                <label>Responsibilities</label>
                <textarea name="experience[${experienceCount}][responsibilities]" placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
            <button type="button" class="btn btn-outline remove-btn" style="grid-column: 1 / -1; margin-top: 10px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(newItem);
        
        // Add remove functionality
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(newItem);
        });
        
        experienceCount++;
    });
    
    // Add Project Field
    document.getElementById('add-project').addEventListener('click', function() {
        const container = document.getElementById('projects-container');
        const newItem = document.createElement('div');
        newItem.className = 'project-item form-grid';
        newItem.innerHTML = `
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" name="projects[${projectCount}][name]" placeholder="e.g., Resume Generator with AI">
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea name="projects[${projectCount}][description]" placeholder="Describe your project"></textarea>
            </div>
            <button type="button" class="btn btn-outline remove-btn" style="grid-column: 1 / -1; margin-top: 10px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(newItem);
        
        // Add remove functionality
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(newItem);
        });
        
        projectCount++;
    });
    
    // Add Achievement Field
    document.getElementById('add-achievement').addEventListener('click', function() {
        const container = document.getElementById('achievements-container');
        const newItem = document.createElement('div');
        newItem.className = 'achievement-item form-group';
        newItem.innerHTML = `
            <input type="text" name="achievements[${achievementCount}]" placeholder="e.g., Internship Certificate - SLTL Group (2025)">
            <button type="button" class="btn btn-outline remove-btn" style="margin-top: 5px;">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        container.appendChild(newItem);
        
        // Add remove functionality
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(newItem);
        });
        
        achievementCount++;
    });
    
    // Generate AI Summary
    document.getElementById('generate-ai-summary').addEventListener('click', function() {
        const fullName = document.getElementById('fullName').value;
        const skills = document.getElementById('skills').value;
        
        if (!fullName) {
            alert('Please enter your name first');
            return;
        }
        
        // Show loading state
        const button = this;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        button.disabled = true;
        
        // Call AI API to generate summary
        generateAISummary(fullName, skills)
            .then(summary => {
                document.getElementById('preview-summary').textContent = summary;
                button.innerHTML = originalText;
                button.disabled = false;
            })
            .catch(error => {
                console.error('Error generating AI summary:', error);
                document.getElementById('preview-summary').textContent = 
                    Experienced professional with skills in ${skills || 'various technologies'}. Seeking opportunities to apply expertise and contribute to organizational success.;
                button.innerHTML = originalText;
                button.disabled = false;
            });
    });
    
    // Form submission for preview
    document.getElementById('resume-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateResumePreview();
    });
    
    // Download Resume
    document.getElementById('download-resume').addEventListener('click', function() {
        // In a real implementation, this would generate a PDF
        alert('In a full implementation, this would download your resume as a PDF. For now, you can print the preview section.');
        
        // For demo purposes, we'll open print dialog for the preview
        const previewContent = document.getElementById('resume-preview').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume - ${document.getElementById('fullName').value || 'Your Name'}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                    .resume-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4361ee; padding-bottom: 20px; }
                    .resume-header h1 { color: #4361ee; margin-bottom: 5px; }
                    .resume-section { margin-bottom: 20px; }
                    .resume-section h2 { color: #4361ee; border-bottom: 1px solid #e9ecef; padding-bottom: 5px; }
                    @media print { body { -webkit-print-color-adjust: exact; } }
                </style>
            </head>
            <body>
                ${previewContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });
}

// Cover Letter Builder Functionality
function initCoverLetterBuilder() {
    // Generate AI Cover Letter
    document.getElementById('generate-ai-cover-letter').addEventListener('click', function() {
        const jobTitle = document.getElementById('jobTitle').value;
        const companyName = document.getElementById('companyName').value;
        const yourName = document.getElementById('yourName').value;
        const relevantSkills = document.getElementById('relevantSkills').value;
        
        if (!jobTitle || !companyName || !yourName) {
            alert('Please fill in the required fields: Job Title, Company Name, and Your Name');
            return;
        }
        
        // Show loading state
        const button = this;
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        button.disabled = true;
        
        // Call AI API to generate cover letter
        generateAICoverLetter(jobTitle, companyName, yourName, relevantSkills)
            .then(coverLetter => {
                document.getElementById('preview-cover-letter-content').innerHTML = coverLetter;
                button.innerHTML = originalText;
                button.disabled = false;
            })
            .catch(error => {
                console.error('Error generating AI cover letter:', error);
                document.getElementById('preview-cover-letter-content').innerHTML = 
                    `<p>I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my skills in ${relevantSkills || 'various technologies'}, I believe I would be a valuable addition to your team.</p>
                    <p>My experience and qualifications make me well-suited for this role, and I am excited about the opportunity to contribute to your company's success.</p>
                    <p>Thank you for considering my application. I look forward to the possibility of discussing this opportunity further.</p>`;
                button.innerHTML = originalText;
                button.disabled = false;
            });
    });
    
    // Form submission for preview
    document.getElementById('cover-letter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateCoverLetterPreview();
    });
    
    // Download Cover Letter
    document.getElementById('download-cover-letter').addEventListener('click', function() {
        // In a real implementation, this would generate a PDF
        alert('In a full implementation, this would download your cover letter as a PDF. For now, you can print the preview section.');
        
        // For demo purposes, we'll open print dialog for the preview
        const previewContent = document.getElementById('cover-letter-preview').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cover Letter - ${document.getElementById('yourName').value || 'Your Name'}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                    .cover-letter-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    .cover-letter-salutation { margin-bottom: 20px; }
                    .cover-letter-body { margin-bottom: 30px; }
                    .cover-letter-closing { margin-top: 40px; }
                    @media print { body { -webkit-print-color-adjust: exact; } }
                </style>
            </head>
            <body>
                ${previewContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });
    
    // Update date in cover letter
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('preview-date').textContent = currentDate;
}

// Update Resume Preview
function updateResumePreview() {
    const formData = new FormData(document.getElementById('resume-form'));
    
    // Personal Details
    document.getElementById('preview-name').textContent = formData.get('fullName') || 'Your Name';
    
    const contactInfo = [];
    if (formData.get('email')) contactInfo.push(formData.get('email'));
    if (formData.get('phone')) contactInfo.push(formData.get('phone'));
    if (formData.get('linkedin')) contactInfo.push('LinkedIn');
    if (formData.get('github')) contactInfo.push('GitHub');
    
    document.getElementById('preview-contact').textContent = contactInfo.join(' | ') || 'Email | Phone | LinkedIn | GitHub';
    document.getElementById('preview-address').textContent = formData.get('address') || 'Address';
    
    // Education
    const educationContainer = document.getElementById('preview-education');
    educationContainer.innerHTML = '';
    
    for (let i = 0; formData.get(education[${i}][degree]); i++) {
        const degree = formData.get(education[${i}][degree]);
        const institution = formData.get(education[${i}][institution]);
        const location = formData.get(education[${i}][location]);
        const year = formData.get(education[${i}][year]);
        const details = formData.get(education[${i}][details]);
        
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <h3>${degree}</h3>
            <p><strong>${institution}</strong> | ${location} | ${year}</p>
            <p>${details}</p>
        `;
        educationContainer.appendChild(educationItem);
    }
    
    if (educationContainer.children.length === 0) {
        educationContainer.innerHTML = '<p>Your education details will appear here...</p>';
    }
    
    // Experience
    const experienceContainer = document.getElementById('preview-experience');
    experienceContainer.innerHTML = '';
    
    for (let i = 0; formData.get(experience[${i}][title]); i++) {
        const title = formData.get(experience[${i}][title]);
        const company = formData.get(experience[${i}][company]);
        const location = formData.get(experience[${i}][location]);
        const duration = formData.get(experience[${i}][duration]);
        const responsibilities = formData.get(experience[${i}][responsibilities]);
        
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        experienceItem.innerHTML = `
            <h3>${title}</h3>
            <p><strong>${company}</strong> | ${location} | ${duration}</p>
            <p>${responsibilities}</p>
        `;
        experienceContainer.appendChild(experienceItem);
    }
    
    if (experienceContainer.children.length === 0) {
        experienceContainer.innerHTML = '<p>Your work experience will appear here...</p>';
    }
    
    // Skills
    const skills = formData.get('skills');
    const skillsContainer = document.getElementById('preview-skills');
    
    if (skills) {
        skillsContainer.innerHTML = `<p>${skills.split(',').map(skill => <span class="skill-tag">${skill.trim()}</span>).join('')}</p>`;
    } else {
        skillsContainer.innerHTML = '<p>Your skills will appear here...</p>';
    }
    
    // Projects
    const projectsContainer = document.getElementById('preview-projects');
    projectsContainer.innerHTML = '';
    
    for (let i = 0; formData.get(projects[${i}][name]); i++) {
        const name = formData.get(projects[${i}][name]);
        const description = formData.get(projects[${i}][description]);
        
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
        `;
        projectsContainer.appendChild(projectItem);
    }
    
    if (projectsContainer.children.length === 0) {
        projectsContainer.innerHTML = '<p>Your projects will appear here...</p>';
    }
    
    // Achievements
    const achievementsContainer = document.getElementById('preview-achievements');
    achievementsContainer.innerHTML = '';
    
    for (let i = 0; formData.get(achievements[${i}]); i++) {
        const achievement = formData.get(achievements[${i}]);
        
        const achievementItem = document.createElement('p');
        achievementItem.innerHTML = • ${achievement};
        achievementsContainer.appendChild(achievementItem);
    }
    
    if (achievementsContainer.children.length === 0) {
        achievementsContainer.innerHTML = '<p>Your achievements will appear here...</p>';
    }
}

function initCoverLetterBuilder() {
    console.log('Initializing cover letter builder...');
    
    // Generate AI Cover Letter
    const generateBtn = document.getElementById('generate-ai-cover-letter');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            console.log('Generate button clicked');
            
            const jobTitle = document.getElementById('jobTitle').value;
            const companyName = document.getElementById('companyName').value;
            const yourName = document.getElementById('yourName').value;
            const relevantSkills = document.getElementById('relevantSkills').value;
            
            if (!jobTitle || !companyName || !yourName) {
                alert('Please fill in the required fields: Job Title, Company Name, and Your Name');
                return;
            }
            
            // Show loading state
            const button = this;
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            button.disabled = true;
            
            // Call AI API to generate cover letter
            generateAICoverLetter(jobTitle, companyName, yourName, relevantSkills)
                .then(coverLetter => {
                    document.getElementById('preview-cover-letter-content').innerHTML = coverLetter;
                    button.innerHTML = originalText;
                    button.disabled = false;
                    console.log('Cover letter generated successfully');
                })
                .catch(error => {
                    console.error('Error generating AI cover letter:', error);
                    document.getElementById('preview-cover-letter-content').innerHTML = 
                        `<p>I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my skills in ${relevantSkills || 'various technologies'}, I believe I would be a valuable addition to your team.</p>
                        <p>My experience and qualifications make me well-suited for this role, and I am excited about the opportunity to contribute to your company's success.</p>
                        <p>Thank you for considering my application. I look forward to the possibility of discussing this opportunity further.</p>`;
                    button.innerHTML = originalText;
                    button.disabled = false;
                });
        });
    } else {
        console.error('Generate button not found!');
    }
    
    // Form submission for preview
    const coverLetterForm = document.getElementById('cover-letter-form');
    if (coverLetterForm) {
        coverLetterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateCoverLetterPreview();
        });
    }
    
    // Download Cover Letter
    const downloadBtn = document.getElementById('download-cover-letter');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // In a real implementation, this would generate a PDF
            alert('In a full implementation, this would download your cover letter as a PDF. For now, you can print the preview section.');
            
            // For demo purposes, we'll open print dialog for the preview
            const previewContent = document.getElementById('cover-letter-preview').innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Cover Letter - ${document.getElementById('yourName').value || 'Your Name'}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                        .cover-letter-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        .cover-letter-salutation { margin-bottom: 20px; }
                        .cover-letter-body { margin-bottom: 30px; }
                        .cover-letter-closing { margin-top: 40px; }
                        @media print { body { -webkit-print-color-adjust: exact; } }
                    </style>
                </head>
                <body>
                    ${previewContent}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        });
    }
    
    // Update date in cover letter
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const dateElement = document.getElementById('preview-date');
    if (dateElement) {
        dateElement.textContent = currentDate;
    }
    
    console.log('Cover letter builder initialized successfully');
}
// Update Cover Letter Preview
function updateCoverLetterPreview() {
    const formData = new FormData(document.getElementById('cover-letter-form'));
    
    // Your Information
    document.getElementById('preview-your-name').textContent = formData.get('yourName') || 'Your Name';
    document.getElementById('preview-your-address').textContent = formData.get('yourAddress') || 'Your Address';
    
    const yourContact = [];
    if (formData.get('yourEmail')) yourContact.push(formData.get('yourEmail'));
    if (formData.get('yourPhone')) yourContact.push(formData.get('yourPhone'));
    
    document.getElementById('preview-your-contact').textContent = yourContact.join(' | ') || 'Email | Phone';
    
    // Recipient Information
    document.getElementById('preview-hiring-manager').textContent = 
        formData.get('hiringManager') || 'Hiring Manager';
    document.getElementById('preview-company-name').textContent = 
        formData.get('companyName') || 'Company Name';
    document.getElementById('preview-company-address').textContent = 
        formData.get('companyAddress') || 'Company Address';
    
    // Salutation
    const hiringManager = formData.get('hiringManager');
    document.getElementById('preview-salutation').textContent = 
        Dear ${hiringManager ? hiringManager.split(' ')[0] : 'Hiring Manager'},;
    
    // Closing
    document.getElementById('preview-closing-name').textContent = formData.get('yourName') || 'Your Name';
}

// AI Integration Functions (Mock implementations for demo)
async function generateAISummary(name, skills) {
    // In a real implementation, this would call the Gemini Pro API
    // For demo purposes, we'll return a mock response
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const skillList = skills ? skills.split(',').slice(0, 3).join(', ') : 'various technologies';
            resolve(Results-driven ${name.split(' ')[0]} with expertise in ${skillList}. Demonstrated success in developing innovative solutions and collaborating effectively in team environments. Strong problem-solving abilities with a commitment to delivering high-quality results. Seeking to leverage technical skills and experience in a challenging new role.);
        }, 1500);
    });
}

async function generateAICoverLetter(jobTitle, companyName, yourName, skills) {
    // In a real implementation, this would call the Gemini Pro API
    // For demo purposes, we'll return a mock response
    
    return new Promise((resolve) => {
        setTimeout(() => {
            const skillList = skills ? skills.split(',').slice(0, 3).join(', ') : 'relevant technical skills';
            resolve(`
                <p>I am writing to express my enthusiastic interest in the ${jobTitle} position at ${companyName}, as advertised on your company website. With my background in ${skillList}, I am confident that I possess the skills and experience necessary to excel in this role and contribute significantly to your team.</p>
                
                <p>Throughout my career, I have developed a strong foundation in ${skillList.split(', ')[0]} and have successfully applied these skills in various projects. My hands-on experience, combined with my passion for innovation, makes me well-prepared to tackle the challenges this position presents.</p>
                
                <p>I am particularly drawn to ${companyName} because of your reputation for ${['excellence', 'innovation', 'quality'][Math.floor(Math.random() * 3)]} in the industry. I am excited about the opportunity to contribute to your team and help drive your company's success forward.</p>
                
                <p>Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss how my skills and experiences align with your needs. I am available for an interview at your earliest convenience.</p>
            `);
        }, 2000);
    });
}

// Add some CSS for skill tags
const style = document.createElement('style');
style.textContent = `
    .skill-tag {
        display: inline-block;
        background-color: #e9ecef;
        padding: 5px 10px;
        margin: 2px 5px 2px 0;
        border-radius: 15px;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);