// ===============================
// 1. Original Data (DO NOT MUTATE)
// ===============================

const recipes = [
  { id: 1, name: "Pasta Alfredo", difficulty: "Easy", time: 20 },
  { id: 2, name: "Chicken Biryani", difficulty: "Hard", time: 60 },
  { id: 3, name: "Grilled Sandwich", difficulty: "Easy", time: 10 },
  { id: 4, name: "Paneer Butter Masala", difficulty: "Medium", time: 40 },
  { id: 5, name: "Omelette", difficulty: "Easy", time: 5 },
  { id: 6, name: "Veg Fried Rice", difficulty: "Medium", time: 25 }
];

// ===============================
// 2. Application State
// ===============================

let state = {
  filter: "ALL",
  sort: "NONE"
};

// ===============================
// 3. Pure Filter Function
// ===============================

function filterRecipes(recipeList, filterType) {
  switch (filterType) {
    case "EASY":
      return recipeList.filter(recipe => recipe.difficulty === "Easy");

    case "MEDIUM":
      return recipeList.filter(recipe => recipe.difficulty === "Medium");

    case "HARD":
      return recipeList.filter(recipe => recipe.difficulty === "Hard");

    case "QUICK":
      return recipeList.filter(recipe => recipe.time < 30);

    case "ALL":
    default:
      return recipeList;
  }
}

// ===============================
// 4. Pure Sort Function
// ===============================

function sortRecipes(recipeList, sortType) {
  const copiedList = [...recipeList]; // Prevent mutation

  switch (sortType) {
    case "NAME":
      return copiedList.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "TIME":
      return copiedList.sort((a, b) =>
        a.time - b.time
      );

    case "NONE":
    default:
      return recipeList;
  }
}

// ===============================
// 5. Render Function
// ===============================

function renderRecipes(recipeList) {
  const container = document.getElementById("recipe-container");
  container.innerHTML = "";

  recipeList.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <p><strong>Time:</strong> ${recipe.time} mins</p>
    `;

    container.appendChild(card);
  });
}

// ===============================
// 6. Central Update Flow
// ===============================

function updateDisplay() {
  const filtered = filterRecipes(recipes, state.filter);
  const sorted = sortRecipes(filtered, state.sort);
  renderRecipes(sorted);
}

// ===============================
// 7. Filter Event Listeners
// ===============================

document.getElementById("filter-all").addEventListener("click", () => {
  state.filter = "ALL";
  updateDisplay();
});

document.getElementById("filter-easy").addEventListener("click", () => {
  state.filter = "EASY";
  updateDisplay();
});

document.getElementById("filter-medium").addEventListener("click", () => {
  state.filter = "MEDIUM";
  updateDisplay();
});

document.getElementById("filter-hard").addEventListener("click", () => {
  state.filter = "HARD";
  updateDisplay();
});

document.getElementById("filter-quick").addEventListener("click", () => {
  state.filter = "QUICK";
  updateDisplay();
});

// ===============================
// 8. Sort Event Listeners
// ===============================

document.getElementById("sort-name").addEventListener("click", () => {
  state.sort = "NAME";
  updateDisplay();
});

document.getElementById("sort-time").addEventListener("click", () => {
  state.sort = "TIME";
  updateDisplay();
});

// ===============================
// 9. Initial Render
// ===============================

updateDisplay();

