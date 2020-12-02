export{loadEventListeners, overlay, modal, modal55, modal100, modalTwo, modalThree, modalFour, modalFive}
import{getToDoFromUser, closeModal, detailsBtnClicked, displayModalToAddToDo} from './ui.js'

const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal');
const modal55 = document.querySelector('.modal55');
const modal100 = document.querySelector('.modal100');


const btnCloseModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit')
const createTaskBtn = document.querySelector('#create-task-btn')
const modalTwo = document.querySelector('.modalTwo')
const modalThree = document.querySelector('.modalThree')
const modalFour = document.querySelector('.modalFour')
const modalFive = document.querySelector('.modalFive')
const allListModals = Array.from(document.querySelectorAll('.listModal'))




const loadEventListeners = ()=>{
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('click', detailsBtnClicked)
  submit.addEventListener('click', getToDoFromUser)
  createTaskBtn.addEventListener('click', displayModalToAddToDo)
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


























