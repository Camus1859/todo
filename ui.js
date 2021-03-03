import {
  ToDoItem,
  count
} from './toDoItem.js'
import {
  ToDoList
} from './toDoList.js'
import {
  overlay,
  modal,
  modalThree,
  modalTwo
} from './selectors.js'
import {
  ListType
} from './listType.js';

let toDoItem;
let listTypeModal;
let storingAllToDos = new ToDoList()


const usersInfo = (e) => {
  e.preventDefault()
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  let list;
  const dueDate = document.querySelector('#due-date').value
  const priority = document.querySelector('#priority').value
  const notes = document.querySelector('#notes').value
  listOptionsDiv().classList.contains('hidden') ? list = toDoItem.list : list = document.querySelector('.list').value
  getToDoFromUser(title, list, description, dueDate, priority, notes)
}


const getToDoFromUser = (title, list, description, dueDate, priority, notes) => {
  if (title === "" || list === "" || description === "" || dueDate === "" || priority === "" || notes === "") {
      alert("Please fill in all fields")
      return
  } else {
      generateToDoItem(title, list, description, dueDate, priority, notes)
      removeModalAndOverlay()
      displayListNumber()
  }
}



const generateToDoItem = (title, list, description, dueDate, priority, notes) => {
  toDoItem = new ToDoItem(title, list, description, dueDate, priority, notes, count())
  listTypeModal = new ListType(title, list, description, dueDate, priority, notes, toDoItem.counter)
  createListTitle(listTypeModal)
  console.log(listTypeModal)
  passToDoItemToContainer(toDoItem)
  createTimeUntilTodo(toDoItem)
}

const createListTitle = (listTypeModal) => {
  const nameOfTheListDiv =
      `<div class="holdingList">
  <div class="listTypeModal ${listTypeModal.list}">
  <div class="containerForMoreLists">
  <div class="list-name">${listTypeModal.list}</div>
  <div class="btn-for-list-type">+</div></div>
  <div class="bottom-line2"></div>
</div>`
  createToDoTitle(nameOfTheListDiv, listTypeModal)
}

const createToDoTitle = (nameOfTheListDiv, listTypeModal) => {
  const nameOfToDoTitleDiv = `
<div class="content-line details-btn" data-number=${listTypeModal.getCounter()}>
<input data-index=${listTypeModal.getCounter()} class="checkbox" type="checkbox">
<del class="strike"><p class="title-of-todo details-btn" data-number=${listTypeModal.getCounter()} >${listTypeModal.title}</p></del>
<div class="days-until-due" id="until-due" data-class="${listTypeModal.getCounter()}"></div>
</div>   `
  addingListNameAndTitleToModal(nameOfTheListDiv, nameOfToDoTitleDiv, listTypeModal)
}



const addingListNameAndTitleToModal = (nameOfTheListDiv, nameOfToDoTitleDiv, listTypeModal) => {
  const listName = document.querySelector(`.${listTypeModal.list}`)
  console.log(listName)

  if (listName) {
      console.log('a ran')
      listName.parentElement.insertAdjacentHTML('beforeend', nameOfToDoTitleDiv)
  } else {
      console.log('b ran')

      modal.insertAdjacentHTML('beforeend', nameOfTheListDiv + nameOfToDoTitleDiv)
  }
  modal.classList.remove('hidden');
  listenerForSameListNewTodo()
}


const listenerForSameListNewTodo = () => {
  const btn = document.querySelector('.modal')
  btn.addEventListener('click', displayModalTwo)
  btn.addEventListener('click', switchToDoList)
}


//Is it ok to read data from the broswer to change my object??
const switchToDoList = (e) => {
  if (e.target.classList.contains('btn-for-list-type')) {
      toDoItem.list = e.target.previousElementSibling.textContent
  }
}


const displayModalTwo = (e) => {
  if (e.target.classList.contains('btn-for-list-type')) {
      modalTwo.classList.remove('hidden');
      overlay.classList.remove('hidden');
      listOptionsDiv().classList.add('hidden')
      document.querySelector('#todo-form').reset()
  }
}


