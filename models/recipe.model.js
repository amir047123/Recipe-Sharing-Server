const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
  },
  recipeImage: {
    type: String,
  },
  youtubeVideo: {
    type: String,
  },
  country: {
    type: String,
  },
  category: {
    type: String,
  },
  recipeDetails: {
    type: String,
  },
  user: {
    type: String,
  },
  userId: {
    type: String,
  },
  watchCount: {
    type: Number,
    default:0
  },
  purchase: {
    type: Array,
    default:[]
  },
  userName:{
    type:String
  }
 
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
