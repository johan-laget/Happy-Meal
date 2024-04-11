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
var containerEl = document.getElementById("external-events");

const recipes = getRecipesFromLocalStorage();
recipes.forEach((recipe) => {
  if (recipe.favorite) {
    const div = document.createElement("div");
    div.className =
      "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event mb-3";
    const childDiv = document.createElement("div");
    childDiv.className = "fc-event-main";
    childDiv.innerHTML = `${recipe.nom}`;
    div.appendChild(childDiv);
    containerEl.appendChild(div);

    const deleteButton = document.createElement("span");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = "&#10006;";

    deleteButton.addEventListener("click", function () {
      const allRecipes = JSON.parse(localStorage.getItem("recipes"));
      const index = allRecipes.findIndex((r) => r.id === recipe.id);
      if (index !== -1) {
        allRecipes.splice(index, 1); // Remove the recipe from the array
        localStorage.setItem("recipes", JSON.stringify(allRecipes)); // Update local storage
        div.remove(); // Remove the recipe element from the DOM
      }
    });

    div.appendChild(deleteButton);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendar.Draggable;

  var calendarEl = document.getElementById("calendar");

  function getStoredEvents() {
    var storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  }

  function storeEvents(events) {
    localStorage.setItem("events", JSON.stringify(events));
  }

  var calendar = new Calendar(calendarEl, {
    initialView: "dayGridWeek",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: getStoredEvents(),
    editable: true,
    droppable: true,
    drop: function (info) {
      var event = {
        title: info.draggedEl.innerText,
        start: info.date,
        allDay: !info.allDay,
      };
      calendar.addEvent(event);
      storeEvents(
        calendar.getEvents().map(function (event) {
          return {
            title: event.title,
            start: event.start.toISOString(),
            allDay: event.allDay,
          };
        })
      );
    },
    eventClick: function (info) {
      if (confirm("Etes-vous sûre de vouloir supprimer ce repas ?")) {
        info.event.remove();
        var storedEvents = getStoredEvents();
        var updatedEvents = storedEvents.filter(function (storedEvent) {
          return !(
            storedEvent.title === info.event.title &&
            new Date(storedEvent.start).toISOString() ===
              info.event.start.toISOString() &&
            storedEvent.allDay === info.event.allDay
          );
        });
        storeEvents(updatedEvents);
      }
    },
  });

  calendar.render();

  var containerEl = document.getElementById("external-events");
  new Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });
});
