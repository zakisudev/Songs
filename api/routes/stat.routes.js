const express = require('express');
const router = express.Router();
const getStat = require('../controllers/stat.controller');

router.get('/', getStat);

module.exports = router;
