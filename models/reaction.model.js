// models/Reaction.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Reaction schema
const reactionSchema = new Schema({
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true,
    },
   
    thumbsUp: {
        type: Number,
        default: 0,
    },
    heart: {
        type: Number,
        default: 0,
    },
    laugh: {
        type: Number,
        default: 0,
    },
    angry: {
        type: Number,
        default: 0,
    },
    userId:{
        type:String
    }
}, {
    timestamps: true,
});

// Create the Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
