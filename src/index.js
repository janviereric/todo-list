import "./style.css";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Je suis la Todo numéros 1",
    done: false,
    check: false,
    editMode: false,
  },
  {
    text: "Je suis la Todo numéros 2",
    done: false,
    check: false,
    editMode: false,
  },
];

const displayTodo = () => {
  const todosElement = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosElement);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = ` 
  <fieldset class="container-todo">
  <legend class="title-todo">
    Ma tâche n°<span class="number">${index + 1}</span> :
  </legend>
  <div class="container-done-text-todo-check">
    <span class="${todo.done ? "done" : "todo"}"> ${
    todo.done ? "ok" : index + 1
  }</span> 
    <div class="container-text-todo">
      <p class="text-todo">${todo.text}</p>
    </div>
    <span>${
      todo.check
        ? "<i class='fa-regular fa-square-check'></i>"
        : "<i class='fa-regular fa-square'></i>"
    }</span>
  </div>
  <div class="container-edit-delete-button">
    <button class="edit-button">Editer</button>
    <button class="delete-button">Supprimer</button>
  </div>
</fieldset>
  `;
  const faRegular = li.querySelector(".fa-regular");
  faRegular.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  const editButton = li.querySelector(".edit-button");
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  const deleteButton = li.querySelector(".delete-button");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <fieldset class="container-edit-todo">
  <legend class="edit-title-todo">
    Ma tâche n°<span class="number">${index + 1}</span> :
  </legend>
  <div class="container-edit-text-todo">
    <span class="todo">${index + 1}</span> 
    <input type="text" />
  </div>
  <div class="container-save-cancel-button">
    <button class="save-button">Sauvegarder</button>
    <button class="cancel-button">Annuler</button>
  </div>
</fieldset>
  `;
  const input = li.querySelector("input");
  input.value = todo.text;
  const saveButton = li.querySelector(".save-button");
  saveButton.addEventListener("click", (event) => {
    editTodo(index, input);
  });
  const cancelButton = li.querySelector(".cancel-button");
  cancelButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  return li;
};

const addTodo = (text) => {
  text = text.trim();
  if (text) {
    todos.push({
      text,
      done: false,
      check: false,
    });
    displayTodo();
  }
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  todos[index].check = !todos[index].check;
  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

displayTodo();
