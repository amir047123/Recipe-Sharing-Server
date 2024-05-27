const Reaction = require('../models/reaction.model');


const createOrUpdateReaction = async (req, res) => {
    const { recipeId, userId, reactionType, action } = req.body;
  
    try {
      let existingReaction = await Reaction.findOne({ recipeId, userId });
  
      if (existingReaction) {
        if (action === "remove") {
          existingReaction[reactionType]--;
          existingReaction.reactionType = null; 
          await existingReaction.save();
          res.status(200).json(existingReaction);
        } else {
          if (reactionType !== existingReaction.reactionType) {
            existingReaction[existingReaction.reactionType]--;
            existingReaction[reactionType]++;
            existingReaction.reactionType = reactionType;
            await existingReaction.save();
            res.status(200).json(existingReaction);
          } else {
            res.status(400).json({ error: 'Reaction already exists' });
          }
        }
      } else {
        const newReaction = new Reaction({
          recipeId,
          userId,
          [reactionType]: 1,
          reactionType,
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
