import { ToDoItem, count } from './toDoItem.js';
import { overlay, modal, modalThree, modalTwo } from './selectors.js';

const toDoListType = () => {
  let list;
  if (document.querySelector('.selected')) {
    list = document.querySelector('.selected').textContent;
  } else {
    list = document.querySelector('.list').value;
  }
  return list;
};

const usersInfo = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const date = document.querySelector('#due-date').value;
  const priority = document.querySelector('#priority').value;
  const notes = document.querySelector('#notes').value;
  const daysuntil = createTimeUntilTodo(date);
  const list = toDoListType();

  if (title === '' || list === '' || description === '' || date === '' || priority === '' || notes === '') {
    alert('Please fill in all fields');
    return;
  }
  const id = await postToDoFetch(title, list, description, date, priority, notes, daysuntil);

  generateToDoItem(title, list, description, date, priority, notes, id, daysuntil);
  removeModalAndOverlay();
  displayListNumber();
  document.querySelector('.selected').classList.remove('selected');
};

const postToDoFetch = async (title, list, description, date, priority, notes, daysuntil) => {
  let response = await fetch('/todo', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title,
      list,
      description,
      date,
      priority,
      notes,
      daysuntil,
    }),
  });

  let id = await response.json();

  return id;
};

const getAllToDosFromDBAndDisplayEach = async () => {
  let allToDos = await fetch('/allTodos', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  });
  allToDos = await allToDos.json();
  allToDos.forEach((todo) => {
    createToDoCategegory(todo);
  });
  trackingAnyNewCategoriesSelected();
  return allToDos;
};
getAllToDosFromDBAndDisplayEach();

const returnArrayOfToDosFromDB = async () => {
  let allToDos = await fetch('/allTodos', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
  });
  allToDos = await allToDos.json();

  return allToDos;
};

const generateToDoItem = (title, list, description, date, priority, notes, id, daysuntil) => {
  const toDoItem = new ToDoItem(title, list, description, date, priority, notes, id, daysuntil);
  createToDoCategegory(toDoItem);
  createTimeUntilTodo(toDoItem);
};

const createToDoCategegory = (toDoItem) => {
  const todoCategoryElement = `<div class="holdingList">
  <div class="listTypeModal ${toDoItem.list}">
  <div class="containerForMoreLists">
  <div class="list-name">${toDoItem.list}</div>
  <div class="btn-for-list-type">+</div></div>
  <div class="bottom-line2"></div>
</div>`;
  createToDoInfo(todoCategoryElement, toDoItem);
};

const createToDoInfo = (todoCategoryElement, toDoItem) => {
  const todoInfoElement = `
<div class="content-line details-btn" data-number=${toDoItem.id}>
<input data-index=${toDoItem.id} class="checkbox" type="checkbox">
<del class="strike"><p class="title-of-todo details-btn" data-number=${toDoItem.id} >${toDoItem.title}</p></del>
<div class="days-until-due" id="until-due" data-class="${toDoItem.id}">${toDoItem.daysuntil}</div>
</div>   `;
  addingCategoryNameAndTitleToModal(todoCategoryElement, todoInfoElement, toDoItem);
};

const addingCategoryNameAndTitleToModal = (todoCategoryElement, todoInfoElement, toDoItem) => {
  const todoCategoryName = document.querySelector(`.${toDoItem.list}`);

  if (todoCategoryName) {
    todoCategoryName.parentElement.insertAdjacentHTML('beforeend', todoInfoElement);
  } else {
    modal.insertAdjacentHTML('beforeend', todoCategoryElement + todoInfoElement);
  }
  modal.classList.remove('hidden');
};

const trackingAnyNewCategoriesSelected = () => {
  const btn = document.querySelector('.modal');
  btn.addEventListener('click', displayModalTwo);
};

const displayModalTwo = (e) => {
  if (e.target.classList.contains('btn-for-list-type')) {
    e.target.previousElementSibling.classList.add('selected');
    modalTwo.classList.remove('hidden');
    overlay.classList.remove('hidden');
    listOptionsDiv().classList.add('hidden');
    document.querySelector('#todo-form').reset();
  }
};

const listOptionsDiv = () => {
  return document.querySelector('.listOptionsDiv');
};

const removeModalAndOverlay = () => {
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
};

