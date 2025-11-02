const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Mock cover letter data (replace with actual database operations)
let coverLetters = [];
let coverLetterIdCounter = 1;

// GET all cover letters for authenticated user
router.get('/', authenticate, (req, res) => {
    try {
        const userCoverLetters = coverLetters.filter(cl => cl.userId === req.user.id);
        res.json({
            success: true,
            data: userCoverLetters,
            count: userCoverLetters.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cover letters',
            error: error.message
        });
    }
});

// GET single cover letter by ID
router.get('/:id', authenticate, (req, res) => {
    try {
        const coverLetter = coverLetters.find(
            cl => cl.id === req.params.id && cl.userId === req.user.id
        );
        
        if (!coverLetter) {
            return res.status(404).json({
                success: false,
                message: 'Cover letter not found'
            });
        }

        res.json({
            success: true,
            data: coverLetter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching cover letter',
            error: error.message
        });
    }
});

// POST create new cover letter
router.post('/', authenticate, (req, res) => {
    try {
        const {
            jobTitle,
            companyName,
            hiringManager,
            companyAddress,
            yourName,
            yourAddress,
            yourEmail,
            yourPhone,
            relevantSkills,
            relevantExperience,
            additionalInfo,
            content
        } = req.body;

        const newCoverLetter = {
            id: coverLetterIdCounter.toString(),
            userId: req.user.id,
            jobTitle,
            companyName,
            hiringManager,
            companyAddress,
            yourName,
            yourAddress,
            yourEmail,
            yourPhone,
            relevantSkills,
            relevantExperience,
            additionalInfo,
            content: content || generateCoverLetterContent({
                jobTitle,
                companyName,
                hiringManager,
                yourName,
                relevantSkills,
                relevantExperience,
                additionalInfo
            }),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Increment counter for next cover letter
        coverLetterIdCounter++;

        coverLetters.push(newCoverLetter);

        res.status(201).json({
            success: true,
            message: 'Cover letter created successfully',
            data: newCoverLetter
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating cover letter',
            error: error.message
        });
    }
});

// PUT update cover letter
router.put('/:id', authenticate, (req, res) => {
    try {
        const index = coverLetters.findIndex(
            cl => cl.id === req.params.id && cl.userId === req.user.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cover letter not found'
            });
        }

        coverLetters[index] = {
            ...coverLetters[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'Cover letter updated successfully',
            data: coverLetters[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating cover letter',
            error: error.message
        });
    }
});

// DELETE cover letter
router.delete('/:id', authenticate, (req, res) => {
    try {
        const index = coverLetters.findIndex(
            cl => cl.id === req.params.id && cl.userId === req.user.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Cover letter not found'
            });
        }

        coverLetters.splice(index, 1);

        res.json({
            success: true,
            message: 'Cover letter deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting cover letter',
            error: error.message
        });
    }
});

// POST generate AI cover letter
router.post('/generate', authenticate, (req, res) => {
    try {
        const {
            jobTitle,
            companyName,
            hiringManager,
            yourName,
            relevantSkills,
            relevantExperience,
            additionalInfo
        } = req.body;

        const aiGeneratedContent = generateCoverLetterContent({
            jobTitle,
            companyName,
            hiringManager,
            yourName,
            relevantSkills,
            relevantExperience,
            additionalInfo
        });

        res.json({
            success: true,
            data: {
                content: aiGeneratedContent,
                generatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating cover letter',
            error: error.message
        });
    }
});

// Helper function to generate cover letter content
function generateCoverLetterContent(data) {
    const {
        jobTitle,
        companyName,
        hiringManager,
        yourName,
        relevantSkills,
        relevantExperience,
        additionalInfo
    } = data;

    const salutation = hiringManager ? `Dear ${hiringManager},` : 'Dear Hiring Manager,';
    const skills = relevantSkills || 'relevant skills and experience';
    
    const templates = [
        `I am writing to express my enthusiastic interest in the ${jobTitle} position at ${companyName}. With my background in ${skills}, I am confident that I possess the skills and experience necessary to excel in this role and contribute significantly to your team.

${relevantExperience ? `Throughout my career, I have ${relevantExperience}. This experience has equipped me with valuable insights and practical skills that I believe would be highly beneficial to your organization.` : 'My professional experience has prepared me to make meaningful contributions to dynamic teams and challenging projects.'}

${additionalInfo ? additionalInfo : `I have been following ${companyName}'s work and am particularly impressed by your commitment to excellence and innovation in the industry.`}

I am excited about the opportunity to bring my unique perspective and skills to your team and contribute to ${companyName}'s continued success and growth.`,

        `I am thrilled to apply for the ${jobTitle} position at ${companyName}. My expertise in ${skills} aligns perfectly with the requirements outlined in the job description, and I am eager to bring my dedication and capabilities to your esteemed organization.

${relevantExperience ? `My professional journey includes ${relevantExperience}. These accomplishments have honed my abilities and prepared me to tackle complex challenges effectively while delivering quality results.` : 'I have developed a comprehensive skill set through various professional experiences that I believe would add significant value to your team.'}

${additionalInfo ? additionalInfo : `What particularly attracts me to ${companyName} is your outstanding reputation for innovation and your commitment to addressing industry challenges with creative solutions.`}

I am confident that my background, combined with my enthusiasm for this opportunity, makes me a strong candidate for this position. I look forward to the possibility of contributing to your team's success.`
    ];

    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    return `${salutation}

${randomTemplate}

Sincerely,

${yourName}`;
}

module.exports = router;
