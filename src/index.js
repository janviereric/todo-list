import "./style.css";

const ul = document.querySelector("ul");

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
  return li;
};

diplayTodo();