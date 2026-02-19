// -----------------------------
// Recipe data
// -----------------------------

const recipes = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    time: 20,
    difficulty: "easy",
    description: "Quick and creamy garlic butter pasta for busy evenings.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Vegetable Fried Rice",
    time: 25,
    difficulty: "easy",
    description: "Colorful stir-fried rice with fresh vegetables.",
    category: "rice"
  },
  {
    id: 3,
    title: "Paneer Butter Masala",
    time: 45,
    difficulty: "medium",
    description: "Rich and mildly spiced paneer curry in tomato gravy.",
    category: "curry"
  },
  {
    id: 4,
    title: "Grilled Chicken Wrap",
    time: 35,
    difficulty: "medium",
    description: "Healthy grilled chicken wrapped with fresh salad.",
    category: "wrap"
  },
  {
    id: 5,
    title: "Classic Veg Biryani",
    time: 70,
    difficulty: "hard",
    description: "Slow-cooked layered rice with aromatic spices.",
    category: "rice"
  },
  {
    id: 6,
    title: "Lasagna from Scratch",
    time: 90,
    difficulty: "hard",
    description: "Traditional layered lasagna with homemade sauce.",
    category: "pasta"
  },
  {
    id: 7,
    title: "Greek Salad Bowl",
    time: 15,
    difficulty: "easy",
    description: "Fresh salad with olives, feta and crunchy veggies.",
    category: "salad"
  },
  {
    id: 8,
    title: "Stuffed Bell Peppers",
    time: 60,
    difficulty: "medium",
    description: "Baked peppers stuffed with seasoned vegetables.",
    category: "baked"
  }
];

// -----------------------------
// DOM selection
// -----------------------------

const recipeContainer = document.querySelector("#recipe-container");

// -----------------------------
// Create a single recipe card
// -----------------------------

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// -----------------------------
// Render recipes
// -----------------------------

const renderRecipes = (recipesToRender) => {
  const cardsHTML = recipesToRender
    .map((recipe) => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = cardsHTML;
};

// -----------------------------
// Initialize app
// -----------------------------

renderRecipes(recipes);
