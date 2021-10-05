import Category from "./category.js";
import Todo from "./todo.js";

window.ToDoApp = {
  categories: []
};

// Used to allow the scroll wheel to scroll horizontally
document.addEventListener("wheel", function(evt) {
    evt.preventDefault();
    document.documentElement.scrollLeft += evt.deltaY;
});

// When a category title is input the input is cleared and a new category with that title is added to the apps list of categories, the app then redraws
$("#category-input").on("keyup", function(evt)  {
  if (evt.key === "Enter") {
    let newCategory = new Category($(this).val());
    $(this).val("");
    ToDoApp.categories.push(newCategory);
    redraw();
  }
});

// Use this type of listener to allow dynamic HTML
$(document).on("keyup", ".todo-input", function(evt) {
  if (evt.key === "Enter") {
    ToDoApp.categories[$(this).parents(".category").data("category-index")].addTodo($(this).val());
    $(this).val("");
    redraw();
  }
});

// Uses helper function in Todo class to toggle associated state
$(document).on("click", ".todo-completed", function() {
  let todo = $(this).parent();
  ToDoApp.categories[todo.parent().data("category-index")].todos[todo.data("index")].toggleCompleted();
  redraw();
});

$(document).on("click", ".todo-prioritised", function() {
  let todo = $(this).parent();
  ToDoApp.categories[todo.parent().data("category-index")].todos[todo.data("index")].togglePrioritised();
  redraw();
});

// Redraws dynamic part of app to prevent dead html and refreshes index binding of categories and their todos
function redraw() {
  $("#category-container").empty();
  // Using the entries() call to access both the value and its index in the array
  for (let [index, category] of ToDoApp.categories.entries()) {
    category.newIndex = index;
    category.refreshTodos();
    $("#category-container").append(category.html);
  }
}

// Add ability to delete Categories and associated reassign category index function

fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    let randomQuote = data[Math.floor(Math.random()*data.length)];
    if (randomQuote.author) {
      $("#quote").children("p").text(`"${randomQuote.text}"\n- ${randomQuote.author}`)
    } else {
      $("#quote").children("p").text(`"${randomQuote.text}"`);
    }
  });