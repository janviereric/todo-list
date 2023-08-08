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

const displayTodo = () => {
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
  <p class="container-text-todo">
    <span class="todo">${index + 1}</span> 
    <span class="${todo.done ? "done" : ""}"></span> 
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
  const faRegular = li.querySelector(".fa-regular");
  faRegular.addEventListener("click", (event) => {
    toggleTodo(index);
  });
  const deleteButton = li.querySelector(".delete-button");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
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
  displayTodo();
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

displayTodo();
