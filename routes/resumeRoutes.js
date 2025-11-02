const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/save', resumeController.saveResume);
router.get('/:userId', resumeController.getResume);
router.get('/', resumeController.getAllResumes);
router.delete('/:userId', resumeController.deleteResume);

module.exports = router;