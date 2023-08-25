import "./style.css";

const reverseButton = document.querySelector("#reverse-button");
const form = document.querySelector("form");
const input = document.querySelector("#input-todo");
const ul = document.querySelector("ul");

let reverseMode = false;
reverseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  reverseButton.innerHTML = `Ma Liste de tâches ${
    reverseMode
      ? "<i class='fa-solid fa-arrow-down-1-9 fa-reverse'></i>"
      : "<i class='fa-solid fa-arrow-down-9-1 fa-reverse'></i>"
  }`;
  toggleReverse();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const addTodo = (text) => {
  text = text.trim();
  const textInfoRule = document.querySelector("#text-info-input");
  if (text.length > 4 && text.length < 101) {
    textInfoRule.classList.remove("invalid");
    textInfoRule.classList.add("invisible");
    todos.push({
      text: `${text[0].toUpperCase()}${text.slice(1)}`,
      done: false,
      effect: false,
      check: false,
      editMode: false,
      add: true,
      success: false,
      failure: false,
      rule: false,
      update: false,
      warning: false,
      cancel: false,
      deleteMode: false,
      delete: false,
    });
    displayTodo();
  } else {
    textInfoRule.classList.remove("invisible");
    textInfoRule.classList.add("invalid");
    textInfoRule.innerHTML =
      "Le champs doit contenir entre 5 et 100 caractères.";
    setTimeout(() => {
      textInfoRule.classList.remove("invalid");
      textInfoRule.classList.add("invisible");
    }, 5000);
  }
};

const todos = [
  {
    text: "Je suis la Todo numéros 1",
    done: false,
    effect: false,
    check: false,
    editMode: false,
    add: false,
    success: false,
    failure: false,
    rule: false,
    update: false,
    warning: false,
    cancel: false,
    deleteMode: false,
    delete: false,
  },
  {
    text: "Je suis la Todo numéros 2",
    done: false,
    effect: false,
    check: false,
    editMode: false,
    add: false,
    success: false,
    failure: false,
    rule: false,
    update: false,
    warning: false,
    cancel: false,
    deleteMode: false,
    delete: false,
  },
];

