'use strict'

console.log('Hello from JavaSript console!');

const btnToShowAddBookDialog = document.querySelector('[data-show-add-book-dialog-btn]');
const addBookDialog = document.querySelector('[data-add-book-dialog]');
const btnToCloseAddBookDialog = addBookDialog.querySelector('[data-close-add-book-dialog]');
const btnToSaveAddBookDialogFormInputs = addBookDialog.querySelector('[data-save-add-book-dialog-form-inputs]');
const exitBtn = addBookDialog.querySelector('[data-exit-btn]');


exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookDialog.close();
});

btnToShowAddBookDialog.addEventListener("click", () => {
  addBookDialog.showModal();
});

btnToCloseAddBookDialog.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});

btnToSaveAddBookDialogFormInputs.addEventListener("click", (e) => {
    e.preventDefault();
    console.log('save user input');
    addBookDialog.close();
  });