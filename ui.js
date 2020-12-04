import{ToDoItem, count} from './toDoItem.js'
import{ToDoList} from './toDoList.js'
import{overlay, modal, modal550, modalTwo} from './selectors.js'
import { ListType } from './listType.js';
export{getToDoFromUser, getToDoItemThatsClicked, closeModal, detailsBtnClicked, displayModalToAddToDo, deleteTask, showCertainToDos, displayListNumber}
let toDoItem;
let listTypeModal;
let storingAllToDos = new ToDoList()


//After users clicks submit button, this code runs to get user data
const getToDoFromUser= (e)=>{
  e.preventDefault()
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  const dueDate = document.querySelector('#due-date').value
  const priority = document.querySelector('#priority').value
  const notes = document.querySelector('#notes').value
  let list;
  userInputs().classList.contains('hidden') ? list = toDoItem.list : list = document.querySelector('.list').value
  if (title === "" ||  list === "" || description === "" || dueDate === "" || priority === " " || notes === " "){
    alert("Please fill in all fields")
    return
  }else{
    generateToDoItem(title, list, description, dueDate, priority, notes)
    removeDisplayedModuleAndOverlay()
    displayListNumber()
  }
}


//generate a todo
const generateToDoItem=(title, list, description, dueDate, priority, notes)=>{
  toDoItem = new ToDoItem(title, list, description, dueDate, priority, notes, count() )
  listTypeModal = new ListType(title, list, description, dueDate, priority, notes, toDoItem.counter)
  createListTitle(listTypeModal)
  passToDoItemToContainer(toDoItem)
  createTimeUntilTodo(toDoItem) 
}

