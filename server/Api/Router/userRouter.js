
const express = require('express');
const router = express.Router();
const formDataController = require('../formRouter');

router.post('/', formDataController.saveFormData);

module.exports = router;