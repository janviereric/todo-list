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
  },
  {
    text: "Je suis la Todo numéros 2",
    done: true,
    check: true,
  },
  {
    text: "Je suis la Todo numéros 3",
    done: true,
    check: true,
  },
  {
    text: "Je suis la Todo numéros 4",
    done: true,
    check: true,
  },
  {
    text: "Je suis la Todo numéros 5",
    done: true,
    check: true,
  },
  {
    text: "Je suis la Todo numéros 6",
    done: true,
    check: true,
  },
  {
    text: "Je suis la Todo numéros 7",
    done: true,
    check: true,
  },
];

const diplayTodo = () => {
  const todosElement = todos.map((todo, index) => {
    return createTodoElement(todo, index);
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
  <p>
    <span class="${todo.done ? "done" : "todo"}"></span> 
    <span class="text-todo">${todo.text}</span>
    <span>${
      todo.check
        ? "<i class='fa-regular fa-square-check'></i>"
        : "<i class='fa-regular fa-square'></i>"
    }</span>
  </p>
  <div class="container-edit-delete-button">
    <button class="edit-button">Editer</button>
    <button class="delete-button">Supprimer</button>
  </div>
</fieldset>
  `;
  const buttonDelete = li.querySelector(".delete-button");
  buttonDelete.addEventListener("click", (event) => {
    deleteTodo(index);
  });
  return li;
};

const addTodo = (text) => {
  todos.push({
    text,
    done: false,
    check: false,
  });
  diplayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  diplayTodo();
};

diplayTodo();
