const express = require('express');
const router = express.Router();
const isadminUser = require('../middleware/admin-middleware');

router.get('/adminpage',isadminUser);

module.exports = router;