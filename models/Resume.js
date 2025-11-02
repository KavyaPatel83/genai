const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    year: { type: String },
    details: { type: String }
});

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    duration: { type: String },
    technologies: { type: String },
    responsibilities: { type: String }
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    technologies: { type: String },
    description: { type: String }
});

const resumeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    personalDetails: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        linkedin: { type: String },
        github: { type: String },
        address: { type: String }
    },
    education: [educationSchema],
    skills: {
        progLanguages: { type: String },
        webTech: { type: String },
        databases: { type: String },
        tools: { type: String },
        concepts: { type: String }
    },
    experience: [experienceSchema],
    projects: [projectSchema],
    achievements: [String],
    summary: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Resume', resumeSchema);