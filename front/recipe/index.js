const recipeWrapper = document.querySelector('#recipe_wrapper');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const title = document.querySelector('h1');

// Check if own recipe or recipe issued from API spoonacular
const myRecipes = getRecipes();
const isRecipe = (element) => element.id === parseInt(id, 10);
const index = myRecipes.findIndex(isRecipe);

(async() => {
    document.querySelector('#load_wrapper').classList.add('flex');
    document.querySelector('#load_wrapper').classList.remove('hidden');
    try {
        if (index >= 0) {
            const recipe = myRecipes[index];
            title.textContent = recipe.title;
            displayMyRecipesInfos(recipe);
        } else {
            const data = await getRecipeById(id);
            if (data) {
                displayRecipeInfos(data);
                displayIngredients(data.extendedIngredients);
                displayInstructions(data.analyzedInstructions[0].steps);
            } else {
                displayNoResults(recipeWrapper);
            }
        }
    } catch(err) {
        console.log(err);
    } finally {
        document.querySelector('#load_wrapper').classList.remove('flex');
        document.querySelector('#load_wrapper').classList.add('hidden');
    }
})();


// Handle own recipe suppression
recipeWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.button && e.target.dataset.button === 'trash_button') {
        if (window.confirm('Do you want to delete this recipe ?')) {
            const favorites = getFavorites();
            const isFavorite = (element) => element.id === parseInt(id, 10);
            const index = favorites.findIndex(isFavorite);
            if (index >= 0) {
                removeFromFavorites(id);
            }
            removeRecipe(id);
            window.location.href = '../../index.html';
        } 
    }
})

function displayRecipeInfos(recipe) {
    title.textContent = recipe.title ? recipe.title : 'Recipe';
    const template = `<div id="${recipe.id}" class="flex flex-col w-full px-6">
                            <img src="${recipe.image}" class="self-center object-cover md:w-1/2 my-5">
                            <p class="text-sm pb-3">Quantity : ${recipe.servings} pers.</p>
                            <h2 class="uppercase font-semibold text-sm pb-2">Ingredients</h2>
                            <ul id="ingredients" class="list-disc list-inside text-sm pb-3">
                            </ul>
                            <h2 class="uppercase font-semibold text-sm pb-2">Instructions</h2>
                            <ul id="instructions" class="list-disc list-inside text-sm pb-8">
                            </ul>
                        </div>
                        `;
    recipeWrapper.insertAdjacentHTML('afterbegin', template);
}

function displayIngredients(ingredients) {
    ingredients.forEach(ingredient => {
        const template = `<li>${ingredient.name} : ${ingredient.amount} ${ingredient.unit}</li>`;
        document.querySelector('#ingredients').insertAdjacentHTML('beforeend', template);
    })
}

function displayInstructions(instructions) {
    instructions.forEach(instruction => {
        const template = `<li class="pb-1">${instruction.step}  ${instruction.length ? `(${instruction.length.number} ${instruction.length.unit})`  : '' }</li>`;
        document.querySelector('#instructions').insertAdjacentHTML('beforeend', template);
    })

}

function displayMyRecipesInfos(recipe) {
    const template = `<div id="${recipe.id}" class="flex flex-col flex-1 px-6">
                            <img src="${recipe.image}" class="self-center object-cover md:w-1/2 my-5">
                            <h2 class="uppercase font-semibold text-sm pb-2">Ingredients</h2>
                            <p class="mb-5">${recipe.ingredients}</p>
                            <h2 class="uppercase font-semibold text-sm pb-2">Instructions</h2>
                            <p>${recipe.description}</p>
                            <i class="fas fa-trash-alt text-2xl text-gray-600 cursor-pointer my-5" data-button="trash_button"></i>
                        </div>
                        `;
    recipeWrapper.insertAdjacentHTML('afterbegin', template);
}