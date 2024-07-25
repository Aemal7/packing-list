const form = document.querySelector('#item-form');
const ul = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');
const filterDiv = document.querySelector('.filter');
const filterInput = filterDiv.querySelector('.form-input-filter');

function onAddItemSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const content = formData.get('item');

  // Validate input: empty string can not be added
  if (!content) {
    alert('No item entered!');
    return;
  }

  // Show filter input and clear all button; list no more empty
  toggleUI(false);

  addItemToDOM(content);
  addItemToStorage(content);

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
  let itemsFromStorage = JSON.parse(localStorage.getItem('items'));

  // Create new array if no items on storage else push to array
  !itemsFromStorage
    ? ((itemsFromStorage = []), itemsFromStorage.push(content))
    : itemsFromStorage.push(content);

  // Convert to string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Function to check if there is a click on delete icon and then delete
function removeItem(e) {
  // Delete button press check: parent of delete icon is delete button
  if (!e.target.parentElement.classList.contains('remove-item')) {
    return;
  }

  const li = e.target.parentElement.parentElement;
  li.remove();
  console.log('item deleted succesfully!');

  // Hide filter input and clear all button if list empty
  checkUI();
}

// Function to clear the item list
function clearAll(e) {
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  console.log('all items deleted!');

  // Hide filter input and clear all button
  toggleUI(true);
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

// Event Listners
form.addEventListener('submit', onAddItemSubmit);
ul.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
filterInput.addEventListener('input', filterItems);

checkUI();
