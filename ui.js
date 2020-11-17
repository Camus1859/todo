import{ToDoItem, count} from './toDoItem.js'
import{ToDoList} from './toDoList.js'
import{overlay, modal, modalTwo, modalThree, modalFour, modalFive} from './selectors.js'
export{getToDoFromUser, getToDoItemThatsClicked, closeModal, detailsBtnClicked, displayModalToAddToDo, createPersonalToDo, createStoreToDo, createWorkToDo}
let toDoItem;
let storingAllToDos = new ToDoList()


const getToDoFromUser= (e)=>{
  e.preventDefault()
  let list;
  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  const dueDate = document.querySelector('#due-date').value
  const priority = document.querySelector('#priority').value
  const notes = document.querySelector('#notes').value
  const listType = document.querySelector('.listType')
  listType.classList.contains('hidden') ? list = toDoItem.list : list = document.querySelector('.list').value
  generateToDoItem(title, list, description, dueDate, priority, notes)
  removeDisplayedModuleAndOverlay()
}

const removeDisplayedModuleAndOverlay= ()=>{
  modalTwo.classList.add('hidden');
  overlay.classList.add('hidden');
}


const generateToDoItem=(title, list, description, dueDate, priority, notes)=>{
  toDoItem = new ToDoItem(title, list, description, dueDate, priority, notes, count())
  passToDoItemToContainer(toDoItem)
}

const passToDoItemToContainer=(toDoItem)=>{
  storingAllToDos.placeToDoItemInMyArray(toDoItem)
  passToDoToAppend(toDoItem)
}

const passToDoToAppend=(toDo)=>{
  appendToDoTitleToPage(toDo)
}
 
const appendToDoTitleToPage = (toDoItem)=>{
 displayingTitleOfToDo(toDoItem.title)
}

const displayingTitleOfToDo = (title)=>{
  let num;
  const titleAndMoreDetailsBtn = `
          <div class="content-line" data-number=${toDoItem.getCounter()}>
          <div name-num=${toDoItem.getCounter()} >${title}</div><button data-number=${toDoItem.getCounter()} id="details-btn">More Details</button></div>`
          if(toDoItem.list === 'Personal'){
            num = modalThree
          }else if(toDoItem.list === "Work"){
            num = modalFour
          }else if (toDoItem.list === 'Grocery Store'){
            num = modalFive
          }
          num.insertAdjacentHTML('beforeend', titleAndMoreDetailsBtn)
          num.classList.remove('hidden');
}


const detailsBtnClicked =(e)=>{ 
  if (e.target.id === 'details-btn' ) getToDoItemThatsClicked(e)
}
  
  const getToDoItemThatsClicked = (e)=>{
  let dataNumOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  const toDoItemThatWasClicked = storingAllToDos._toDoList.find(item=>item.counter === dataNumOfCurrentToDo)
  showDetailsOnPage(toDoItemThatWasClicked)
  openModal()
}


const showDetailsOnPage = (toDoItem)=>{
  for(const [key, value] of Object.entries(toDoItem)){
    if(key != 'counter' && key != 'list'){
      const content = `<input name-number=${toDoItem.getCounter()} value="${value}" class="user-content" data-number=${toDoItem.counter} ></input>`
      modal.insertAdjacentHTML('beforeend', content)
    }
  }
   createEditAndDeleteBtns(toDoItem)
}



const createEditAndDeleteBtns =(toDoItem)=>{
  const editAndDeleteBtns = `<button class="user-content save" data-number=${toDoItem.counter}>Save<button>
  <button class="user-content del" data-number=${toDoItem.counter} >Delete</button>`
  placeBtnsOnPage(editAndDeleteBtns)
} 

const placeBtnsOnPage =(btns)=>{
  modal.insertAdjacentHTML('beforeend', btns)
}

const openModal=()=>{
  overlay.classList.remove('hidden')
  modal.classList.remove('hidden');
  loadListenerFordeletingToDo()
  loadListenerForSavingToDoAfterEdit()
}

const closeModal=()=>{
  //should this be in the selectors.js file? if so, how do i grab elements that are created dynamically
  const userContent = document.querySelectorAll('.user-content')
  userContent.forEach(content=>content.remove())
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  modalTwo.classList.add('hidden');
}

const loadListenerFordeletingToDo =()=>{
  //should this be in the selectors.js file? if so, how do i grab elements that are created dynamically
  const deleteBtn = document.querySelector('.del')
  deleteBtn.addEventListener('click', getAllElementsAssociatedWithCurrentToDo)
}

const loadListenerForSavingToDoAfterEdit= ()=>{
  const saveBtn = document.querySelector('.save')
  saveBtn.addEventListener('click', getDataNumberAssociatedWithClickedToDo)
}

const getAllElementsAssociatedWithCurrentToDo =(e)=>{
  let dataNumOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  let nodeOfElements = Array.from(document.querySelectorAll(`[data-number="${dataNumOfCurrentToDo}"]`))
    deleteElementsAssocatedWithCurrentToDo(nodeOfElements)
    updateArrayOfToDos(e)
}

const getDataNumberAssociatedWithClickedToDo =(e)=>{
  let dataNumOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  getToDoItemToUpdate(dataNumOfCurrentToDo)
}


const getToDoItemToUpdate=(dataNumOfCurrentToDo)=>{
 const newToDo = storingAllToDos.getToDoList().find(toDo=>toDo.counter == dataNumOfCurrentToDo)
 let arrayOfElements = Array.from(document.querySelectorAll(`[name-number="${dataNumOfCurrentToDo}"]`))
 newToDo.title = arrayOfElements[0].value
 newToDo.description = arrayOfElements[1].value
 newToDo.dueDate = arrayOfElements[2].value
 newToDo.priority = arrayOfElements[3].value
 newToDo.notes = arrayOfElements[4].value 
 let displayedTitle = document.querySelector(`[name-num="${dataNumOfCurrentToDo}"]`)
 displayedTitle.textContent =  arrayOfElements[0].value


 closeModal()
}

const deleteElementsAssocatedWithCurrentToDo=(elements)=>elements.forEach(element => element.remove())

const updateArrayOfToDos =(e)=>{
  let dataNumOfCurrentToDo = Number(e.target.getAttribute('data-number'))
  storingAllToDos.deleteToDo(dataNumOfCurrentToDo)
  closeModal()
}

const displayModalToAddToDo =()=>{
  const listType = document.querySelector('.listType')
  modalTwo.classList.remove('hidden');
  overlay.classList.remove('hidden')
  listType.classList.remove('hidden')
  document.querySelector('#todo-form').reset()
}

const createPersonalToDo=()=>{
  const listType = document.querySelector('.listType')
  displayModalToAddToDo()
  toDoItem.list = 'Personal'
  listType.classList.add('hidden')
}

const createStoreToDo =()=>{
  const listType = document.querySelector('.listType')
  displayModalToAddToDo()
  toDoItem.list = 'Grocery Store'
  listType.classList.add('hidden')
}

const createWorkToDo =()=>{
  const listType = document.querySelector('.listType')
  displayModalToAddToDo()
  toDoItem.list = 'Work'
  listType.classList.add('hidden')
}