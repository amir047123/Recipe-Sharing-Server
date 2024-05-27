const express = require("express");
const app = express();
const cors = require("cors");

const recipeRoutes = require("./routes/recipe.route");
const userRoutes = require("./routes/user.route");
const paymentRoutes = require("./routes/payment.route");
const { verifyJwt } = require("./Hooks/verifyJwt");
const { createRecipe, getRecipes } = require("./controllers/recipe.controller");
const reactionRoutes = require('./routes/reaction.route');


// middleware

app.use(express.json());
app.use(cors());


// api
app.use("/api/v1/recipes", recipeRoutes);
app.post("/api/v1/recipes/addRecipes",verifyJwt, createRecipe);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use('/api/v1/reactions', reactionRoutes);

  
// Mother route
app.get("/", (req, res) => {
  res.send(
    `<h1 style="color:#00ff00;font-size:62px; text-align:center;margin-top:200px">" Recipe Sharing database is running</h1>`
  );
});
  
  module.exports = app;
  