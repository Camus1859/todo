import { usersInfo, closeModal, displayModalToAddToDo, detailsBtnClicked, deleteTask, showCertainToDos, shutSidePanel } from './ui.js';

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalThree = document.querySelector('.modalThree');
const btnCloseModal = document.querySelector('.close-modal');
const submit = document.querySelector('#submit');
const createTaskBtn = document.querySelector('#create-task-btn');
const modalTwo = document.querySelector('.modalTwo');
const shortsContainer = document.querySelector('.short-Cuts-Container');
const faIcon = document.querySelector('.fa');

const loadEventListeners = () => {
  modal.addEventListener('click', deleteTask);
  modal.addEventListener('click', detailsBtnClicked);
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  submit.addEventListener('click', usersInfo);
  createTaskBtn.addEventListener('click', displayModalToAddToDo);
  shortsContainer.addEventListener('click', showCertainToDos);
  faIcon.addEventListener('click', shutSidePanel);
};

export { loadEventListeners, overlay, modal, modalThree, modalTwo };