const listOptionsDiv = () => {
  return document.querySelector('.listOptionsDiv')
}


const removeModalAndOverlay = () => {
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
}


const passToDoItemToContainer = (toDoItem) => {
  storingAllToDos.placeToDoItemInMyArray(toDoItem)
}


const detailsBtnClicked = (e) => {
  if (e.target.classList.contains('details-btn')) {
      getToDoItemThatsClicked(e)
  }
}


const getToDoItemThatsClicked = (e) => {
  console.log(e.target)
  checkIfToDoClickedIsAlreadyOnTheScreen(findSpecificTodo(e))
  updateModals()
}

const updateModals = () => {
  const modalFour = document.querySelector('.modalFour');
  modal.classList.add('hidden');
  modalThree.classList.remove('hidden');
  modalFour.classList.remove('hidden');
  overlay.classList.remove('hidden')

}


const deletingTaskDetails = () => {
  const modalThree = document.querySelector('.modalThree')
  while (modalThree.lastElementChild) {
    console.log('removing children on modalThree')
      modalThree.removeChild(modalThree.lastElementChild)
  }
}


const getDataNumberOfBtnClicked = (e) => {
  console.log(Number(e.target.getAttribute('data-number')))
  const dataNumberOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  return dataNumberOfCurrentToDo
}

