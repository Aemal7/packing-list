const form = document.querySelector('#item-form');
const ul = document.querySelector('.items');
const clearBtn = document.querySelector('.btn-clear');

function addItem(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const content = formData.get('item');

  // Validate input: empty string can not be added
  if (!content) {
    alert('No item entered!');
    return;
  }

  ul.appendChild(makeListItem(content));
  form.reset();
  console.log('Item added succesfully!');
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

// Function to check if there is a click on delete icon and then delete
function removeItem(e) {
  if (e.target.tagName !== 'I') {
    return;
  }
  // Remove li: parent of icon is button and parent of button is li
  e.target.parentElement.parentElement.remove();
}

// Function to clear the item list
function clearAll(e) {
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
}

// Event Listners
form.addEventListener('submit', addItem);
ul.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