const detailsBtnClicked = (e) => {
  if (e.target.classList.contains('details-btn')) {
    getToDoItemThatsClicked(e);
  }
};

const getToDoItemThatsClicked = async (e) => {
  const todoClicked = await findSpecificTodo(e);
  checkIfToDoClickedIsAlreadyOnTheScreen(todoClicked);
  updateModals();
};

const updateModals = () => {
  const modalFour = document.querySelector('.modalFour');
  modal.classList.add('hidden');
  modalThree.classList.remove('hidden');
  modalFour.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const deletingTaskDetails = () => {
  const modalThree = document.querySelector('.modalThree');
  while (modalThree.lastElementChild) {
    modalThree.removeChild(modalThree.lastElementChild);
  }
};

const getDataNumberOfBtnClicked = (e) => {
  const dataNumberOfCurrentToDo = Number(e.target.getAttribute('data-number'));
  return dataNumberOfCurrentToDo;
};

const yearMonthDayFormat = (toDoItem) => {
  const dateObj = new Date(toDoItem.date);
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const newdate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');
  return newdate;
};

//refractor 

const getValuesFromToDoPlaceInInputElement = (toDoItem) => {
  let toDoItemValueInElement;
  deletingTaskDetails();

  for (let [key, value] of Object.entries(toDoItem)) {
    if (key === 'id' || key === 'list' || key === 'daysuntil') {
      continue;
    } else if (key === 'title') {
      toDoItemValueInElement = `<div class="task-details">Task Details</div><br>
     <input value-number=${toDoItem.id} value="${toDoItem.title}" class="user-content the-form" data-number=${toDoItem.id} ></input><br>`;
    } else if (key === 'description') {
      toDoItemValueInElement = `<input value-number=${toDoItem.id} value="${toDoItem.description}" class="user-content the-form" data-number=${toDoItem.id} ></input><br>`;
    } else if (key === 'priority' && value.toLowerCase() === 'high') {
      toDoItemValueInElement = `
     <select value-number=${toDoItem.id} class="user-content the-form" data-number=${toDoItem.id}>
       <option value="High" selected>High</option>
       <option value="Medium">Medium</option>
       <option value="Low" >Low</option>
     </select><br>
     `;
    } else if (key === 'priority' && value.toLowerCase() === 'medium') {
      toDoItemValueInElement = `
     <select value-number=${toDoItem.id} class="user-content the-form" data-number=${toDoItem.id}>
       <option value="High">High</option>
       <option value="Medium" selected>Medium</option>
       <option value="Low" >Low</option>
     </select><br>
     `;
    } else if (key === 'priority' && value.toLowerCase() === 'low') {
      toDoItemValueInElement = ` <select value-number=${toDoItem.id} class="user-content the-form" data-number=${toDoItem.id}>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low" selected >Low</option>
      </select><br>`;
    } else if (key === 'notes') {
      console.log('z');
      toDoItemValueInElement = `<textarea rows="4" cols="50" value-number=${toDoItem.id} class="user-content the-form" data-number=${toDoItem.id} >${toDoItem.notes}</textarea><br>`;
    } else if (key === 'date') {
      toDoItemValueInElement = `<input type="date" id="due-date" min="${todaysDate2()}"value-number=${toDoItem.id} value="${yearMonthDayFormat(
        toDoItem
      )}" class="user-content the-form" data-number=${toDoItem.id} ></input><br>`;
    }
    appendsInputElementToModalThree(toDoItemValueInElement);
  }
  createDeleteAndSaveBtns(toDoItem);
};

const checkIfToDoClickedIsAlreadyOnTheScreen = (toDoItemThatWasClicked) => {
  if (document.querySelector('.user-content') === null) {
    getValuesFromToDoPlaceInInputElement(toDoItemThatWasClicked);
  }
};

const appendsInputElementToModalThree = (toDoItemValueInElement) => {
  modalThree.insertAdjacentHTML('beforeend', toDoItemValueInElement);
};

const createDeleteAndSaveBtns = (toDoItem) => {
  const deleteAndSaveBtns = `<div class="save-del-container"><button class="user-content save" data-number=${toDoItem.id}>Save</button>
<button class="user-content del" data-number=${toDoItem.id} >Delete</button></div>`;
  placeBtnsOnModal(deleteAndSaveBtns);
};

const placeBtnsOnModal = (btns) => {
  modalThree.insertAdjacentHTML('beforeend', btns);
  displayModalSoToDoInfoWillDisplayOnPage();
};

const displayModalSoToDoInfoWillDisplayOnPage = () => {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
  loadDeleteAndSaveBtns();
};

const loadDeleteAndSaveBtns = () => {
  const deleteBtn = document.querySelector('.del');
  deleteBtn.addEventListener('click', getAllElementsAssociatedWithCurrentToDo);
  const saveBtn = document.querySelector('.save');
  saveBtn.addEventListener('click', getToDoItemToUpdateAfterSavedClicked);
};

const closeModal = () => {
  const userContent = document.querySelectorAll('.user-content');
  userContent.forEach((content) => content.remove());
  const modalFour = document.querySelector('.modalFour');
  modalThree.classList.add('hidden');
  modalFour.classList.add('hidden');
  overlay.classList.add('hidden');
  modalTwo.classList.add('hidden');
  document.querySelector('.selected').classList.remove('selected');
};

const getAllElementsAssociatedWithCurrentToDo = async (e) => {
  let arrayOfElements = Array.from(document.querySelectorAll(`[data-number="${getDataNumberOfBtnClicked(e)}"]`));
  deleteElementsAssocatedWithCurrentToDo(arrayOfElements);
  updateModals2();
  await deleteAtoDo(e);
};

const updateModals2 = () => {
  const modalFour = document.querySelector('.modalFour');
  overlay.classList.add('hidden');
  modalThree.classList.add('hidden');
  modalFour.classList.add('hidden');
};

const deleteElementsAssocatedWithCurrentToDo = (elements) => elements.forEach((element) => element.remove());

const findSpecificTodo = async (e) => {
  const arrayOfToDos = await returnArrayOfToDosFromDB();
  const toDoItem = arrayOfToDos.find((toDo) => toDo.id === getDataNumberOfBtnClicked(e));
  return toDoItem;
};

const getToDoItemToUpdateAfterSavedClicked = (e) => {
  let arrayOfNewValuesEnteredByUser = Array.from(document.querySelectorAll(`[value-number="${getDataNumberOfBtnClicked(e)}"]`));
  updateModals3();
  updateTodoInsideOfArray(e, findSpecificTodo(e), arrayOfNewValuesEnteredByUser);
  deletingTaskDetails();
};

const updateModals3 = () => {
  const modalFour = document.querySelector('.modalFour');
  overlay.classList.add('hidden');
  modalFour.classList.add('hidden');
};

const updateTodoInsideOfArray = async (e, toDoResult, userInputElement) => {
  const title = userInputElement[0].value;
  const description = userInputElement[1].value;
  const date = userInputElement[2].value;
  const priority = userInputElement[3].value;
  const notes = userInputElement[4].value;
  const daysuntil = createTimeUntilTodo(date);
  const toDo = await toDoResult;

  const updatedToDo = await patchToDoFetch(title, description, date, priority, notes, daysuntil, toDo);

  updateDisplayedTitleToUserInputTitle(e, updatedToDo);

  const elementUntilDays = document.querySelector(`[data-class="${updatedToDo.id}"]`);
  elementUntilDays.textContent = updatedToDo.daysuntil;
};

const patchToDoFetch = async (title, description, date, priority, notes, daysuntil, toDo) => {
  let response = await fetch(`/todo/${toDo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      date,
      priority,
      notes,
      daysuntil,
    }),
  });

  let updatedToDo = await response.json();
  return updatedToDo;
};

const updateDisplayedTitleToUserInputTitle = (e, updatedToDo) => {
  const displayedTitle = document.querySelector(`[data-number="${getDataNumberOfBtnClicked(e)}"]`);
  displayedTitle.querySelector('.title-of-todo').textContent = updatedToDo.title;
};

const deleteAtoDo = async (e) => {
  const id = getDataNumberOfBtnClicked(e);

  await fetch(`/todo/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  });
  displayListNumber();
};

