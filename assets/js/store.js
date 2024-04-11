async function storeRecipesLocally() {
  try {
    if (!localStorage.getItem("recipes")) {
      const response = await fetch("./updated_recipes.json");
      const recipes = await response.json();
      console.log(recipes);
      localStorage.setItem("recipes", JSON.stringify(recipes.recettes));
      console.log("yuyuy");
      return recipes.recettes;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error storing recipes locally:", error);
    return [];
  }
}

storeRecipesLocally();
