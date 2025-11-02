const express = require('express');
const router = express.Router();
const generateController = require('../controllers/generateController');

router.post('/summary', generateController.generateSummary);
router.post('/cover-letter', generateController.generateCoverLetter);

module.exports = router;