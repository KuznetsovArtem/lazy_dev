/**
 * Created by Artem on 31.01.14.
 */
var mongoose = rquire('mongoose');

var recipeSchema = new mongoose.schema({
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

var recipe = mongoose.schema('recipe', recipeSchema);
