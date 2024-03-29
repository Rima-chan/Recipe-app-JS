const favoritesWrapper = document.querySelector('#favorites_wrapper');

// Display favorites stored in localStorage
document.addEventListener('DOMContentLoaded', () => {
    let favorites = getFavorites();
    displayRecipe(favorites, favoritesWrapper, '../recipe/recipe.html');
});

favoritesWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.button) {
        toggleIcon(e);
        const id = e.target.dataset?.button.split('_')[1];
        const favorites = getFavorites();
        const recipe = favorites.filter(element => element.id === parseInt(id, 10));
        console.log(recipe);
        handleFavorites(id, recipe[0]);
    }
})