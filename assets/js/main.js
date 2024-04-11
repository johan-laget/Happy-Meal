// document.addEventListener(
//   "DOMContentLoaded",
//   (e) => {
//     $("#input-datalist").autocomplete();
//   },
//   false
// );

function addItem(itemName, quantity) {
  const items = JSON.parse(localStorage.getItem("shoppingList")) || {};
  if (items[itemName]) {
    items[itemName] += quantity;
  } else {
    items[itemName] = quantity;
  }
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

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
console.log(recipes);

const galleryCardRecipies = document.querySelector("#recipies");

const createCardRecipie = ({
  id,
  nom,
  img,
  categorie,
  temps_preparation,
  ingredients,
  etapes,
}) => {
  const index = recipes.findIndex((recipe) => recipe.id === id);
  const divCard = document.createElement("div");
  divCard.className = "card col";
  divCard.style = "width: 18rem; height: 30rem;";

  // Create the button dynamically to handle the favorite logic
  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "btn btn-dark";
  favoriteButton.id = "btn-favorite";

  // Check if the recipe is a favorite and set the icon accordingly
  const icon = document.createElement("i");
  icon.className =
    recipes[index] && recipes[index].favorite ? "ri-star-fill" : "ri-star-line";
  favoriteButton.appendChild(icon);

  divCard.innerHTML = /*html*/ `
  <div class="d-flex justify-content-between p-3 align-items-center">
  <h5 class="card-nom">${nom}</h5>
</div>
<img src=${img} class="card-img-top" alt="..." class="d-block w-100" style="object-fit: cover;" height="200">
<div class="card-body">
  <div class="d-flex justify-content-between align-items-center">
      <p>categoriee: ${categorie}</p>
      <p><span class="me-2"><i class="ri-temps_preparation-line"></i></span>${temps_preparation}</p>
  </div>
  <button type="button" class="btn btn-dark position-absolute" data-bs-toggle="modal" style="bottom:1rem"
      data-bs-target="#${id}">Voir la recette</button>
</div>
                <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="#${id}"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-nom fs-5 me-3" id="exampleModalLabel">${nom}</h1>
                            <button type="button" class="btn btn-dark btn-sm"><i class="ri-star-line"></i></button>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card mb-3">
                                <img src=${img} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p>categoriee: ${categorie}</p>
                                        <p><span class="me-2"><i class="ri-temps_preparation-line"></i></span>${temps_preparation}</p>
                                    </div>
                                </div>
                            </div>
                            <h3>Liste des ingrédients</h3>
                            <ul>
                            ${ingredients
                              .map(
                                (ing) =>
                                  `<li>${ing.quantite} ${ing.nom} <span class="text-primary pointer add-item-button" value="${ing.nom}">Ajouter</span></li>`
                              )
                              .join("")}
                           
                            </ul>
                            <h3>Étapes de préparation</h3>
                            <ol>
                            ${etapes
                              .map((etape) => `<li>${etape}</li>`)
                              .join("")}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
  `;
  divCard.prepend(favoriteButton);

  favoriteButton.addEventListener("click", () => {
    const recipes = JSON.parse(localStorage.getItem("recipes"));

    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index !== -1) {
      recipes[index].favorite = !recipes[index].favorite;
      console.log(recipes[index].favorite);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      if (recipes[index].favorite) {
        favoriteButton.innerHTML = '<i class="ri-star-fill"></i>';
      } else {
        favoriteButton.innerHTML = '<i class="ri-star-line"></i>';
      }
    }
  });

  // Append the whole card to the gallery
  galleryCardRecipies.appendChild(divCard);

  divCard.querySelectorAll(".add-item-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      addItem(btn.getAttribute("value"), 1);
      console.log(btn.getAttribute("value"));
    });
  });
};

const getValueJson = async (url) => {
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data;
};

const clearContent = () => {
  galleryCardRecipies.innerHTML = ""; // Clear existing recipes
};

const renderPage = (recipies, pageNum, recipesPerPage) => {
  clearContent();
  const start = (pageNum - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  recipies.slice(start, end).forEach(createCardRecipie);
};

const setupPagination = (recipies, numOfPages, recipesPerPage) => {
  const paginationContainer = document.querySelector(".pagination");
  clearContent(); // Make sure to clear before setting up new pagination

  for (let i = 1; i <= numOfPages; i++) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${i === 1 ? "active" : ""}`; // Mark the first page as active initially
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.className = "page-link";
    pageLink.textContent = i;
    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".page-item")
        .forEach((item) => item.classList.remove("active"));
      pageItem.classList.add("active");
      renderPage(recipies, i, recipesPerPage);
    });
    pageItem.appendChild(pageLink);
    paginationContainer.appendChild(pageItem);
  }

  // Render the first page initially
  renderPage(recipies, 1, recipesPerPage);
};

const appendCardRecipies = async () => {
  const fetchRecipies = await getValueJson(
    "http://127.0.0.1:5500/updated_recipes.json"
  );
  const recipies = fetchRecipies.recettes;
  const recipesPerPage = 9; // Define how many recipes you want per page
  const numOfPages = Math.ceil(recipies.length / recipesPerPage); // Calculate the number of pages

  setupPagination(recipies, numOfPages, recipesPerPage); // Setup pagination
};

appendCardRecipies();
