const recipesFromLocalStorage = getRecipesFromLocalStorage();
const recipiesDiv = document.getElementById("recipies");
function getRecipesFromLocalStorage() {
  try {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes) {
      const recipes = JSON.parse(storedRecipes);
      return recipes;
    } else {
      console.log("No recipes found in local storage.");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving recipes from local storage:", error);
    return [];
  }
}

const recipes = getRecipesFromLocalStorage();

function generateRecipeCard(id, title, imageUrl, category, duration) {
  const cardDiv = document.createElement("div");
  cardDiv.setAttribute("id", `${id}`);
  cardDiv.classList.add("card", "col");
  cardDiv.style.width = "18rem";
  cardDiv.style.height = "fit-content";
  cardDiv.draggable = true;

  cardDiv.addEventListener("dragstart", dragStartHandler);
  cardDiv.addEventListener("dragend", dragEndHandler);

  const cardHeaderDiv = document.createElement("div");
  cardHeaderDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "p-3",
    "align-items-center"
  );

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  const starButton = document.createElement("button");
  starButton.type = "button";
  starButton.classList.add("btn", "btn-dark");

  const index = recipesFromLocalStorage.findIndex((recipe) => recipe.id === id);
  if (recipes[index].favorite) {
    starButton.innerHTML = '<i class="ri-star-fill"></i>';
  } else {
    starButton.innerHTML = '<i class="ri-star-line"></i>';
  }
  starButton.addEventListener("click", () => {
    const recipes = JSON.parse(localStorage.getItem("recipes"));

    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index !== -1) {
      recipes[index].favorite = !recipes[index].favorite;
      console.log(recipes[index].favorite);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      if (recipes[index].favorite) {
        starButton.innerHTML = '<i class="ri-star-fill"></i>';
      } else {
        starButton.innerHTML = '<i class="ri-star-line"></i>';
      }
    }
  });

  cardHeaderDiv.appendChild(cardTitle);
  cardHeaderDiv.appendChild(starButton);

  const cardImage = document.createElement("img");
  cardImage.src = imageUrl;
  cardImage.classList.add("card-img-top");
  cardImage.alt = "...";

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body");

  const categoryDurationDiv = document.createElement("div");
  categoryDurationDiv.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  const categoryParagraph = document.createElement("p");
  categoryParagraph.textContent = `Categorie: ${category}`;

  const durationParagraph = document.createElement("p");
  durationParagraph.innerHTML = `<span class="me-2"><i class="ri-time-line"></i></span>${duration}`;

  categoryDurationDiv.appendChild(categoryParagraph);
  categoryDurationDiv.appendChild(durationParagraph);

  const viewRecipeButton = document.createElement("button");
  viewRecipeButton.type = "button";
  viewRecipeButton.classList.add("btn", "btn-dark");
  viewRecipeButton.dataset.bsToggle = "modal";
  viewRecipeButton.dataset.bsTarget = "#exampleModal";
  viewRecipeButton.textContent = "Voir la recette";

  cardBodyDiv.appendChild(categoryDurationDiv);
  cardBodyDiv.appendChild(viewRecipeButton);

  cardDiv.appendChild(cardHeaderDiv);
  cardDiv.appendChild(cardImage);
  cardDiv.appendChild(cardBodyDiv);

  return cardDiv;
}
