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
document.addEventListener("DOMContentLoaded", function () {
  var Draggable = FullCalendar.Draggable;

  var containerEl = document.getElementById("recipies");
  var calendarEl = document.getElementById("calendar");

  new Draggable(containerEl, {
    itemSelector: "card.col",
    eventData: function (eventEl) {
      // Access data from the dragged element
      const titleElement = eventEl.querySelector(".card-title");
      console.log(titleElement); // Log the title element to see if it's found
      const title = titleElement ? titleElement.textContent : "Untitled"; // If title element exists, get its text content, otherwise use a default value
      // Return the event data
      return {
        title: title,
      };
    },
  });

  var calendar = new FullCalendar.Calendar(calendarEl, {
    themeSystem: "bootstrap5",
    height: 400,
    initialView: "dayGridWeek",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
    },
    editable: true,
    droppable: true,
  });
  calendar.render();

  calendarEl.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  calendarEl.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });

  calendarEl.addEventListener("dragleave", function (e) {
    e.preventDefault();
  });

  calendarEl.addEventListener("drop", function (e) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    const recipe = recipes.find((recipe) => recipe.id == id);

    if (recipe) {
      console.log(e.target);

      // Create a new event on the calendar with the recipe information
      calendar.addEvent({
        title: recipe.title, // Use recipe title as event title
        start: dropDate, // Use drop date as event start date
        // You can add more properties like end, description, etc., based on your requirements
      });
    } else {
      console.log("Recipe not found.");
    }
  });
});

function generateRecipeCard(id, title, category, duration) {
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
  starButton.innerHTML = '<i class="ri-star-line"></i>';

  cardHeaderDiv.appendChild(cardTitle);
  cardHeaderDiv.appendChild(starButton);

  // const cardImage = document.createElement("img");
  // cardImage.src = imageUrl;
  // cardImage.classList.add("card-img-top");
  // cardImage.alt = "...";

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
  // cardDiv.appendChild(cardImage);
  cardDiv.appendChild(cardBodyDiv);

  return cardDiv;
}

function dragStartHandler(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.currentTarget.classList.add("dragging");
}

function dragEndHandler(event) {
  event.currentTarget.classList.remove("dragging");
}

const recipesFromLocalStorage = getRecipesFromLocalStorage();
const recipiesDiv = document.getElementById("recipies");
for (let i = 0; i < recipesFromLocalStorage.length; i++) {
  const recipe = recipesFromLocalStorage[i];
  recipiesDiv.appendChild(
    generateRecipeCard(
      recipe.id,
      recipe.nom,
      recipe.categorie,
      recipe.temps_preparation
    )
  );
}
