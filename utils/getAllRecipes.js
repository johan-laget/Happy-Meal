/**
 * Fetches a JSON file containing recipes, stores them in the local storage, and returns the recipes.
 * @returns {Promise<Array>} An array of recipes.
 */
async function storeRecipesLocally() {
  try {
    const response = await fetch("./updated_recipes.json");
    const recipes = await response.json();

    localStorage.setItem("recipes", JSON.stringify(recipes.recettes));

    return recipes.recettes;
  } catch (error) {
    console.error("Error storing recipes locally:", error);
    return [];
  }
}

storeRecipesLocally();
