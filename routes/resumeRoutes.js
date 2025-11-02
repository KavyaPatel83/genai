const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Mock resume data (replace with actual database operations)
let resumes = [];
let resumeIdCounter = 1;

// GET all resumes for authenticated user
router.get('/', authenticate, (req, res) => {
    try {
        const userResumes = resumes.filter(resume => resume.userId === req.user.id);
        res.json({
            success: true,
            data: userResumes,
            count: userResumes.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching resumes',
            error: error.message
        });
    }
});

// GET single resume by ID
router.get('/:id', authenticate, (req, res) => {
    try {
        const resume = resumes.find(
            r => r.id === req.params.id && r.userId === req.user.id
        );
        
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        res.json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching resume',
            error: error.message
        });
    }
});

// POST create new resume
router.post('/', authenticate, (req, res) => {
    try {
        const {
            personalInfo,
            summary,
            experience,
            education,
            skills,
            projects,
            achievements
        } = req.body;

        const newResume = {
            id: resumeIdCounter.toString(),
            userId: req.user.id,
            personalInfo: personalInfo || {},
            summary: summary || generateAISummary(personalInfo?.name, skills),
            experience: experience || [],
            education: education || [],
            skills: skills || [],
            projects: projects || [],
            achievements: achievements || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Increment counter for next resume
        resumeIdCounter++;

        resumes.push(newResume);

        res.status(201).json({
            success: true,
            message: 'Resume created successfully',
            data: newResume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating resume',
            error: error.message
        });
    }
});

// PUT update resume
router.put('/:id', authenticate, (req, res) => {
    try {
        const index = resumes.findIndex(
            r => r.id === req.params.id && r.userId === req.user.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        resumes[index] = {
            ...resumes[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        res.json({
            success: true,
            message: 'Resume updated successfully',
            data: resumes[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating resume',
            error: error.message
        });
    }
});

// DELETE resume
router.delete('/:id', authenticate, (req, res) => {
    try {
        const index = resumes.findIndex(
            r => r.id === req.params.id && r.userId === req.user.id
        );

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            });
        }

        resumes.splice(index, 1);

        res.json({
            success: true,
            message: 'Resume deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting resume',
            error: error.message
        });
    }
});

// POST generate AI summary
router.post('/generate-summary', authenticate, (req, res) => {
    try {
        const { name, skills, experience } = req.body;

        const aiSummary = generateAISummary(name, skills, experience);

        res.json({
            success: true,
            data: {
                summary: aiSummary,
                generatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating summary',
            error: error.message
        });
    }
});

// Helper function to generate AI summary
function generateAISummary(name, skills, experience) {
    const skillList = skills ? skills.split(',').slice(0, 3).join(', ') : 'various technologies';
    const firstName = name ? name.split(' ')[0] : 'Professional';
    
    const templates = [
        `Results-driven ${firstName} with expertise in ${skillList}. Demonstrated success in developing innovative solutions and collaborating effectively in team environments. Strong problem-solving abilities with a commitment to delivering high-quality results. Seeking to leverage technical skills and experience in a challenging new role.`,

        `Experienced professional with strong background in ${skillList}. Proven track record of ${experience || 'delivering successful projects and driving business growth'}. Excellent communication skills and ability to work collaboratively in fast-paced environments. Passionate about continuous learning and professional development.`,

        `Skilled ${firstName} specializing in ${skillList}. Adept at ${experience || 'managing complex projects and implementing efficient solutions'}. Strong analytical skills combined with practical experience in delivering measurable results. Committed to excellence and continuous improvement in all professional endeavors.`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
}

module.exports = router;
