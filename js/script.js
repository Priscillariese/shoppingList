import finishButton from './finishButton.js';
import buttonDelete from './deleteButton.js';


const loadListFromLocalStorage = () => {
  const storedList = JSON.parse(localStorage.getItem('shoppingList')) || [];
  
  const list = document.querySelector('[data-list]');
  list.innerHTML = '';
  
  storedList.forEach(item => {
    const product = document.createElement('li');
    product.classList.add('product');
    if (item.done) { 
      product.classList.add('done');
    }
    const text = `<p class="text">${item.value}</p><p class="amount">${item.amount}</p>`;
    product.innerHTML = text;

    product.appendChild(finishButton());
    product.appendChild(buttonDelete());
    list.appendChild(product);
  });
};


const createProduct = (value, amount) => {
  const list = document.querySelector('[data-list]');
  
  const product = document.createElement('li');
  product.classList.add('product');
  const text = `<p class="text">${value}</p><p class="amount">${amount}</p>`;
  product.innerHTML = text;

  product.appendChild(finishButton());
  product.appendChild(buttonDelete());
  list.appendChild(product);
};


const saveListToLocalStorage = () => {
  const listItems = document.querySelectorAll('.product');
  const shoppingList = [];
  
  listItems.forEach(item => {
    const textElement = item.querySelector('.text');
    const amountElement = item.querySelector('.amount');
    
    shoppingList.push({ value: textElement.textContent, amount: amountElement.textContent, done: item.classList.contains('done') }); // Adiciona o atributo done ao objeto
  });
  
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
};


const newProductButton = document.querySelector('[data-form-button]');
newProductButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  const input = document.querySelector('[data-form-input]');
  const amountInput = document.querySelector('[name="amount"]');
  const value = input.value.trim();
  const amount = amountInput.value.trim();
  
  if (value !== '' && amount !== '') {
    createProduct(value, amount);
    saveListToLocalStorage();
    input.value = '';
    amountInput.value = '';
  }
});

a
window.addEventListener('DOMContentLoaded', () => {
  loadListFromLocalStorage();
});


const list = document.querySelector('[data-list]');
list.addEventListener('click', (event) => {
  if (event.target.classList.contains('finish-button') || event.target.classList.contains('delete-button')) {
    saveListToLocalStorage();
  }
});