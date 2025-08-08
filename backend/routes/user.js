const express = require('express')
const router = express.Router();
const {registerUser,loginUser,ForChangePassword} = require('../controller/controller-roles.js');

const userMiddleware = require('../middleware/user-middleware.js')
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/change',userMiddleware,ForChangePassword);


module.exports = router;