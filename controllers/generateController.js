const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate AI Summary for Resume
exports.generateSummary = async (req, res) => {
    try {
        const { personalDetails, education, experience, skills } = req.body;
        
        const prompt = `
        Generate a professional summary for a resume based on the following information:
        
        Name: ${personalDetails.fullName}
        Education: ${education.map(edu => `${edu.degree} at ${edu.institution}`).join(', ')}
        Experience: ${experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}
        Skills: ${skills.join(', ')}
        
        Please create a concise, professional summary (3-4 sentences) that highlights the candidate's strengths, experience, and career objectives. Make it compelling and tailored to tech industry roles.
        `;
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();
        
        res.json({ success: true, summary });
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to generate summary',
            message: error.message 
        });
    }
};

// Generate AI Cover Letter
exports.generateCoverLetter = async (req, res) => {
    try {
        const { jobDetails, personalDetails, resumeData } = req.body;
        
        const prompt = `
        Generate a professional cover letter for the following job application:
        
        Applicant: ${personalDetails.fullName}
        Position: ${jobDetails.jobTitle}
        Company: ${jobDetails.companyName}
        Hiring Manager: ${jobDetails.hiringManager || 'Hiring Manager'}
        
        Applicant's Background:
        Education: ${resumeData.education.map(edu => `${edu.degree} at ${edu.institution}`).join(', ')}
        Experience: ${resumeData.experience.map(exp => `${exp.title} at ${exp.company}`).join(', ')}
        Skills: ${resumeData.skills.join(', ')}
        
        Please write a compelling cover letter that:
        1. Addresses the hiring manager appropriately
        2. Expresses enthusiasm for the specific position and company
        3. Highlights relevant qualifications and experiences
        4. Explains why the applicant is a good fit
        5. Maintains a professional tone throughout
        6. Is approximately 3-4 paragraphs long
        
        Return only the body of the cover letter (without salutation and closing).
        `;
        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const coverLetter = response.text();
        
        res.json({ success: true, coverLetter });
    } catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to generate cover letter',
            message: error.message 
        });
    }
};