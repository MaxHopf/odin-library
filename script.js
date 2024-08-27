// use strict more to enforce common code mistakes and unsafe actions
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

// Initialize array to store book objects
const library = [];

// Add event listener to update the read status label when user interacts with the checkbox
checkboxReadStatus.addEventListener('click', (e) => {
  const valueOfReadStatus = addBookDialog.querySelector('[data-value-of-read-status]');
  valueOfReadStatus.textContent = e.target.checked ? 'Read' : 'Not Read';
});

// Add event listener to open the add-book dialog
btnToShowAddBookDialog.addEventListener("click", () => {
  addBookDialog.showModal();
});

// Add event listener to close the add-book dialog
exitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookDialog.close();
});

// Add event listener to close the add-book dialog
btnToCloseAddBookDialog.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close();
});

// Add event listener to save a new book in library array and update UI
btnToSaveAddBookDialogFormInputs.addEventListener("click", (e) => {
  e.preventDefault();
  // Instantiate newBook as a new object of Book to create a new book object
  const newBook = new Book(inputBookTitle.value, inputBookAuthor.value, inputPageNumber.value, checkboxReadStatus.checked);
  // Store the new book object in the library array
  library.unshift(newBook);
  // Call the function to clear the current table in the UI
  clearTable();
  // Call the function to render table row in the UI on each book object in the library array
  library.forEach(book => renderBookAsTableRow(book));  
  addBookDialog.close();
});

// Add constructor function for creating book objects
function Book(title, author, pageNumber, readStatus){
  this.title = title;
  this.author = author;
  this.pageNumber = pageNumber;
  this.readStatus = readStatus;
}

// Add method to the Book prototype that makes each book instance deletable from the library array and UI
Book.prototype.delete = function() {
  const bookIndex = library.indexOf(this);
  library.splice(bookIndex, 1);
  
  clearTable();
  library.forEach(book => renderBookAsTableRow(book));
}

// Add method to Book prototype that allows updating the read status for corresponding book instances
Book.prototype.updateReadStatus = function(checkbox, label) {
  this.readStatus = checkbox.checked;
  label.textContent = this.readStatus ? 'Read' : 'Not Read';
};

// Add function to clear the table in UI
function clearTable() {
  const table = document.querySelector('[data-book-list]');

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

// Add function to render a book object as a table row to display it in the UI
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

  deleteButton.addEventListener('click', () => {
    book.delete();
  });

  checkbox.addEventListener('change', () => {
    book.updateReadStatus(checkbox, label);
  });

  action.appendChild(deleteButton);
  tableRow.appendChild(action);

  document.querySelector('[data-book-list]').appendChild(tableRow);
}

