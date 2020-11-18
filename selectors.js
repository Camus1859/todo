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
const allListModals = Array.from(document.querySelectorAll('.listModal'))
const allListTypes = Array.from(document.querySelectorAll('.listType'))




const loadEventListeners = ()=>{
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('click', detailsBtnClicked)
  submit.addEventListener('click', getToDoFromUser)
  createTaskBtn.addEventListener('click', displayModalToAddToDo)
  addToDoToPersonalModalBtn.addEventListener('click', createPersonalToDo)
  addToDoToStoreModalBtn.addEventListener('click', createStoreToDo )
  addToDoToWorkModalBtn.addEventListener('click', createWorkToDo)
  allListModals.forEach(listBtn=>listBtn.addEventListener('click', function(e){
    allListModals.forEach(list=>{
      if(e.target.id === 'details-btn'){
        list.classList.add('hidden')
      }
      else if(e.target.classList.contains('listType')){
        allListModals.forEach(list=>list.classList.add('hidden'))
       

      }
})

  }))
}


























