const searchWrapper = document.querySelector('#search_results');
const noResultsWrapper = document.querySelector('#no_results');
const searchButton = document.querySelector('#search_button');
let recipes = [];

// Like button
searchWrapper.addEventListener('click', (e) => {
    if (e.target.dataset.button) {
        const id = e.target.dataset?.button.split('_')[1];
        const recipe = recipes.filter(element => element.id === parseInt(id, 10));
        toggleIcon(e);
        handleFavorites(id, recipe[0]);
    }
});

searchButton.addEventListener('click', async (e) => {
    document.querySelector('#load_wrapper').classList.remove('hidden');
    document.querySelector('#load_wrapper').classList.add('flex');
    const input = document.querySelector('#search');
    try {
        if (!input.value) {
            return;
        } else {
            const data = await getSearchedRecipes(input.value);
            console.log(data)
            if (data.results && data.results.length > 0) {
                displaySearchResults(data.results);
            } else if (data.status && data.status === 'failure') {
                displayLimits(data.message, recipeWrapper);
            } else if (data.results.length === 0) {
                displayNoResults(noResultsWrapper);
            }
        }
    } catch(err) {
        console.log(err);
    } finally {
        document.querySelector('#load_wrapper').classList.remove('flex');
        document.querySelector('#load_wrapper').classList.add('hidden');
    }
});

function displaySearchResults(list) {
    list.forEach(recipe => {
        const favorite = isFavorite(recipe.id);
        const template = `<div class="flex flex-col w-60 h-auto rounded-md shadow-lg m-4" id="${recipe.id}">
                            <img src="${recipe.image}" class="w-full h-1/2 object-cover">
                            <div class="flex-1 p-3">
                                <div class="w-full flex justify-between">
                                    <h3 class="uppercase text-lg font-bold pb-2">${recipe.title}</h3>
                                    <button class="bg-gradient-to-tr from-pink-500 to-purple-600 bg-clip-text text-transparent font-extrabold" type="button" aria-label="Like button">
                                        <i class="${favorite ? 'fas' : 'far'} fa-heart text-3xl font-semibold" data-button="like-button_${recipe.id}" data-type="search_favorite"></i>
                                    </button>
                                </div>
                            </div>
                            <a href="../recipe/recipe.html?id=${recipe.id}" class="uppercase text-yellow-500 hover:text-yellow-700 transition-colors duration-150 ease-linear font-semibold text-sm flex-shrink-0 cursor-pointer pl-3 pb-3">See more...</a>
                        </div>`;
        Object.defineProperty(recipe, 'liked', {
            value: favorite,
            writable: true,
            enumerable: true,
        });
        recipes.push(recipe);
        searchWrapper.insertAdjacentHTML('afterbegin', template);
    });
}
