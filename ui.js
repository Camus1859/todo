import{ToDoItem, count} from './toDoItem.js'
import{ToDoList} from './toDoList.js'
import{overlay, modal, modalTwo, modalThree, modalFour, modalFive} from './selectors.js'
export{getToDoFromUser, getToDoItemThatsClicked, closeModal, detailsBtnClicked, displayModalToAddToDo, createPersonalToDo, createStoreToDo, createWorkToDo}
let toDoItem;
let storingAllToDos = new ToDoList()

//After users clicks submit button, this code runs to get user data
const getToDoFromUser= (e)=>{
  e.preventDefault()
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  const dueDate = document.querySelector('#due-date').value
  const priority = document.querySelector('#priority').value
  const notes = document.querySelector('#notes').value
  let listTypeDiv = document.querySelector('.listTypeDiv')

  let list;
  listTypeDiv.classList.contains('hidden') ? list = toDoItem.list : list = document.querySelector('.list').value
  generateToDoItem(title, list, description, dueDate, priority, notes)
  removeDisplayedModuleAndOverlay()
  createTimeUntilTodo()

  console.log(toDoItem)
}

//generate a todo
const generateToDoItem=(title, list, description, dueDate, priority, notes)=>{
  toDoItem = new ToDoItem(title, list, description, dueDate, priority, notes, count())
  passToDoItemToContainer(toDoItem)
}

//remove displayed modal and overlay
const removeDisplayedModuleAndOverlay= ()=>{
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
}

//place todo inside of array
const passToDoItemToContainer=(toDoItem)=>{
  storingAllToDos.placeToDoItemInMyArray(toDoItem)
  passToDoToAppendTitleToPage(toDoItem)
}

//get title of current todo 
const passToDoToAppendTitleToPage = (toDoItem)=>{
 displayingTitleOfToDoAndMoreDetailsBtn(toDoItem.title)
}

//displaying title of todo on page
const displayingTitleOfToDoAndMoreDetailsBtn = (title)=>{
  const titleAndMoreDetailsBtn = `
          <div class="content-line" data-number=${toDoItem.getCounter()}>
          <div name-num=${toDoItem.getCounter()} >${title}</div><div data-class="${toDoItem.getCounter()}"></div>
          <button data-number=${toDoItem.getCounter()} id="details-btn">More Details</button></div>`
          determingListType(titleAndMoreDetailsBtn)   
}

//determines list type  
const determingListType=(titleAndMoreDetailsBtn)=>{
  let modal;
  if(toDoItem.list === 'Personal'){
    modal = modalThree
  }else if(toDoItem.list === "Work"){
    modal = modalFour
  }else if (toDoItem.list === 'Grocery Store'){
    modal = modalFive
  }
  console.log(toDoItem)
  console.log(modal)
  appendTitleToModal(modal, titleAndMoreDetailsBtn)//is it ok to pass a variable even though it doesnt get used at this point
}

// appends todo title on respective list type
const appendTitleToModal=(modal, titleAndMoreDetailsBtn)=>{
  modal.insertAdjacentHTML('beforeend', titleAndMoreDetailsBtn)
  showModal(modal)
}

//display modal for current list type with respective todo title on it
const showModal =(modal)=>{
  modal.classList.remove('hidden');
}

//user clicks details button
const detailsBtnClicked =(e)=>{ 
  if (e.target.id === 'details-btn' ) getToDoItemThatsClicked(e)
}
  
//get todo associated with the details btn that was clicked
const getToDoItemThatsClicked = (e)=>{
  const toDoItemThatWasClicked = storingAllToDos._toDoList.find(item=>item.counter === getDataNumberOfBtnClicked(e))
  checkIfToDoClickedIsAlreadyOnTheScreen(e, toDoItemThatWasClicked)
}

//returns data-number attribute associated with clicked element
const getDataNumberOfBtnClicked=(e)=>{
  const dataNumberOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  return dataNumberOfCurrentToDo
}



//takes values from todo item and places them in input element
const getValuesFromToDoPlaceInInputElement = (e, toDoItem)=>{
  let toDoItemValueInElement;
  console.log('getValuesFromToDoPlaceInInputElement  runs')
  for(const [key, value] of Object.entries(toDoItem)){
    if(key === 'counter' || key === 'list'){
      continue
    }
    else if (key === 'title' || key === 'description'){
       toDoItemValueInElement = `<input value-number=${toDoItem.getCounter()} value="${value}" class="user-content" data-number=${toDoItem.counter} ></input>`
     } 
     else if(key === 'priority'){
      //  console.log(document.getElementById('high'))
      //  document.getElementById("low").selected = true
        toDoItemValueInElement =
         `
        <select value-number=${toDoItem.getCounter()} class="user-content" data-number=${toDoItem.counter}>
          <option value = "High">High</option>
          <option value = "Medium">Medium</option>
          <option value = "Low"{}>Low</option>
        </select>
        `
      }
      else if(key === 'notes') {
        toDoItemValueInElement = `<textarea rows="4" cols="50" value-number=${toDoItem.getCounter()} class="user-content" data-number=${toDoItem.counter} >${value}</textarea>`
      }
      
      else if(key === 'dueDate'){
        toDoItemValueInElement = `<input type="date" min="${today}" value-number=${toDoItem.getCounter()} value="${value}" class="user-content" data-number=${toDoItem.counter} ></input>`
      }
      appendsInputElementToModal(toDoItemValueInElement)
  }
   createDeleteAndSaveBtns(toDoItem)
}