const getValuesFromToDoPlaceInInputElement = (toDoItem) => {
  let toDoItemValueInElement;
  deletingTaskDetails()

  for (let [key, value] of Object.entries(toDoItem)) {
      if (key === 'counter' || key === 'list' || key === "daysUntil") {
          continue
      } else if (key === 'title') {
          toDoItemValueInElement = `<div class="task-details">Task Details</div><br>
     <input value-number=${toDoItem.getCounter()} value="${toDoItem.title}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
      } else if (key === 'description') {
          toDoItemValueInElement = `<input value-number=${toDoItem.getCounter()} value="${toDoItem.description}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
      } else if (key === 'priority' && value.toLowerCase() === 'high') {
          toDoItemValueInElement =
              `
     <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
       <option value="High" selected>High</option>
       <option value="Medium">Medium</option>
       <option value="Low" >Low</option>
     </select><br>
     `
      } else if (key === 'priority' && value.toLowerCase() === 'medium') {
          toDoItemValueInElement =
              `
     <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
       <option value="High">High</option>
       <option value="Medium" selected>Medium</option>
       <option value="Low" >Low</option>
     </select><br>
     `
      } else if (key === 'priority' && value.toLowerCase() === 'low') {
          toDoItemValueInElement =
              ` <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low" selected >Low</option>
      </select><br>`
      } else if (key === 'notes') {
          toDoItemValueInElement = `<textarea rows="4" cols="50" value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter} >${toDoItem.notes}</textarea><br>`
      } else if (key === 'dueDate') {
          toDoItemValueInElement = `<input type="date" id="due-date" min="${todaysDate}"  value-number=${toDoItem.getCounter()} value="${toDoItem.dueDate}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
      }
      appendsInputElementToModalThree(toDoItemValueInElement)

  }
  createDeleteAndSaveBtns(toDoItem)

}


const checkIfToDoClickedIsAlreadyOnTheScreen = (toDoItemThatWasClicked) => {
  if (document.querySelector('.user-content') === null) {
      getValuesFromToDoPlaceInInputElement(toDoItemThatWasClicked)
  }
}


const appendsInputElementToModalThree = (toDoItemValueInElement) => {
  modalThree.insertAdjacentHTML('beforeend', toDoItemValueInElement)
}


const createDeleteAndSaveBtns = (toDoItem) => {
  const deleteAndSaveBtns =
      `<div class="save-del-container"><button class="user-content save" data-number=${toDoItem.counter}>Save</button>
<button class="user-content del" data-number=${toDoItem.counter} >Delete</button></div>`
  placeBtnsOnModal(deleteAndSaveBtns)
}


const placeBtnsOnModal = (btns) => {
  modalThree.insertAdjacentHTML('beforeend', btns)
  displayModalSoToDoInfoWillDisplayOnPage()
}


const displayModalSoToDoInfoWillDisplayOnPage = () => {
  overlay.classList.remove('hidden')
  modal.classList.remove('hidden');
  loadDeleteAndSaveBtns()
}


const loadDeleteAndSaveBtns = () => {
  const deleteBtn = document.querySelector('.del')
  deleteBtn.addEventListener('click', getAllElementsAssociatedWithCurrentToDo)
  const saveBtn = document.querySelector('.save')
  saveBtn.addEventListener('click', getToDoItemToUpdateAfterSavedClicked)
}

//figure out exactly whats happening here and fix this....
const closeModal = () => {
  const userContent = document.querySelectorAll('.user-content')
  userContent.forEach(content => content.remove())
  const modalFour = document.querySelector('.modalFour');
  modalThree.classList.add('hidden');
  modalFour.classList.add('hidden');
  overlay.classList.add('hidden');
  modalTwo.classList.add('hidden');
}



//get elements associated with the delete button clicked
const getAllElementsAssociatedWithCurrentToDo = (e) => {
  let arrayOfElements = Array.from(document.querySelectorAll(`[data-number="${getDataNumberOfBtnClicked(e)}"]`))
  deleteElementsAssocatedWithCurrentToDo(arrayOfElements)
  updateArrayOfToDos(e)
  updateModals2()
  displayListNumber()
}


const updateModals2 = () => {
  const modalFour = document.querySelector('.modalFour');
  overlay.classList.add('hidden');
  modalThree.classList.add('hidden')
  modalFour.classList.add('hidden')
}

const deleteElementsAssocatedWithCurrentToDo = (elements) => elements.forEach(element => element.remove())

const findSpecificTodo = (e) => {
  console.log(e.target)
  const toDoItem = storingAllToDos.getToDoList().find(toDo => toDo.counter === getDataNumberOfBtnClicked(e))
  console.log(toDoItem)
  return toDoItem
}

const getToDoItemToUpdateAfterSavedClicked = (e) => {
  let arrayOfNewValuesEnteredByUser = Array.from(document.querySelectorAll(`[value-number="${getDataNumberOfBtnClicked(e)}"]`))
  updateModals3()
  updateTodoInsideOfArray(e, findSpecificTodo(e), arrayOfNewValuesEnteredByUser)
  deletingTaskDetails()

}

const updateModals3 = () => {
  const modalFour = document.querySelector('.modalFour');
  overlay.classList.add('hidden');
  modalFour.classList.add('hidden')
}


const updateTodoInsideOfArray = (e, toDo, userInputElement) => {
  toDo.title = userInputElement[0].value
  toDo.description = userInputElement[1].value
  toDo.dueDate = userInputElement[2].value
  toDo.priority = userInputElement[3].value
  toDo.notes = userInputElement[4].value
  updateDisplayedTitleToUserInputTitle(e, userInputElement)
  createTimeUntilTodo(toDo)
}


const updateDisplayedTitleToUserInputTitle = (e, userInputElement) => {
  const displayedTitle = document.querySelector(`[data-number="${getDataNumberOfBtnClicked(e)}"]`)
  console.log(displayedTitle)
  displayedTitle.querySelector('.title-of-todo').textContent = userInputElement[0].value
}


const updateArrayOfToDos = (e) => {
  storingAllToDos.deleteToDo(getDataNumberOfBtnClicked(e))
}

const displayModalToAddToDo = () => {
  modalTwo.classList.remove('hidden');
  modal.classList.add('hidden');
  overlay.classList.remove('hidden')
  listOptionsDiv().classList.remove('hidden')
  document.querySelector('#todo-form').reset()
}


const createTimeUntilTodo = (toDo) => {
  const daysUntilTodoElement = document.querySelector(`[data-class="${toDo.counter}"]`)
  const toDoDueDate = new Date(`${toDo.dueDate}`.replace(/-/g, '\/'))
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = new Date(`${mm}-${dd}-${yyyy}`)
  const diffTime = Math.abs(toDoDueDate - today)
  const diffDays = Number(Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  generatesDueDateMsg(toDo, diffDays, daysUntilTodoElement)
}


const generatesDueDateMsg = (toDo, diffDays, element) => {
  if (diffDays === 0) {
      element.textContent = 'Today'
  }
  if (diffDays === 1) {
      element.textContent = 'Tomorrow'
  }
  if (diffDays >= 2) {
      element.textContent = `in ${diffDays} days`
  }
  toDo.daysUntil = element.textContent
}


//DOM shows attribute on element, however, no affect occurs on actual calendar.?? 
const todaysDate = () => {
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`
  return document.querySelector('#due-date').setAttribute('min', today)
}
todaysDate()


//maybe use the bind method here to shorten code.
const deleteTask = (e) => {
  if (e.target.checked === true) {
      crossOutTitle(e)
  } else if (e.target.checked === false) {
      const uncheckedToDoIndex = +e.target.getAttribute('data-index')
      const toDoItem = storingAllToDos.getToDoList().find(todo => todo.counter === uncheckedToDoIndex)
      e.target.nextElementSibling.nextElementSibling.textContent = toDoItem.daysUntil
      e.target.nextElementSibling.nextElementSibling.setAttribute('data-class', uncheckedToDoIndex)
  }
  displayListNumber()
}


const crossOutTitle = (e) => {
  const checkBoxNumber = e.target.getAttribute('data-index')
  let daysUntilElement = Array.from(document.querySelectorAll(`[data-class="${checkBoxNumber}"]`))
  daysUntilElement = daysUntilElement[0]
  let xElement = document.createElement('div')
  xElement.innerHTML = "X"
  daysUntilElement.replaceWith(xElement)
  xElement.addEventListener('click', deleteTitle)
}


const deleteTitle = (e) => {
  const checkBoxNumber = e.target.previousElementSibling.previousElementSibling.getAttribute('data-index')
  let toDoDiv = document.querySelector(`[data-number="${checkBoxNumber}"]`)
  toDoDiv.remove()
  storingAllToDos.deleteToDo(checkBoxNumber)
}



const showCertainToDos = (e) => {
  if (e.target.classList.contains('today')) {
      return showToDosForToday()
  } else if (e.target.classList.contains('next-7-days')) {
      return showToDosWithin7Days()
  } else if (e.target.classList.contains('all-task')) {
      Array.from(document.querySelectorAll('.content-line').forEach(item => item.classList
          .remove('hidden')))
  }
}


const showToDosForToday = () => {
  const allEvents = Array.from(document.querySelectorAll('.days-until-due'))
  allEvents.forEach(eventItem => {
      if (eventItem.textContent != 'Today' && (!eventItem.closest('.content-line')
              .classList.contains('hidden'))) {
          eventItem.closest('.content-line').classList.add('hidden')
      }
  })
}


const showToDosWithin7Days = () => {
  const allEvents = Array.from(document.querySelectorAll('.days-until-due'))
  allEvents.forEach(eventItem => {
      if (+eventItem.textContent.split(' ')[1] >= 8 && (!eventItem.closest('.content-line')
              .classList.contains('hidden'))) {
          eventItem.closest('.content-line').classList.add('hidden')
      }
  })
}


//determines how many list items in each list type
const displayListNumber = () => {
  const totalPersonal = storingAllToDos.getToDoList().filter(item => item.list === 'Personal')
  const totalWork = storingAllToDos.getToDoList().filter(item => item.list === 'Work')
  const totalGS = storingAllToDos.getToDoList().filter(item => item.list === 'Groceries')
  document.querySelector('.psn').textContent = totalPersonal.length
  document.querySelector('.wor').textContent = totalWork.length
  document.querySelector('.gst').textContent = totalGS.length
}

 const shutSidePanel = () => {
   //add code to open and close panel on click
  
 }




export {
  usersInfo,
  getToDoItemThatsClicked,
  closeModal,
  detailsBtnClicked,
  displayModalToAddToDo,
  deleteTask,
  showCertainToDos,
  displayListNumber,
  shutSidePanel
}