const RecipeApp = (function () {

  // ---------------- Recipe Data ----------------

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
            "Drain water"
          ]
        },
        "Add sauce and mix"
      ]
    },
    {
      id: 2,
      title: "Fried Rice",
      category: "Chinese",
      rating: 5,
      ingredients: ["Rice", "Vegetables", "Soy Sauce", "Oil"],
      steps: [
        "Heat oil",
        {
          text: "Prepare vegetables",
          substeps: [
            "Chop vegetables",
            "Saute for 5 minutes"
          ]
        },
        "Add rice and soy sauce"
      ]
    }
  ];

  // ---------------- State ----------------

  let searchText = "";
  let showFavoritesOnly = false;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // ---------------- DOM Elements ----------------

  const container = document.getElementById("recipe-container");
  const searchInput = document.getElementById("search-input");
  const favoritesCheckbox = document.getElementById("favorites-only");
  const counter = document.getElementById("recipe-counter");

  // ---------------- Render Recipes ----------------

  function renderRecipes() {

    const filtered = recipes.filter(recipe => {

      const matchesSearch =
        recipe.title.toLowerCase().includes(searchText) ||
        recipe.ingredients.some(ing =>
          ing.toLowerCase().includes(searchText)
        );

      const matchesFavorites =
        !showFavoritesOnly || favorites.includes(recipe.id);

      return matchesSearch && matchesFavorites;
    });

    container.innerHTML = "";

    filtered.forEach(recipe => {

      const isFavorite = favorites.includes(recipe.id);

      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <h3>${recipe.title}</h3>

        <button class="favorite-btn ${isFavorite ? "favorite" : ""}" 
                data-id="${recipe.id}">
          ♥
        </button>

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

    updateCounter(filtered.length);
  }

  // ---------------- Recursive Steps ----------------

  function renderSteps(stepsArray) {
    const ul = document.createElement("ul");

    stepsArray.forEach(step => {
      const li = document.createElement("li");

      if (typeof step === "string") {
        li.textContent = step;
      } else {
        li.textContent = step.text;
        if (step.substeps) {
          li.appendChild(renderSteps(step.substeps));
        }
      }

      ul.appendChild(li);
    });

    return ul;
  }

  function renderIngredients(ingredientsArray) {
    const ul = document.createElement("ul");

    ingredientsArray.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    return ul;
  }

  // ---------------- Counter ----------------

  function updateCounter(count) {
    counter.textContent =
      `Showing ${count} of ${recipes.length} recipes`;
  }

  // ---------------- Debounce ----------------

  function debounce(callback, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  }

  // ---------------- Event Handling ----------------

  function handleClick(event) {

    const id = parseInt(event.target.dataset.id);

    // Favorite toggle
    if (event.target.classList.contains("favorite-btn")) {

      if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
      } else {
        favorites.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderRecipes();
    }

    // Toggle Steps
    if (event.target.classList.contains("toggle-steps")) {

      const recipe = recipes.find(r => r.id === id);
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

    // Toggle Ingredients
    if (event.target.classList.contains("toggle-ingredients")) {

      const recipe = recipes.find(r => r.id === id);
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

  // ---------------- Init ----------------

  function init() {

    renderRecipes();

    container.addEventListener("click", handleClick);

    searchInput.addEventListener(
      "input",
      debounce((event) => {
        searchText = event.target.value.toLowerCase();
        renderRecipes();
      }, 300)
    );

    favoritesCheckbox.addEventListener("change", (event) => {
      showFavoritesOnly = event.target.checked;
      renderRecipes();
    });
  }

  return {
    init
  };

})();

document.addEventListener("DOMContentLoaded", RecipeApp.init);

