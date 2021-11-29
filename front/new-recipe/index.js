const form = document.querySelector('#new_recipe');
const uploadButton = document.querySelector('#img');
const preview = document.querySelector('#preview');
const success = document.querySelector('#success');

// Enable image preview
const loadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        console.log("ok")
        const img = document.createElement('img');
        img.classList.add('shadow-lg', 'w-48', 'h-48', 'object-cover', 'pt-5');
        img.setAttribute('src', reader.result);
        img.setAttribute('alt', 'Upload preview');
        preview.appendChild(img);
    };
    reader.readAsDataURL(e.target.files[0]);
}

// Handle recipe creation
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name');
    const ingredients = document.querySelector('#ingredients');
    const description = document.querySelector('#description');
    const file = document.querySelector('img');
    if (!file) {
        document.querySelector('#file_validation').innerHTML = 'Please add an image 🙂';
        setTimeout(() => {document.querySelector('#file_validation').innerHTML = ''}, 3000);
        return;
    }
    const recipe = {
        id: Date.now(),
        title: name.value,
        ingredients: ingredients.value,
        description: description.value,
        image: file.getAttribute('src'),
        liked: false,
    };
    const recipes = getRecipes();
    recipes.push(recipe);
    saveRecipes(recipes);
    name.value = '';
    ingredients.value = '';
    description.value = '';
    preview.classList.add('hidden');
    success.classList.remove('hidden');
    success.classList.add('flex');
})

// function getBase64Image(img) {
//     let canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.heigt;
//     let ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     let dataUrl = canvas.toDataURL("image/png");
//     return dataUrl.replace(/^data:image\/(png | jpg);base64,/, "");
// }