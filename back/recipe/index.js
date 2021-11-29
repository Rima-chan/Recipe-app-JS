require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const fetchRecipes = async(searchText) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_RECIPE_KEY}&query=${searchText}&number=10`;
    try {
        const result = await axios({
            method: 'get',
            url: url
        });
        const response = await result.data;
        return response;
    } catch (e) {
        return {error: e.stack};
    }
}

const fetchRecipeById = async(id) => {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_RECIPE_KEY}`;
    try {
        const result = await axios({
            method: 'get',
            url: url
        });
        const response = await result.data;
        return response;
    } catch(e) {
        return {error: e.stack};
    }
}


router.get('/search/:searchText', async(req, res) => {
    const searchText = req.params.searchText;
    const data = await fetchRecipes(searchText);
    return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = await fetchRecipeById(id);
    return res.status(200).json(data);
})

module.exports = router;