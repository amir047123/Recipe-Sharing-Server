const Recipe = require("../models/recipe.model");

exports.createRecipeService = async (data) => {
  const createdRecipe = await Recipe.create(data);
  return createdRecipe;
};

exports.deleteRecipeService = async (id) => {
  const deletedRecipe = await Recipe.deleteOne({ _id: id });
  return deletedRecipe;
};

exports.updateRecipeService = async (id, data) => {
  const updatedRecipe = await Recipe.updateOne({ _id: id }, data);
  return updatedRecipe;
};

exports.getRecipeByIdService = async (id) => {
  const recipeById = await Recipe.findOne({ _id: id });
  return recipeById;
};
exports.getTotalRecipesService = async () => {
  const totalRecipes = await Recipe.countDocuments();
  return totalRecipes;
};