const displayTodo = () => {
  const todosElement = todos.map((todo, index) => {
    if (!todo.editMode) {
      if (todo.deleteMode) {
        return deleteTodoElement(todo, index);
      } else {
        return createTodoElement(todo, index);
      }
    } else {
      return createTodoEditElement(todo, index);
    }
  });
  if (reverseMode) {
    ul.innerHTML = "";
    todosElement.reverse();
    ul.append(...todosElement);
  } else {
    ul.innerHTML = "";
    ul.append(...todosElement);
  }
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = ` 
    <fieldset>
      <legend class="title-todo">
        Ma tâche n°<span class="number">${index + 1}</span> :
      </legend>
      <div class="container-done-text-todo-check">
        <span class="${todo.done ? "done" : "todo"}"> ${
    todo.done ? "ok" : index + 1
  }</span> 
        <div class="container-text-todo">
          <p class="text-todo ${todo.effect ? "effect" : ""}">${todo.text}</p>
        </div>
        <span>${
          todo.check
            ? "<i id='check-button' class='fa-regular fa-square-check'></i>"
            : "<i id='check-button' class='fa-regular fa-square'></i>"
        }</span>
      </div>
      <div class="container-text-info">
        <small id="text-info-add" class="invisible">${
          todo.add ? "Nouvelle Todo ajouté." : ""
        }</small>
        <small id="text-info-success" class="invisible">${
          todo.success
            ? "Bravo, la Todo a été accompli <i class='emojis fa-regular fa-face-laugh-beam'></i>"
            : ""
        }</small>
        <small id="text-info-failure" class="invisible">${
          todo.failure
            ? "Mince, la Todo n'a pas été accompli <i class='emojis fa-regular fa-face-sad-tear'></i>"
            : ""
        }</small>
        <small id="text-info-update" class="invisible"> ${
          todo.update ? "La Todo a été mise à jour avec succès." : ""
        }</small>
        <small id="text-info-cancel" class="invisible">${
          todo.cancel ? "Modification en cours annulé." : ""
        }</small>
        <small id="text-info-delete" class="invisible">${
          todo.delete ? "Suppression en cours annulé." : ""
        }</small>
      </div>
      <div class="container-button">
        <button id="edit-button" class="button">Editer</button>
        <button id="delete-button" class="button">Supprimer</button>
      </div>
    </fieldset>
  `;
  const editButton = li.querySelector("#edit-button");
  editButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  const deleteButton = li.querySelector("#delete-button");
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleDeleteMode(index);
  });
  const checkButton = li.querySelector("#check-button");
  checkButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleTodo(index);
  });

  const textInfoAdd = li.querySelector("#text-info-add");
  const textInfoSuccess = li.querySelector("#text-info-success");
  const textInfoFailure = li.querySelector("#text-info-failure");
  const textInfoUpdate = li.querySelector("#text-info-update");
  const textInfoCancel = li.querySelector("#text-info-cancel");
  const textInfoDelete = li.querySelector("#text-info-delete");

  if (todo.add) {
    textInfoAdd.classList.add("valid");
    textInfoAdd.classList.remove("invisible");
    todo.add = false;
    setTimeout(() => {
      textInfoAdd.classList.remove("valid");
      textInfoAdd.classList.add("invisible");
    }, 2000);
  }

  if (todo.check) {
    if (!todo.editMode) {
      todo.failure = false;
      todo.success = false;
      todo.cancel = false;
      textInfoSuccess.classList.add("valid");
      textInfoSuccess.classList.remove("invisible");
      setTimeout(() => {
        textInfoSuccess.classList.remove("valid");
        textInfoSuccess.classList.add("invisible");
      }, 2000);
    }
  } else {
    todo.success = false;
    todo.failure = false;
    todo.cancel = false;
    textInfoFailure.classList.add("invalid");
    textInfoFailure.classList.remove("invisible");
    setTimeout(() => {
      textInfoFailure.classList.remove("invalid");
      textInfoFailure.classList.add("invisible");
    }, 2000);
  }

  if (!todo.editMode) {
    if (todo.update) {
      todo.cancel = false;
      todo.update = false;
      todo.warning = false;
      textInfoUpdate.classList.add("valid");
      textInfoUpdate.classList.remove("invisible");
      setTimeout(() => {
        textInfoUpdate.classList.remove("valid");
        textInfoUpdate.classList.add("invisible");
      }, 2000);
    } else {
      textInfoCancel.classList.add("invalid");
      textInfoCancel.classList.remove("invisible");
      setTimeout(() => {
        textInfoCancel.classList.remove("invalid");
        textInfoCancel.classList.add("invisible");
      }, 2000);
    }
  }

  if (!todo.deleteMode) {
    if (todo.delete) {
      todo.delete = false;
      textInfoDelete.classList.add("info");
      textInfoDelete.classList.remove("invisible");
      setTimeout(() => {
        textInfoDelete.classList.remove("invalid");
        textInfoDelete.classList.add("info");
      }, 2000);
    }
  }
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <fieldset>
    <legend >
      Ma tâche n°<span class="number">${index + 1}</span> :
    </legend>
    <div class="container-edit-text-todo-input">
      <span class="todo">${index + 1}</span> 
      <input type="text" />
    </div>
    <div
    <div class="container-text-info-input">
      <small class="text-info-input"></small>
    </div>
    <div class="container-text-info">
      <small id="text-info-warning" class="invisible">${
        todo.warning
          ? "Veuillez modifier la Todo ou <span class='invalid'>Annuler</span>."
          : ""
      }</small>
    </div>
    <div class="container-button">
      <button id="save-button" class="button">Sauvegarder</button>
      <button id="cancel-button" class="button">Annuler</button>
    </div>
  </fieldset>
  `;
  const input = li.querySelector("input");
  input.value = todo.text;
  const saveButton = li.querySelector("#save-button");
  saveButton.addEventListener("click", (event) => {
    if (input.value.length > 4 && input.value.length < 101) {
      if (input.value != todo.text) {
        editTodo(index, input);
      } else {
        const textInfoWarning = li.querySelector("#text-info-warning");
        textInfoWarning.classList.add("info");
        textInfoWarning.classList.remove("invisible");
        setTimeout(() => {
          textInfoWarning.classList.remove("info");
          textInfoWarning.classList.add("invisible");
        }, 2000);
      }
    } else {
      const textInfoRuleEditMode = li.querySelector("#text-info-input");
      textInfoRuleEditMode.classList.remove("invisible");
      textInfoRuleEditMode.classList.add("invalid");
      textInfoRuleEditMode.innerHTML =
        "Le champs doit contenir entre 5 et 100 caractères.";
      setTimeout(() => {
        textInfoRuleEditMode.classList.remove("invalid");
        textInfoRuleEditMode.classList.add("invisible");
      }, 3000);
    }
  });
  const cancelButton = li.querySelector("#cancel-button");
  cancelButton.addEventListener("click", (event) => {
    toggleEditMode(index);
  });
  return li;
};

const deleteTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.innerHTML = `<fieldset>
  <legend>
    Ma tâche n°<span class="number">${index + 1}</span> :
  </legend>
  <div class="container-delete-question">
    <p class="delete-question">Êtes-vous sûr de vouloir <span class="invalid">supprimer</span> la <strong>Todo</strong> n°<span class="number">${
      index + 1
    }</span> ? </p>
  </div>
  <div
  <div class="container-button">
    <button id="yes-button" class="button">Oui</button>
    <button id="no-button" class="button">Non</button>
  </div>
</fieldset>`;

  const yesButton = li.querySelector("#yes-button");
  yesButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteTodo(index);
  });
  const noButton = li.querySelector("#no-button");
  noButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleDeleteMode(index);
  });
  return li;
};

const toggleReverse = () => {
  reverseMode = !reverseMode;
  displayTodo();
};

const toggleTodo = (index) => {
  todos[index].done = !todos[index].done;
  todos[index].effect = !todos[index].effect;
  todos[index].check = !todos[index].check;
  todos[index].success = !todos[index].success;
  todos[index].failure = !todos[index].failure;
  displayTodo();
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  todos[index].cancel = !todos[index].cancel;
  todos[index].warning = !todos[index].warning;
  todos[index].update = !todos[index].update;
  todos[index].cancel = true;
  todos[index].success = false;
  todos[index].failure = false;
  displayTodo();
};

const toggleDeleteMode = (index) => {
  todos[index].deleteMode = !todos[index].deleteMode;
  todos[index].delete = true;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].done = false;
  todos[index].effect = false;
  todos[index].check = false;
  todos[index].editMode = false;
  displayTodo();
};

const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

displayTodo();
