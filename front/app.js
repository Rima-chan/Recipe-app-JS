const myRecipesWrapper = document.querySelector('#recipes_wrapper');
const recipes = getRecipes();

document.addEventListener('DOMContentLoaded', () => {
    displayRecipe(recipes, myRecipesWrapper);   
});

myRecipesWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.button) {
        const id = e.target.dataset?.button.split('_')[1];
        const recipe = recipes.filter(element => element.id === parseInt(id, 10));
        toggleIcon(e);
        handleFavorites(id, recipe[0]);
    }
})

