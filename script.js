'use strict'

const btnToShowAddBookDialog = document.querySelector('[data-show-add-book-dialog-btn]');
const addBookDialog = document.querySelector('[data-add-book-dialog]');
const btnToCloseAddBookDialog = addBookDialog.querySelector('[data-close-add-book-dialog]');
const btnToSaveAddBookDialogFormInputs = addBookDialog.querySelector('[data-save-add-book-dialog-form-inputs]');
const exitBtn = addBookDialog.querySelector('[data-exit-btn]');

const inputBookTitle = addBookDialog.querySelector('[data-input-book-title]');
const inputBookAuthor = addBookDialog.querySelector('[data-input-book-author]');
const inputPageNumber = addBookDialog.querySelector('[data-input-page-number]');
const checkboxReadStatus = addBookDialog.querySelector('[data-checkbox-read-status]');

const library = [];

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
    const newBook = new Book(inputBookTitle.value, inputBookAuthor.value, inputPageNumber.value, checkboxReadStatus.checked);
    library.unshift(newBook);
    clearTable();
    library.forEach(book => renderBookAsTableRow(book));  
    addBookDialog.close();
});

function Book(title, author, pageNumber, readStatus){
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

function clearTable() {
  const table = document.querySelector('[data-book-list]');

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

function renderBookAsTableRow(book){

  const tableRow = document.createElement('tr');

  const title = document.createElement('td');
  title.textContent = book.title;
  tableRow.appendChild(title);

  const author = document.createElement('td');
  author.textContent = book.author;
  tableRow.appendChild(author);

  const pageNumber = document.createElement('td');
  pageNumber.className = 'pageNumber-col';
  pageNumber.textContent = book.pageNumber;
  tableRow.appendChild(pageNumber);

  const readStatus = document.createElement('td');
  readStatus.className = 'readStatus-col';

  const labeledCheckboxDiv = document.createElement('div');
  labeledCheckboxDiv.className = 'labeled-checkbox';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'read-status';
  checkbox.name = 'readStatus';
  checkbox.checked = book.readStatus;

  const label = document.createElement('label');
  label.htmlFor = 'read-status';
  label.textContent = checkbox.checked ? 'Read' : 'Not Read';

  labeledCheckboxDiv.appendChild(checkbox);
  labeledCheckboxDiv.appendChild(label);
  readStatus.appendChild(labeledCheckboxDiv);
  tableRow.appendChild(readStatus);

  const action = document.createElement('td');
  action.className = 'action-col';

  const deleteButton = document.createElement('button');
  deleteButton.className = 'deleteBook-btn';
  deleteButton.innerHTML = '<span class="icon-trash"></span>Delete';

  action.appendChild(deleteButton);
  tableRow.appendChild(action);

  document.querySelector('[data-book-list]').appendChild(tableRow);
}

