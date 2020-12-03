export{loadEventListeners, overlay, modal, modal550, modalTwo}
import{getToDoFromUser, closeModal, detailsBtnClicked, displayModalToAddToDo, deleteTask, showCertainToDos} from './ui.js'

const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal');
const modal550 = document.querySelector('.modal550');


const btnCloseModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit')
const createTaskBtn = document.querySelector('#create-task-btn')
const modalTwo = document.querySelector('.modalTwo')
const shortsContainer = document.querySelector('.short-Cuts-Container')


const allListModals = Array.from(document.querySelectorAll('.listModal'))


const loadEventListeners = ()=>{
  modal.addEventListener('click',deleteTask)
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('click', detailsBtnClicked)
  submit.addEventListener('click', getToDoFromUser)
  createTaskBtn.addEventListener('click', displayModalToAddToDo)
  shortsContainer.addEventListener('click', showCertainToDos)
  allListModals.forEach(listBtn=>listBtn.addEventListener('click', function(e){
    allListModals.forEach(list=>{
      if(e.target.classList.contains('details-btn')){
        list.classList.add('hidden')
      }
      else if(e.target.classList.contains('listType')){
        allListModals.forEach(list=>list.classList.add('hidden'))
       

      }
})

  }))
}


























