const express = require("express");
const {
  createRecipe,
  getRecipes,
  deleteRecipe,
  updateRecipe,
  getRecipeById,
  getSpecificRecipes,
  getTotalRecipes,
} = require("../controllers/recipe.controller");

const router = express.Router();

router.get("/getRecipes", getRecipes);
router.get("/getRecipesById/:id", getRecipeById);
router.delete("/deleteRecipes/:id", deleteRecipe);
router.patch("/updateRecipes/:id", updateRecipe);
router.get("/specific", getSpecificRecipes);
router.get("/totalRecipes", getTotalRecipes);  


module.exports = router;