const displayModalToAddToDo = () => {
  modalTwo.classList.remove('hidden');
  modal.classList.add('hidden');
  overlay.classList.remove('hidden');
  listOptionsDiv().classList.remove('hidden');
  document.querySelector('#todo-form').reset();
};

const createTimeUntilTodo = (date) => {
  const toDoDueDate = new Date(`${date}`.replace(/-/g, '/'));
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = new Date(`${mm}-${dd}-${yyyy}`);
  const diffTime = Math.abs(toDoDueDate - today);
  const diffDays = Number(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  return generatesDueDateMsg(diffDays);
};

const generatesDueDateMsg = (diffDays) => {
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Tomorrow';
  }
  if (diffDays >= 2) {
    return `in ${diffDays} days`;
  }
  return;
};

//fix min date issue in calendar

const todaysDate = () => {
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return document.querySelector('#due-date').setAttribute('min', today);
};
todaysDate();

const todaysDate2 = () => {
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  return today;
};

const deleteTask = async (e) => {
  if (e.target.checked === true) {
    crossOutTitle(e);
  } else if (e.target.checked === false) {
    const arrayOfTodos = await returnArrayOfToDosFromDB();
    const uncheckedToDoIndex = +e.target.getAttribute('data-index');
    const toDoItem = arrayOfTodos.find((todo) => todo.id === uncheckedToDoIndex);
    e.target.nextElementSibling.nextElementSibling.textContent = toDoItem.daysuntil;
    e.target.nextElementSibling.nextElementSibling.setAttribute('data-class', uncheckedToDoIndex);
    e.target.nextElementSibling.nextElementSibling.classList.add('days-until-due');
  }
};

