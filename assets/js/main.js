document.addEventListener(
  "DOMContentLoaded",
  (e) => {
    $("#input-datalist").autocomplete();
  },
  false
);

// Generer les recettes

const divRecipes = document.getElementById("recipies");

function createRecipie() {
  const div = document.createElement("div");
  div.className = "card col";
  div.innerHTML = `
    
    `;
}
