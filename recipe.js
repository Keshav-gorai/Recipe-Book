const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipe_contaniner = document.querySelector('.recipe-container')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')
const recipeDetailsContent = document.querySelector('.recipe-details-content')

const fetchRecipes = async (api) => {
    recipe_contaniner.innerHTML= "Fetching Recipes....";
    const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${api}`)
    const response = await data.json();

recipe_contaniner.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src= "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `

        const button = document.createElement('button');
        button.textContent = "View recipe";
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        });



        recipe_contaniner.appendChild(recipeDiv);
    });

    
    // console.log(response.meals[0]);
    
}

// fetching ingredients

const fetchIngredients = (meal) => {
    let ingredientsList = "";

    for(let i =1; i<=20; i++ ){
        const ingredient = meal[`strIngredient${i}`]
        if (ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += `<li>${measure} , ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML  =`
       <h2>${meal.strMeal}</h2>
       <h3>Ingredients: </h3>
       <ul>${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}


recipeCloseBtn.addEventListener ('click', ()=> {
    recipeDetailsContent.parentElement.style.display = "none";
}
)
 searchBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    const searchinput = searchBox.value.trim();
    fetchRecipes(searchinput);
    // console.log("button clicked");
})

