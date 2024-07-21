const form = document.querySelector('#item-form');

function addItem(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const content = formData.get('item');

  if (!content) {
    return;
  }

  const ul = document.querySelector('.items');
  ul.appendChild(makeListItem(content));
}

function makeListItem(content) {
  li = document.createElement('li');
  li.appendChild(document.createTextNode(content));

  li.appendChild(makeButton('remove-item btn-link text-red'));
  return li;
}

function makeButton(classes) {
  button = document.createElement('button');
  button.className = classes;

  button.appendChild(makeIcon('fa-solid fa-xmark'));
  return button;
}

function makeIcon(classes) {
  icon = document.createElement('i');
  icon.className = classes;

  return icon;
}

// Event Listners
form.addEventListener('submit', addItem);
