import { useState, useEffect } from "react";

/**
 * Fetches recipe data from a JSON file and updates the state with the fetched data.
 * @returns {Array} The fetched recipe data.
 */
function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    /**
     * Fetches recipe data from the JSON file.
     */
    const fetchRecipes = async () => {
      try {
        const response = await fetch("updated_recipes.json");
        const data = await response.json();
        setRecipes(data.recettes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  return recipes;
}

export default Recipes;
