let favoritesRecipes = [];

function handleFavorites(id, recipe) {
    let favorites = getFavorites();
    const isRecipe = (element) => element.id === parseInt(id, 10);
    const index = favorites.findIndex(isRecipe);
    if (index === -1) {
        favorites.push(recipe);
    } else if (index >= 0) {
        favorites = favorites.filter(element => element.id !== parseInt(id, 10));
    } 
    recipe.liked = !recipe.liked;
    console.log(recipe);
    const recipes = getRecipes();
    const indexOwnFavorite = recipes.findIndex(isRecipe);
    if (indexOwnFavorite >= 0) {
        recipes[indexOwnFavorite].liked = !recipes[indexOwnFavorite].liked;
        saveRecipes(recipes);
    }
    saveFavorites(favorites);
}


function toggleIcon(e) {
    e.target.classList.toggle('fas');
    e.target.classList.toggle('far');
}

function getFavorites() {
    const recipes = localStorage.getItem('favoritesRecipes');
    if (!recipes) {
        return [];
    } else {
        return JSON.parse(recipes);
    }
}

function saveFavorites(list) {
    localStorage.setItem('favoritesRecipes', JSON.stringify(list));
}

function removeRecipe(id) {
    let recipes = getRecipes();
    recipes = recipes.filter(recipe => recipe   .id !== parseInt(id, 10));
    saveRecipes(recipes);
}

function isFavorite(id) {
    const favorites = getFavorites();
    const isRecipeId = (element) => element.id === parseInt(id, 10);
    const index = favorites.findIndex(isRecipeId);
    if (index !== -1) {
        return true;
    } else {
        return false;
    }
}