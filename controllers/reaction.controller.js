const Reaction = require('../models/reaction.model');

// Create a new reaction
const createOrUpdateReaction = async (req, res) => {
    const { recipeId, userId, thumbsUp, heart, laugh, angry } = req.body;

    try {
        // Find existing reaction for this recipe and user
        let existingReaction = await Reaction.findOne({ recipeId });

        if (existingReaction) {
            // Update existing reaction counts
            existingReaction.thumbsUp += thumbsUp;
            existingReaction.heart += heart;
            existingReaction.laugh += laugh;
            existingReaction.angry += angry;
            await existingReaction.save();
            res.status(200).json(existingReaction);
        } else {
            // Create new reaction
            const newReaction = new Reaction({
                recipeId,
                thumbsUp,
                heart,
                laugh,
                angry,
            });
            await newReaction.save();
            res.status(201).json(newReaction);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getReactions = async (req, res) => {
    const { recipeId } = req.params;

    try {
        const reactions = await Reaction.find({ recipeId });
        let total = 0;
        let thumbsUpTotal = 0;
        let heartTotal = 0;
        let laughTotal = 0;
        let angryTotal = 0;

        reactions.forEach(reaction => {
            thumbsUpTotal += reaction.thumbsUp;
            heartTotal += reaction.heart;
            laughTotal += reaction.laugh;
            angryTotal += reaction.angry;
            total += reaction.thumbsUp + reaction.heart + reaction.laugh + reaction.angry;
        });

        res.status(200).json({ reactions, thumbsUpTotal, heartTotal, laughTotal, angryTotal, total });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createOrUpdateReaction,
    getReactions,
};