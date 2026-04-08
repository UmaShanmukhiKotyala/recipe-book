let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let currentIndex = null;

// DISPLAY
function displayRecipes(list = recipes) {
  let recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";

  list.forEach((recipe, index) => {
    recipeList.innerHTML += `
      <div class="recipe" onclick="openModal(${index})">
        <img src="${recipe.image}" class="recipe-img"
        onerror="this.src='https://via.placeholder.com/300x150'">
        <h3>${recipe.title}</h3>
      </div>`;
  });

  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// ADD / UPDATE
function addRecipe() {
  let title = document.getElementById("title").value;
  let ingredients = document.getElementById("ingredients").value;
  let steps = document.getElementById("steps").value;
  let image = document.getElementById("image").value;

  if (!title || !ingredients || !steps || !image) {
    alert("Fill all fields 😐");
    return;
  }

  recipes.push({ title, ingredients, steps, image });

  displayRecipes();

  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("steps").value = "";
  document.getElementById("image").value = "";
}

// OPEN MODAL
function openModal(index) {
  currentIndex = index;
  let recipe = recipes[index];

  document.getElementById("modalTitle").innerText = recipe.title;
  document.getElementById("modalImg").src = recipe.image;

  document.getElementById("modalIngredients").innerHTML =
    recipe.ingredients.replace(/\n/g, "<br>");

  document.getElementById("modalSteps").innerHTML =
    recipe.steps.replace(/\n/g, "<br>");

  document.getElementById("recipeModal").style.display = "block";
}

// CLOSE MODAL
function closeModal() {
  document.getElementById("recipeModal").style.display = "none";
}

// DELETE
function deleteRecipe() {
  recipes.splice(currentIndex, 1);
  closeModal();
  displayRecipes();
}

// EDIT
function editRecipe() {
  let recipe = recipes[currentIndex];

  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("steps").value = recipe.steps;
  document.getElementById("image").value = recipe.image;

  recipes.splice(currentIndex, 1);

  closeModal();
  displayRecipes();
}

// SEARCH
function searchRecipe() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(value)
  );

  displayRecipes(filtered);
}

// LOAD
displayRecipes();