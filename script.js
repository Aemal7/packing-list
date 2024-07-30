const form = document.querySelector('#item-form');
const ul = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');
const submitBtn = form.querySelector('.btn');
const filterDiv = document.querySelector('.filter');
const filterInput = filterDiv.querySelector('.form-input-filter');
const inputField = form.querySelector('.form-input');

// Function that loads all local storage items to the DOM
function displayItems() {
  items = getItemsFromStorage();
  items.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onItemSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const content = formData.get('item');

  // Validate input: empty string can not be added
  if (!content) {
    alert('No item entered!');
    return;
  }

  // Check if item is already present

  if (submitBtn.lastChild.textContent.trim() == 'Add Item') {
    // Add item
    if (checkIfItemExists(content)) {
      alert('Item already exists!');
      return;
    }

    toggleUI(false);

    addItemToDOM(content);
    addItemToStorage(content);
  } else {
    // Edit Item
    const itemToBeEdited = ul.querySelector('.edit-mode');

    // Edit item in DOM
    const oldContent = itemToBeEdited.firstChild.textContent.trim();
    itemToBeEdited.firstChild.replaceWith(content);

    editItemInStorage(content, oldContent);

    setAddUI();
  }
  // Show filter input and clear all button; list no more empty

  form.reset();
}

// Function to add new item to the DOM
function addItemToDOM(content) {
  ul.appendChild(makeListItem(content));
  console.log('Item added to DOM succesfully!');
}

// Function to create list item to be added
function makeListItem(content) {
  li = document.createElement('li');
  li.appendChild(document.createTextNode(content));

  li.appendChild(makeDeleteButton('remove-item btn-link text-red'));
  return li;
}

// Function to create delete item button
function makeDeleteButton(classes) {
  button = document.createElement('button');
  button.className = classes;

  button.appendChild(makeIcon('fa-solid fa-xmark'));
  return button;
}

// Function to create icon of delete button
function makeIcon(classes) {
  icon = document.createElement('i');
  icon.className = classes;

  return icon;
}

// Funtion to store new item into local storage
function addItemToStorage(content) {
  // Get from local storage and parse
  let itemsFromStorage = getItemsFromStorage();

  // Create new array if no items on storage else push to array
  itemsFromStorage.push(content);

  // Convert to string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  // Get from local storage and parse
  let itemsFromStorage = JSON.parse(localStorage.getItem('items'));

  // Create new array if no items on storage
  !itemsFromStorage && (itemsFromStorage = []);

  return itemsFromStorage;
}

// Function to check if there is a click on delete icon and then delete
function removeItem(li) {
  // Send the contents of item to remove from storage function
  removeItemFromStorage(li.innerText);
  // Remove item from DOM
  li.remove();

  console.log('item deleted succesfully!');

  // Hide filter input and clear all button if list empty
  checkUI();
}

// Function to remove a particular item from storage
function removeItemFromStorage(content) {
  const items = getItemsFromStorage();
  items.splice(items.indexOf(content), 1);
  localStorage.setItem('items', JSON.stringify(items));
}

// Function to clear the item list
function clearAll(e) {
  if (confirm('Do you want to delete all items?')) {
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Clear from local storage
    localStorage.removeItem('items');
    console.log('all items deleted!'); // Hide filter input and clear all button

    toggleUI(true);
  }
}

function editItemInStorage(content, oldContent) {
  const items = getItemsFromStorage();
  items[items.indexOf(oldContent)] = content;
  localStorage.setItem('items', JSON.stringify(items));
}

function onClickItem(e) {
  // Delete button press check: parent of delete icon is delete button
  if (e.target.parentElement.classList.contains('remove-item')) {
    // Send list item to removeItem function
    removeItem(e.target.parentElement.parentElement);
  }
  if (e.target.tagName === 'LI') {
    // Set edit mode if it is not already in edit mode
    if (!Array.from(e.target.classList).includes('edit-mode')) {
      setEditUI(e.target);
    }
    // Take out of edit mode if already in edit mode
    else {
      setAddUI();
    }
  }
}

function checkIfItemExists(content) {
  const items = getItemsFromStorage();
  return items.includes(content);
}

// Function that filters items based on input
function filterItems(e) {
  const listItems = ul.querySelectorAll('li');
  // Get texts of all items in lower case
  const lowerCaseItemsText = Array.from(listItems).map((item) =>
    item.innerText.toLowerCase()
  );
  // Filter texts according to input
  const filteredItemTexts = lowerCaseItemsText.filter((itemText) =>
    itemText.includes(e.target.value.toLowerCase())
  );
  // Hide items that do not have the input text
  listItems.forEach((item) => {
    !filteredItemTexts.includes(item.innerText.toLowerCase())
      ? (item.style.display = 'none')
      : (item.style.display = 'flex');
  });
}

// // Function to hide filter input and clear all button if empty
function checkUI() {
  !ul.firstElementChild ? toggleUI(true) : toggleUI(false);
}

// Function to hide or show filter input and clear button
function toggleUI(bool) {
  filterDiv.classList.toggle('hidden', bool);
  clearBtn.classList.toggle('hidden', bool);
}

function setEditUI(li) {
  const items = ul.querySelectorAll('li');
  items.forEach((li) => li.classList.remove('edit-mode'));

  inputField.value = li.innerText;

  li.classList.add('edit-mode');

  submitBtn.firstElementChild.className = 'fa-solid fa-pen';
  submitBtn.lastChild.textContent = ' Edit Item';
  submitBtn.style.backgroundColor = '#228B22';
}

function setAddUI() {
  const items = ul.querySelectorAll('li');
  items.forEach((li) => li.classList.remove('edit-mode'));

  submitBtn.firstElementChild.className = 'fa-solid fa-plus';
  submitBtn.lastChild.textContent = ' Add Item';
  submitBtn.style.backgroundColor = '#333';

  form.reset();
}

// Initialize app
function init() {
  // Event Listners
  form.addEventListener('submit', onItemSubmit);
  ul.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearAll);
  filterInput.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
}

init();

// edit duplicate check issue. we can set duplicate item through edit
