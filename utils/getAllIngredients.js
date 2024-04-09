function getAllIngredients(allRecipes) {
  const ingredientsSet = new Set();

  // Iterate through each recipe and collect unique ingredients
  allRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.nom);
    });
  });

  return Array.from(ingredientsSet);
}

export default getAllIngredients;