const crossOutTitle = (e) => {
  const checkBoxNumber = e.target.getAttribute('data-index');
  let daysUntilElement = Array.from(document.querySelectorAll(`[data-class="${checkBoxNumber}"]`));
  daysUntilElement = daysUntilElement[0];
  let xElement = document.createElement('div');
  xElement.innerHTML = 'X';
  xElement.setAttribute('data-class', checkBoxNumber);
  xElement.setAttribute('data-number', checkBoxNumber);
  daysUntilElement.replaceWith(xElement);
  xElement.addEventListener('click', deleteTitle);
};

const deleteTitle = (e) => {
  const checkBoxNumber = e.target.previousElementSibling.previousElementSibling.getAttribute('data-index');
  let toDoDiv = document.querySelector(`[data-number="${checkBoxNumber}"]`);
  toDoDiv.remove();
  deleteAtoDo(e);
};

const showCertainToDos = (e) => {
  console.log(e.target);
  if (e.target.classList.contains('today')) {
    return showToDosForToday();
  } else if (e.target.classList.contains('next-7-days')) {
    return showToDosWithin7Days();
  } else if (e.target.classList.contains('all-task')) {
    displayAllToDos();
  }
};

const showToDosForToday = async () => {
  const allEvents = await returnArrayOfToDosFromDB();
  const allElements = Array.from(document.querySelectorAll('.content-line'));
  allElements.forEach((element) => element.remove());
  const todaysToDos = allEvents.filter((todo) => todo.daysuntil === 'Today');
  todaysToDos.forEach((todo) => createToDoCategegory(todo));
};

const showToDosWithin7Days = async () => {
  const allEvents = await returnArrayOfToDosFromDB();
  const allElements = Array.from(document.querySelectorAll('.content-line'));
  allElements.forEach((element) => element.remove());
  allEvents.filter((todo) => {
    const daysUntil = +todo.daysuntil.split(' ')[1];
    if (daysUntil <= 7 || isNaN(daysUntil)) {
      createToDoCategegory(todo);
    }
  });
};

const displayAllToDos = async () => {
  const allEvents = await returnArrayOfToDosFromDB();
  const allElements = Array.from(document.querySelectorAll('.content-line'));
  allElements.forEach((element) => element.remove());
  allEvents.filter((todo) => createToDoCategegory(todo));
};

const displayListNumber = async () => {
  const allToDos = await returnArrayOfToDosFromDB();
  const totalPersonal = allToDos.filter((item) => item.list === 'Personal');
  const totalWork = allToDos.filter((item) => item.list === 'Work');
  const totalGS = allToDos.filter((item) => item.list === 'Groceries');
  document.querySelector('.psn').textContent = totalPersonal.length;
  document.querySelector('.wor').textContent = totalWork.length;
  document.querySelector('.gst').textContent = totalGS.length;
};

const shutSidePanel = () => {};

export {
  usersInfo,
  getToDoItemThatsClicked,
  closeModal,
  detailsBtnClicked,
  displayModalToAddToDo,
  deleteTask,
  showCertainToDos,
  displayListNumber,
  shutSidePanel,
};
