let submitBtn = document.querySelector(".submit");
let searchBox = document.querySelector(".searchBox");
let recipeContainer = document.querySelector(".recipe-container");
// let receipedetailSection = document.createElement(".recipe-detail-content");
let closeBtn = document.querySelector(".btn-close");
let recipeContentDiv = document.querySelector(".recipe-content");
let recipedetailDiv = document.querySelector(".recipe-detail");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const inputvalue = searchBox.value.trim();
  API(inputvalue);
});

const API = async (name) => {
  const url = `http://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetch(url);
  const response = await data.json();
  console.log(response);
  // const data = fetch(url)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //   });

  //   "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "8c91ff626fmsh02f0820900b3e88p189815jsn319b89410e9a",
  //     "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  //   },
  // };

  // const response = await fetch(url, options);
  // const result = await response.json();
  // console.log(result);
  // console.log(result.results[0]);

  // for (let i=0; i<meals.length;i++){
  //   let meal=meals[i]
  // }
  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    console.log(meal);
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
        <p>${meal.strCategory}</p>

        `;
    recipeContainer.appendChild(recipeDiv);
    const button = document.createElement("button");
    button.textContent = "Recipe Detail";
    recipeDiv.appendChild(button);

    button.addEventListener("click", function () {
      // const recipeDetailDiv = document.createElement("div");
      // recipeDetailDiv.classList.add("recipe-detail");
      console.log("button clicked");

      openRecipe(meal);
    });

    const openRecipe = (meal) => {
      console.log("inside openrecipe");

      let ingredientsList = "";
      for (let i = 0; i <= 20; i++) {
        const ingredients = meal[`strIngredient${i}`];
        if (ingredients) {
          const measurement = meal[`strMeasure${i}`];
          ingredientsList += `<li>  ${measurement}${ingredients}</li>`;
        } else {
          break;
        }
        return ingredientsList;

        // console.log(ingredients);
      }

      recipeContentDiv.innerHTML = `<h2 class="recipe-heading">${meal.strMeal}</h2>
      <h4 class="ingre-heading">Ingredients:</h4>
      <ul>${ingredientsList}</ul>
      <div>
      <h4 class="instr-heading">Instructions:</h4>
      <p>${meal.strInstructions}</p>
      </div>
      
            `;

      recipeContentDiv.parentElement.style.display = "block";
    };
    closeBtn.addEventListener("click", function () {
      recipeContentDiv.parentElement.style.display = "none";
    });
  });
};
