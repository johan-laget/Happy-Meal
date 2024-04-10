function getRandomRecipes(allRecipes, n) {
  const shuffledRecipes = allRecipes.sort(() => 0.5 - Math.random());
  return shuffledRecipes.slice(0, n);
}
export default getRandomRecipes;
