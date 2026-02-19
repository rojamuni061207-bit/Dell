const RecipeApp = (function () {

  const recipes = [
    {
      id: 1,
      title: "Pasta",
      category: "Italian",
      rating: 4,
      ingredients: ["Pasta", "Tomato Sauce", "Salt", "Garlic"],
      steps: [
        "Boil water",
        {
          text: "Cook pasta",
          substeps: [
            "Add pasta to boiling water",
            "Cook for 10 minutes",
            "Drain the water"
          ]
        },
        "Add sauce and mix well"
      ]
    },
    {
      id: 2,
      title: "Fried Rice",
      category: "Chinese",
      rating: 5,
      ingredients: ["Rice", "Vegetables", "Soy Sauce", "Oil"],
      steps: [
        "Heat oil in pan",
        {
          text: "Prepare vegetables",
          substeps: [
            "Chop vegetables",
            "Saute for 5 minutes"
          ]
        },
        "Add rice and soy sauce",
        "Cook for 3 minutes"
      ]
    }
  ];

  const container = document.getElementById("recipe-container");

  // Render Recipes
  function renderRecipes(recipeList) {
    container.innerHTML = "";

    recipeList.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>Category: ${recipe.category}</p>
        <p>Rating: ${recipe.rating}</p>
        <button class="toggle-steps" data-id="${recipe.id}">
          Show Steps
        </button>
        <button class="toggle-ingredients" data-id="${recipe.id}">
          Show Ingredients
        </button>
        <div class="steps hidden" id="steps-${recipe.id}"></div>
        <div class="ingredients hidden" id="ingredients-${recipe.id}"></div>
      `;

      container.appendChild(card);
    });
  }

  // 🔁 Recursive Function for Steps
  function renderSteps(stepsArray) {
    const ul = document.createElement("ul");

    stepsArray.forEach(step => {
      const li = document.createElement("li");

      if (typeof step === "string") {
        li.textContent = step;
      } else {
        li.textContent = step.text;

        if (step.substeps) {
          li.appendChild(renderSteps(step.substeps)); // recursion
        }
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // Render Ingredients
  function renderIngredients(ingredientsArray) {
    const ul = document.createElement("ul");

    ingredientsArray.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    return ul;
  }

  // Event Delegation
  function handleClick(event) {
    const id = event.target.dataset.id;

    if (event.target.classList.contains("toggle-steps")) {
      const recipe = recipes.find(r => r.id == id);
      const stepsDiv = document.getElementById(`steps-${id}`);

      if (stepsDiv.classList.contains("hidden")) {
        stepsDiv.innerHTML = "";
        stepsDiv.appendChild(renderSteps(recipe.steps));
        stepsDiv.classList.remove("hidden");
        event.target.textContent = "Hide Steps";
      } else {
        stepsDiv.classList.add("hidden");
        event.target.textContent = "Show Steps";
      }
    }

    if (event.target.classList.contains("toggle-ingredients")) {
      const recipe = recipes.find(r => r.id == id);
      const ingDiv = document.getElementById(`ingredients-${id}`);

      if (ingDiv.classList.contains("hidden")) {
        ingDiv.innerHTML = "";
        ingDiv.appendChild(renderIngredients(recipe.ingredients));
        ingDiv.classList.remove("hidden");
        event.target.textContent = "Hide Ingredients";
      } else {
        ingDiv.classList.add("hidden");
        event.target.textContent = "Show Ingredients";
      }
    }
  }

  function init() {
    renderRecipes(recipes);
    container.addEventListener("click", handleClick);
  }

  return {
    init
  };

})();

document.addEventListener("DOMContentLoaded", RecipeApp.init);