const createListTitle=(listTypeModal)=>{
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

const createToDoTitle=(nameOfTheListDiv, listTypeModal)=>{
  const nameOfToDoTitleDiv = `
  <div class="content-line details-btn" data-number=${listTypeModal.getCounter()}>
    <input data-index=${listTypeModal.getCounter()} class="checkbox" type="checkbox">
    <del class="strike"><p class="title-of-todo details-btn" name-num=${listTypeModal.getCounter()} >${listTypeModal.title}</p></del><div class="days-until-due" data-class="${listTypeModal.getCounter()}"></div>
  </div> `
  addingListNameAndTitleToModal(nameOfTheListDiv, nameOfToDoTitleDiv, listTypeModal)
}
         
//if theres a class by this list name, append to that modal, if not, append to modal with a new list name.
const addingListNameAndTitleToModal=(nameOfTheListDiv, nameOfToDoTitleDiv, listTypeModal)=>{
    const listName = document.querySelector(`.${listTypeModal.list}`)
    if (listName){
      listName.parentElement.insertAdjacentHTML('beforeend', nameOfToDoTitleDiv)
    }else{
      modal.insertAdjacentHTML('beforeend', (nameOfTheListDiv + nameOfToDoTitleDiv))
    }
    modal.classList.remove('hidden');
    listenerForSameListNewTodo()
}



const listenerForSameListNewTodo=()=>{
  const btn = document.querySelector('.modal')
  btn.addEventListener('click', updateForm)
}

const updateForm=(e)=>{
  if (e.target.classList.contains('btn-for-list-type')){
    modalTwo.classList.remove('hidden');
    overlay.classList.remove('hidden');
    userInputs().classList.add('hidden')
    document.querySelector('#todo-form').reset()
  }
}

const userInputs=()=>{
  return document.querySelector('.inputsForUserModal')
}

//remove displayed modal and overlay
const removeDisplayedModuleAndOverlay= ()=>{
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
}

//place todo inside of array
const passToDoItemToContainer=(toDoItem)=>{
  storingAllToDos.placeToDoItemInMyArray(toDoItem)
}


//user clicks details button
const detailsBtnClicked =(e)=>{ 
  if (e.target.classList.contains('details-btn')){
    getToDoItemThatsClicked(e)
  }
}
  
//get todo associated with the details btn that was clicked
const getToDoItemThatsClicked = (e)=>{
  const toDoItemThatWasClicked = storingAllToDos.getToDoList().find(item=>item.counter === getDataNumberOfBtnClicked(e))
  checkIfToDoClickedIsAlreadyOnTheScreen(toDoItemThatWasClicked)
  overlay.classList.remove('hidden')
  modal.classList.add('hidden');
  const modal55 = document.querySelector('.modal55');
  modal55.classList.remove('hidden');
  modal550.classList.remove('hidden');
}


const deletingTaskDetails=()=>{
  const modal550 = document.querySelector('.modal550')
  while(modal550.lastElementChild){
    modal550.removeChild(modal550.lastElementChild)
  }
}


//returns data-number attribute associated with clicked element
const getDataNumberOfBtnClicked=(e)=>{
  const dataNumberOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  return dataNumberOfCurrentToDo
}

const getValuesFromToDoPlaceInInputElement = (toDoItem)=>{
  let toDoItemValueInElement;
  deletingTaskDetails()
  for(let [key, value] of Object.entries(toDoItem)){

    if(key === 'counter' || key === 'list' || key === "daysUntil"){
      continue
    }
    else if (key === 'title'){
       toDoItemValueInElement = `<div class="task-details">Task Details</div><br>
       <input value-number=${toDoItem.getCounter()} value="${toDoItem.title}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
     } 
     else if (key === 'description'){
      toDoItemValueInElement = `<input value-number=${toDoItem.getCounter()} value="${toDoItem.description}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
     }
     else if(key === 'priority'  && value.toLowerCase() === 'high' ){
        toDoItemValueInElement =
        `
       <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
         <option value="High" selected>High</option>
         <option value="Medium">Medium</option>
         <option value="Low" >Low</option>
       </select><br>
       `
     } 
       else if (key === 'priority' && value.toLowerCase() === 'medium'){
        toDoItemValueInElement =
        `
       <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
         <option value="High">High</option>
         <option value="Medium" selected>Medium</option>
         <option value="Low" >Low</option>
       </select><br>
       `
       }else if (key === 'priority' && value.toLowerCase() === 'low'){
        toDoItemValueInElement =
        ` <select value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low" selected >Low</option>
      </select><br>`
       }
      else if(key === 'notes') {
        toDoItemValueInElement = `<textarea rows="4" cols="50" value-number=${toDoItem.getCounter()} class="user-content the-form" data-number=${toDoItem.counter} >${toDoItem.notes}</textarea><br>`
      }
      else if(key === 'dueDate'){
        toDoItemValueInElement = `<input type="date" min="${todaysDate}" value-number=${toDoItem.getCounter()} value="${toDoItem.dueDate}" class="user-content the-form" data-number=${toDoItem.counter} ></input><br>`
      }
      appendsInputElementToModal(toDoItemValueInElement)
  }
   createDeleteAndSaveBtns(toDoItem)
}


const checkIfToDoClickedIsAlreadyOnTheScreen=(toDoItemThatWasClicked)=>{
  if(document.querySelector('.user-content') === null){
    getValuesFromToDoPlaceInInputElement(toDoItemThatWasClicked)
  }
}


//appends value of todo to modal on screen
const appendsInputElementToModal=(toDoItemValueInElement)=>{
  modal550.insertAdjacentHTML('beforeend', toDoItemValueInElement)
}

// create delete and save buttons
const createDeleteAndSaveBtns =(toDoItem)=>{
  const deleteAndSaveBtns = `<div class="save-del-container"><button class="user-content save" data-number=${toDoItem.counter}>Save</button>
  <button class="user-content del" data-number=${toDoItem.counter} >Delete</button></div>`
  placeBtnsOnModal(deleteAndSaveBtns)
} 

// place delete and save button on unseenmodal
const placeBtnsOnModal =(btns)=>{
  modal550.insertAdjacentHTML('beforeend', btns)
  displayModalSoToDoInfoWillDisplayOnPage()
}

//displays modal and overlay (with user info on top)
const displayModalSoToDoInfoWillDisplayOnPage=()=>{
  overlay.classList.remove('hidden')
  modal.classList.remove('hidden');
  loadDeleteAndSaveBtns()
}

// load Delete And Save Btns handlers (that are in modal)
const loadDeleteAndSaveBtns=()=>{
  loadListenerFordeletingToDo()
  loadListenerForSavingToDoAfterEdit()
}

//figure out exactly whats happening here and fix this....
const closeModal=()=>{
  const userContent = document.querySelectorAll('.user-content')
  userContent.forEach(content=>content.remove())
  const modal55 = document.querySelector('.modal55');
  modal550.classList.add('hidden');
  modal55.classList.add('hidden');
  overlay.classList.add('hidden');
  modalTwo.classList.add('hidden');
}

 
//loading handler listener for delete
const loadListenerFordeletingToDo =()=>{
  const deleteBtn = document.querySelector('.del')
  deleteBtn.addEventListener('click', getAllElementsAssociatedWithCurrentToDo)
}

//loading handler listener for save
const loadListenerForSavingToDoAfterEdit= ()=>{
  const saveBtn = document.querySelector('.save')
  saveBtn.addEventListener('click', getToDoItemToUpdateAfterSavedClicked)
}

//get elements associated with the delete button clicked
const getAllElementsAssociatedWithCurrentToDo =(e)=>{
  let arrayOfElements = Array.from(document.querySelectorAll(`[data-number="${getDataNumberOfBtnClicked(e)}"]`))
    deleteElementsAssocatedWithCurrentToDo(arrayOfElements)
    const modal55 = document.querySelector('.modal55');
    updateArrayOfToDos(e)
    overlay.classList.add('hidden');
    modal550.classList.add('hidden')
    modal55.classList.add('hidden')
    displayListNumber()
}

//deleting elements associated with delete button clicked 
const deleteElementsAssocatedWithCurrentToDo=(elements)=>elements.forEach(element => element.remove())

// get elements associcated with the save button clicked 
// get todo item from array associated with save button clicked
const getToDoItemToUpdateAfterSavedClicked=(e)=>{
 const toDoFromArray = storingAllToDos.getToDoList().find(toDo=>toDo.counter === getDataNumberOfBtnClicked(e))
 let arrayOfNewElementsUserEntered = Array.from(document.querySelectorAll(`[value-number="${getDataNumberOfBtnClicked(e)}"]`))
 const modal55 = document.querySelector('.modal55');
 overlay.classList.add('hidden');
 modal55.classList.add('hidden')
 updateTodoInSideOfArray(e, toDoFromArray, arrayOfNewElementsUserEntered)
}


//update todo object in array
const updateTodoInSideOfArray=(e, toDo, userInputElement)=>{
  toDo.title = userInputElement[0].value
  toDo.description = userInputElement[1].value
  toDo.dueDate = userInputElement[2].value
  toDo.priority = userInputElement[3].value
  toDo.notes = userInputElement[4].value
  updateDisplayedTitleToUserInputTitle(e, userInputElement)
  createTimeUntilTodo(toDo)
}

//updating Title that is displayed to new title entered by user
const updateDisplayedTitleToUserInputTitle=(e, userInputElement)=>{
  const displayedTitle = document.querySelector(`[name-num="${getDataNumberOfBtnClicked(e)}"]`)
 displayedTitle.textContent =  userInputElement[0].value
}

// update array of todo object after delete
const updateArrayOfToDos =(e)=>{
  storingAllToDos.deleteToDo(getDataNumberOfBtnClicked(e))
}

const displayModalToAddToDo =()=>{
  modalTwo.classList.remove('hidden');
  modal.classList.add('hidden');
  overlay.classList.remove('hidden')
  userInputs().classList.remove('hidden')
  document.querySelector('#todo-form').reset()
}


const createTimeUntilTodo=(toDo)=>{
  let daysUntilTodo = document.querySelector(`[data-class="${toDo.counter}"]`)
  let toDoDueDate = new Date(`${toDo.dueDate}`.replace(/-/g, '\/'))
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = new Date(`${mm}-${dd}-${yyyy}`)
  const diffTime = Math.abs(toDoDueDate - today)
  let diffDays = Number(Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  if(diffDays === 1){
    daysUntilTodo.textContent = 'Tomorrow'
  }
  else if(diffDays === 0){
    daysUntilTodo.textContent = 'Today'
  }
  else if(diffDays >= 2){
    daysUntilTodo.textContent = `in ${diffDays} days`
  }
  else if(diffDays > 0 ){
    daysUntilTodo.textContent = 'Over Due'
  }
  toDo.daysUntil = daysUntilTodo.textContent
}

const todaysDate =()=>{
  let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`
  document.querySelector('#due-date').setAttribute('min', today)
}
todaysDate()


const deleteTask=(e)=>{
  if( e.target.checked === true ){
    const checkBoxNumber = e.target.getAttribute('data-index')
    let daysUntilElement = Array.from(document.querySelectorAll(`[data-class="${checkBoxNumber}"]`))
    daysUntilElement = daysUntilElement[0]
    let  xElement = document.createElement('div')
     xElement.innerHTML = "X"
    daysUntilElement.replaceWith(xElement)
    xElement.addEventListener('click', (e)=>{
      let toDoDiv = document.querySelector(`[data-number="${checkBoxNumber}"]`)
      toDoDiv.remove()
       storingAllToDos.deleteToDo(checkBoxNumber)
    })
  }
  else if( e.target.checked === false){
    console.log('b')
    const uncheckedToDoIndex = +e.target.getAttribute('data-index')  
    const toDoItem = storingAllToDos.getToDoList().find(todo=>todo.counter === uncheckedToDoIndex)
    e.target.nextElementSibling.nextElementSibling.textContent = toDoItem.daysUntil 
    e.target.nextElementSibling.nextElementSibling.setAttribute('data-class', uncheckedToDoIndex)
  }
  displayListNumber()

}

const showCertainToDos=(e)=>{

  if(e.target.classList.contains('today')){
    console.log('a')
    const allEvents = Array.from(document.querySelectorAll('.days-until-due'))
    allEvents.forEach(eventItem=>{
      if(eventItem.textContent != 'Today' && (!eventItem.closest('.content-line').classList.contains('hidden'))){
       eventItem.closest('.content-line').classList.add('hidden')
      }
      else {
        }
      })
    }
  
    else if(e.target.classList.contains('next-7-days')){
      const allEvents = Array.from(document.querySelectorAll('.days-until-due'))
      allEvents.forEach(eventItem=>{
      
      if(+eventItem.textContent.split(' ')[1] >= 8  && (!eventItem.closest('.content-line').classList.contains('hidden'))){
        eventItem.closest('.content-line').classList.add('hidden')
      }
    })
  }

  else if(e.target.classList.contains('all-task')){
    Array.from(document.querySelectorAll('.content-line').forEach(item=>item.classList.remove('hidden')))
  }
}
     
//determines how many list items in each list type
const displayListNumber=()=>{
  const totalPersonal = storingAllToDos.getToDoList().filter(item=>item.list === 'Personal')
  const totalWork = storingAllToDos.getToDoList().filter(item=>item.list === 'Work')
  const totalGS = storingAllToDos.getToDoList().filter(item=>item.list === 'Groceries')
  document.querySelector('.psn').textContent = totalPersonal.length
  document.querySelector('.wor').textContent = totalWork.length
  document.querySelector('.gst').textContent = totalGS.length
}

      



