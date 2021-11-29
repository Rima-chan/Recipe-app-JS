let favoritesRecipes = [];

function handleFavorites(id, recipe) {
    let favorites = getFavorites();
    console.log(favorites);
    const isNotFavorite = favorites.every( element => element.id !== parseInt(id, 10));
    console.log(isNotFavorite);
    if (isNotFavorite) {
        favorites.push(recipe);
    } else if (!isNotFavorite) {
        favorites = favorites.filter(element => element.id !== parseInt(id, 10));
    } 
    recipe.liked = !recipe.liked;
    // For personnal recipes (added by user)
    const recipes = getRecipes();
    console.log(recipe);
    const indexOwnFavorite = recipes.findIndex(recipe => recipe.id === parseInt(id, 10));
    console.log(indexOwnFavorite)
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