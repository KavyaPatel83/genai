const Resume = require('../models/Resume');

// Save or Update Resume
exports.saveResume = async (req, res) => {
    try {
        const resumeData = req.body;
        const userId = req.body.userId || 'anonymous';
        
        console.log('📥 Saving resume for user:', userId);
        console.log('📊 Resume data:', JSON.stringify(resumeData, null, 2));

        let resume = await Resume.findOne({ userId });

        if (resume) {
            // Update existing resume
            resume = await Resume.findOneAndUpdate(
                { userId },
                { 
                    ...resumeData, 
                    updatedAt: new Date() 
                },
                { new: true, runValidators: true }
            );
            console.log('✅ Resume updated successfully');
        } else {
            // Create new resume
            resume = new Resume({ 
                ...resumeData, 
                userId 
            });
            await resume.save();
            console.log('✅ New resume created successfully');
        }

        res.json({ 
            success: true, 
            message: resume ? 'Resume updated' : 'Resume created',
            resume 
        });
    } catch (error) {
        console.error('❌ Error saving resume:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to save resume',
            message: error.message 
        });
    }
};

// Get Resume by User ID
exports.getResume = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('📥 Fetching resume for user:', userId);
        
        const resume = await Resume.findOne({ userId });
        
        if (!resume) {
            console.log('❌ Resume not found for user:', userId);
            return res.status(404).json({ 
                success: false, 
                error: 'Resume not found' 
            });
        }

        console.log('✅ Resume found for user:', userId);
        res.json({ success: true, resume });
    } catch (error) {
        console.error('❌ Error fetching resume:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch resume',
            message: error.message 
        });
    }
};

// Get All Resumes (for admin purposes)
exports.getAllResumes = async (req, res) => {
    try {
        console.log('📥 Fetching all resumes');
        const resumes = await Resume.find().sort({ createdAt: -1 });
        
        console.log(`✅ Found ${resumes.length} resumes`);
        res.json({ success: true, count: resumes.length, resumes });
    } catch (error) {
        console.error('❌ Error fetching resumes:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to fetch resumes',
            message: error.message 
        });
    }
};

// Delete Resume
exports.deleteResume = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('🗑️ Deleting resume for user:', userId);
        
        const result = await Resume.findOneAndDelete({ userId });
        
        if (!result) {
            console.log('❌ Resume not found for deletion:', userId);
            return res.status(404).json({ 
                success: false, 
                error: 'Resume not found' 
            });
        }

        console.log('✅ Resume deleted successfully for user:', userId);
        res.json({ success: true, message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('❌ Error deleting resume:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to delete resume',
            message: error.message 
        });
    }
};