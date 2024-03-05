const router = require('express').Router();
const { User, Post, Comment } = require('../models');


router.use('/api', apiRoutes);
module.exports = router;