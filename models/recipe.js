/**
 * Created by Artem on 31.01.14.
 */
var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: String,
    author: String,
    ingredients: Array,
    description: String
});

recipeSchema.methods.findRecipeByIngredients = function(ingredients) {
    if(ingredients instanceof Array) {
        // got array of names
    } else if (typeof ingredients == 'string'){
        // got one
    } else {
       // got some object or fx
    }
}

var Recipe = mongoose.model('Recipe', recipeSchema);

function RecipeDAO() {

    this.addRecipe = function(recipeData, callback) {
        var recipe = new Recipe(recipeData);
        recipe.save(function(err) {
            callback(err);
        })
    }
}

module.exports.RecipeDAO = RecipeDAO;
