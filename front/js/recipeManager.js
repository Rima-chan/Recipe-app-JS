
function getRecipes() {
    const recipes = localStorage.getItem('myRecipes');
    if (!recipes) {
        return [];
    } else {
        return JSON.parse(recipes);
    }
}

function saveRecipes(list) {
    localStorage.setItem('myRecipes', JSON.stringify(list));
}

function removeRecipe(id) {
    let recipes = getRecipes();
    recipes = recipes.filter(recipe => recipe.id !== parseInt(id, 10));
    saveRecipes(recipes);
}

function removeFromFavorites(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(favorite => favorite.id !== parseInt(id, 10));
    saveFavorites(favorites);
}

function displayRecipe(recipes, wrapper, link) {
    recipes.forEach(recipe => {
        const template = `<div class="flex flex-col w-60 h-auto rounded-md shadow-lg sm:m-4" id="${recipe.id}">
                            <img src="${recipe.image}" class="w-full h-1/2 object-cover">
                            <div class="flex-1 p-3">
                                <div class="w-full flex justify-between">
                                    <h3 class="uppercase text-lg font-bold pb-2">${recipe.title}</h3>
                                    <button class="bg-gradient-to-tr from-pink-500 to-purple-600 bg-clip-text text-transparent font-extrabold" type="button" aria-label="Like button">
                                        <i class="${recipe.liked ? 'fas' : 'far'} fa-heart text-3xl font-semibold" data-button="like-button_${recipe.id}" data-type="my_favorite"></i>
                                    </button>
                                </div>
                                <p class="uppercase font-semibold text-sm">${recipe.ingredients ? 'Ingredients' : ''}</p>
                                <p class="text-gray-600 pb-2 truncate">${recipe.ingredients ? recipe.ingredients : ''}</p>
                                <p class="uppercase font-semibold text-sm">${recipe.description ? 'Description' : ''}</p>
                                <p class="text-gray-600 truncate">${recipe.description ? recipe.description : ''}</p>
                            </div>
                            <a href="${link}?id=${recipe.id}" class="uppercase text-yellow-500 hover:text-yellow-700 transition-colors duration-150 ease-linear font-semibold text-sm flex-shrink-0 cursor-pointer pl-3 pb-3">See more...</a>
                        </div>`;
        wrapper.insertAdjacentHTML('afterbegin', template);
    });
}

function displayNoResults(wrapper) {
    const template = '<div>No recipes found 🤷</div>';
    wrapper.insertAdjacentHTML('afterbegin', template);
}

function displayLimits(error, wrapper) {
    const template = `<div class="m-1">
                        <p class="pb-3">Sorry it doesn\'t worked 🤷</p>
                        <p class="text-sm">More details : ${error}</p>                    
                    </div>`;
    wrapper.insertAdjacentHTML('afterbegin', template);
}

async function getSearchedRecipes(search) {
    const host = getApiUrl()
    const url = `${host}/recipe/search/${search}`;
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch(e) {
        console.log(e);
        return e;
    }
}

async function getRecipeById(id) {
    const host = getApiUrl();
    const url = `${host}/recipe/${id}`;
    console.log(id)
    try {
        const result = await fetch(url);
        const data = await result.json();
        console.log(data)
        return data;
    } catch(e) {
        console.log(e);
        return e;
    }
}