const items = document.querySelectorAll('li');
const itemList = document.querySelector('ul');

console.log(items);

function addItem() {
  const element = document.createElement('li');
  element.textContent = 'another item';
  itemList.insertAdjacentElement('afterbegin', element);
  const items2 = document.querySelectorAll('li');
  console.log(items2);
}

addItem();
console.log(items);
items[0].textContent = 'changed text';
