export{loadEventListeners, overlay, modal, modalTwo, modalThree, modalFour, modalFive}
import{getToDoFromUser, closeModal, detailsBtnClicked, displayModalToAddToDo, createPersonalToDo, createStoreToDo, createWorkToDo} from './ui.js'

const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit')
const createTaskBtn = document.querySelector('#create-task-btn')
const modalTwo = document.querySelector('.modalTwo')
const modalThree = document.querySelector('.modalThree')
const modalFour = document.querySelector('.modalFour')
const modalFive = document.querySelector('.modalFive')
const addToDoToPersonalModalBtn = document.querySelector('.addPersonal')
const addToDoToWorkModalBtn = document.querySelector('.addWork')
const addToDoToStoreModalBtn = document.querySelector('.addStore')



const loadEventListeners = ()=>{
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('click', detailsBtnClicked)
  submit.addEventListener('click', getToDoFromUser)
  createTaskBtn.addEventListener('click', displayModalToAddToDo)
  addToDoToPersonalModalBtn.addEventListener('click', createPersonalToDo)
  addToDoToStoreModalBtn.addEventListener('click', createStoreToDo )
  addToDoToWorkModalBtn.addEventListener('click', createWorkToDo)
 }
  


