const checkIfToDoClickedIsAlreadyOnTheScreen=(e, toDoItemThatWasClicked)=>{
  if(!modal.classList.contains('hidden')){
    const clickedDetailsIdNum = e.target.getAttribute('data-number')
    const elementDisplayingOnModalIdNum = document.querySelector('.user-content').getAttribute('data-number')
    if (clickedDetailsIdNum === elementDisplayingOnModalIdNum){
      console.log("???")
      return
    }
  }
  else if(modal.classList.contains('hidden')){
    getValuesFromToDoPlaceInInputElement(e, toDoItemThatWasClicked)
    modalThree.classList.add('hidden')
    modalFour.classList.add('hidden')
    modalFive.classList.add('hidden')
  }
}


//appends value of todo to modal on screen
const appendsInputElementToModal=(toDoItemValueInElement)=>{
  modal.insertAdjacentHTML('beforeend', toDoItemValueInElement)
}

// create delete and save buttons
const createDeleteAndSaveBtns =(toDoItem)=>{
  const deleteAndSaveBtns = `<button class="user-content save" data-number=${toDoItem.counter}>Save<button>
  <button class="user-content del" data-number=${toDoItem.counter} >Delete</button>`
  placeBtnsOnModal(deleteAndSaveBtns)
} 

// place delete and save button on unseenmodal
const placeBtnsOnModal =(btns)=>{
  modal.insertAdjacentHTML('beforeend', btns)
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
  //should this be in the selectors.js file? if so, how do i grab elements that are created dynamically
  const userContent = document.querySelectorAll('.user-content')
  userContent.forEach(content=>content.remove())
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  modalTwo.classList.add('hidden');
  displayCertainListModals()
}

const displayCertainListModals=()=>{
  if(modalThree.firstElementChild.nextElementSibling){
    modalThree.classList.remove('hidden')
  }
  if(modalFour.firstElementChild.nextElementSibling){
    modalFour.classList.remove('hidden')
  }if(modalFive.firstElementChild.nextElementSibling){
    modalFive.classList.remove('hidden')
  }
}

 


//loading handler listener for delete
const loadListenerFordeletingToDo =()=>{
  //should this be in the selectors.js file? if so, how do i grab elements that are created dynamically
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
    updateArrayOfToDos(e)
}

//deleting elements associated with delete button clicked 
const deleteElementsAssocatedWithCurrentToDo=(elements)=>elements.forEach(element => element.remove())

// get elements associcated with the save button clicked 
// get todo item from array associated with save button clicked
const getToDoItemToUpdateAfterSavedClicked=(e)=>{
 const toDoFromArray = storingAllToDos.getToDoList().find(toDo=>toDo.counter == getDataNumberOfBtnClicked(e))
 let arrayOfNewElementsUserEntered = Array.from(document.querySelectorAll(`[value-number="${getDataNumberOfBtnClicked(e)}"]`))
 updateTodoInSideOfArray(e, toDoFromArray, arrayOfNewElementsUserEntered)
}

//update todo object in array
//find more efficent way to do this....
const updateTodoInSideOfArray=(e, toDo, userInputElement)=>{
  console.log(userInputElement)
  toDo.title = userInputElement[0].value
  toDo.description = userInputElement[1].value
  toDo.dueDate = userInputElement[2].value
  console.log(toDo.dueDate)
  toDo.priority = userInputElement[3].value
  console.log(userInputElement[4].textContent)
  toDo.notes = userInputElement[4].value
  updateDisplayedTitleToUserInputTitle(e, userInputElement)
  createTimeUntilTodo()
}

//updating Title that is displayed to new title entered by user
const updateDisplayedTitleToUserInputTitle=(e, userInputElement)=>{
  const displayedTitle = document.querySelector(`[name-num="${getDataNumberOfBtnClicked(e)}"]`)
 displayedTitle.textContent =  userInputElement[0].value
 closeModal()
}

// update array of todo object after delete
const updateArrayOfToDos =(e)=>{
  storingAllToDos.deleteToDo(getDataNumberOfBtnClicked(e))
  closeModal()
}

const displayModalToAddToDo =()=>{
  const listTypeDiv = document.querySelector('.listTypeDiv')
  modalTwo.classList.remove('hidden');
  overlay.classList.remove('hidden')
  listTypeDiv.classList.remove('hidden')
  document.querySelector('#todo-form').reset()
  modalThree.classList.add('hidden')
  modalFour.classList.add('hidden')
  modalFive.classList.add('hidden')
}

//find more efficient to create different toDo list

const createPersonalToDo=()=>{
  const listTypeDiv = document.querySelector('.listTypeDiv')
  displayModalToAddToDo()
  toDoItem.list = 'Personal'
  listTypeDiv.classList.add('hidden')
}

const createStoreToDo =()=>{
  const listTypeDiv = document.querySelector('.listTypeDiv')
  displayModalToAddToDo()
  toDoItem.list = 'Grocery Store'
  listTypeDiv.classList.add('hidden')
}

const createWorkToDo =()=>{
  const listTypeDiv = document.querySelector('.listTypeDiv')
  displayModalToAddToDo()
  toDoItem.list = 'Work'
  listTypeDiv.classList.add('hidden')
}


const createTimeUntilTodo=()=>{
  let daysUntilTodo = document.querySelector(`[data-class="${toDoItem.getCounter()}"]`)
  let toDoDueDate = new Date(`${toDoItem.dueDate}`.replace(/-/g, '\/'))
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
}

let today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1);
  const yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`
  document.querySelector('#due-date').setAttribute('min', today)

