const Recipe = require("../models/recipe.model");


const {
    createRecipeService,
    deleteRecipeService,
    updateRecipeService,
    getRecipeByIdService,
    getTotalRecipesService,

  } = require("../services/recipe.service");
  
  // Create Recipe
  exports.createRecipe = async (req, res) => {
    try {
      const newRecipe = await createRecipeService(req.body);
      res.status(200).json({
        status: "success",
        message: "Recipe inserted successfully!",
        data: newRecipe,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  
  // Get Recipes
  exports.getRecipes = async (req, res) => {
    const page = +req.query?.page;
    const size = +req.query?.size;
    const fieldName = req.query?.fieldName;
    const fieldValue = req.query?.fieldValue;
    const fieldName2 = req.query?.fieldName2;
    const fieldValue2 = req.query?.fieldValue2;
    const fieldName3 = req.query?.fieldName3;
    const fieldValue3 = req.query?.fieldValue3;
  
    try {
      const recipes = await Recipe.find({
        $and: [
          { [fieldName]: { $eq: fieldValue } },
          { [fieldName2]: { $eq: fieldValue2 } },
          { [fieldName3]: { $eq: fieldValue3 } },
        ],
      })
        .skip(page * size)
        .limit(size);
  
      const total = await Recipe.countDocuments({
        $and: [
          { [fieldName]: { $eq: fieldValue } },
          { [fieldName2]: { $eq: fieldValue2 } },
          { [fieldName3]: { $eq: fieldValue3 } },
        ],
      });
  
      res.status(200).json({
        status: "success",
        data: recipes,
        total: total,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  
  // Delete Recipe
  exports.deleteRecipe = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRecipe = await deleteRecipeService(id);
  
      res.status(200).json({
        status: "success",
        data: deletedRecipe,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  
  // Update Recipe
  exports.updateRecipe = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedRecipe = await updateRecipeService(id, req.body);
  
      if (updatedRecipe.nModified === 0) {
        return res.status(400).json({
          status: "fail",
          message: "Couldn't update. Recipe not found.",
        });
      }
  
      res.status(200).json({
        status: "success",
        message: "Recipe updated successfully",
        data: updatedRecipe,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  
  // Get Recipe by ID
  exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
      const recipeById = await getRecipeByIdService(id);
  
      res.status(200).json({
        status: "success",
        data: recipeById,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  
  // Get Specific Recipe
  exports.getSpecificRecipes = async (req, res) => {
    const page = +req.query?.page;
    const size = +req.query?.size;
    const fieldName = req.query?.fieldName;
    const fieldValue = req.query?.fieldValue;
    const fieldName2 = req.query?.fieldName2;
    const fieldValue2 = req.query?.fieldValue2;
    const fieldName3 = req.query?.fieldName3;
    const fieldValue3 = req.query?.fieldValue3;
  
    try {
      const recipes = await Recipe.find({
        $and: [
          { [fieldName]: { $eq: fieldValue } },
          { [fieldName2]: { $eq: fieldValue2 } },
          { [fieldName3]: { $eq: fieldValue3 } },
        ],
      })
        .skip(page * size)
        .limit(size);
  
      const total = await Recipe.countDocuments({
        $and: [
          { [fieldName]: { $eq: fieldValue } },
          { [fieldName2]: { $eq: fieldValue2 } },
          { [fieldName3]: { $eq: fieldValue3 } },
        ],
      });
  
      res.status(200).json({
        status: "success",
        data: recipes,
        total: total,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };
  exports.getTotalRecipes = async (req, res) => {
    try {
      const totalRecipes = await getTotalRecipesService();
      res.status(200).json({
        status: "success",
        total: totalRecipes,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error: error.message || "Internal server error",
      });
    }
  };