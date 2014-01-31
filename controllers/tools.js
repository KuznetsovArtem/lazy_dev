/**
 * Created by Artem on 31.01.14.
 */

// simple mongo model
var TestModel = require('../models/testDAO').TestDAO;
var RecipeModel = require('../models/recipe').RecipeDAO;

//require('../models/recipe');
//var mongoose = require('mongoose'),
//    Recipe = mongoose.model('Recipe');

var data = {
    name : "Artem"
}

function Tools(db) {

    var test = new TestModel(db);
    var recipe = new RecipeModel();

    this.addRecipe = function(req, res, next) {
        var randomNumber = (Math.random()+'').slice(-2);
        var recipeData = {
            title: "Recipe" + randomNumber,
            author: "Artem",
            ingredients: ['milk', 'beer', 'candy'],
            description: 'O_O'
        };
        recipe.addRecipe(recipeData, function(err) {
            if(err) throw err;
            return res.render('recipe', recipeData)
        });
    }

    this.addTestData = function(req, res, next) {
        var randomNumber = (Math.random()+'').slice(-2);
        var data = {
            "name" : "User" + randomNumber,
            "email": "user" + randomNumber + "@test.com",
            "date" : new Date()
        }
        test.addSomeData(data, function(err, data) {
            if(err) next(err);

            return res.render('data', data);
        });
    }

    this.showAllUsers = function(req, res, next) {
        test.getAllData(function(err, data) {
            if (err) next(err)

            return res.render('allData', {
                users: data
            })
        });
    }

    this.showMainPage = function(req, res, next) {
        res.render('index', data);
    }
}

module.exports.Tools = Tools;
