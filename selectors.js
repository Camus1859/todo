export{loadEventListeners, overlay, modal, modal550, modalTwo}
import{getToDoFromUser, closeModal, displayModalToAddToDo, detailsBtnClicked, deleteTask, showCertainToDos} from './ui.js'

const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal');
const modal550 = document.querySelector('.modal550');
const btnCloseModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit')
const createTaskBtn = document.querySelector('#create-task-btn')
const modalTwo = document.querySelector('.modalTwo')
const shortsContainer = document.querySelector('.short-Cuts-Container')


const loadEventListeners = ()=>{
  modal.addEventListener('click',deleteTask)
  modal.addEventListener('click', detailsBtnClicked)
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  submit.addEventListener('click', getToDoFromUser)
  createTaskBtn.addEventListener('click', displayModalToAddToDo)
  shortsContainer.addEventListener('click', showCertainToDos)
}


























