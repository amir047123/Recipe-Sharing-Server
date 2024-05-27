const express = require('express');
const router = express.Router();
const { createOrUpdateReaction, getReactions } = require('../controllers/reaction.controller');


router.post('/reactions', createOrUpdateReaction);
router.get('/reactions/:recipeId', getReactions);

module.exports = router;
