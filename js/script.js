const shoppingList = document.getElementById('shoppingList');
const newItemInput = document.getElementById('newItemInput');
const items = getItemsFromLocalStorage();



displayItems();

function addItem() {
    const newItemText = newItemInput.value.trim();

    if (newItemText === '') {
        alert('Bitte geben Sie einen Artikel ein.');
        return;
    }

    const newItem = {
        text: newItemText,
        id: Date.now()
    };
    items.push(newItem);

    saveItemsToLocalStorage();

    newItemInput.value = '';
    displayItems();
}


function removeItem(itemId) {
 
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
    }

    saveItemsToLocalStorage();

    displayItems();
}

function displayItems() {

    shoppingList.innerHTML = '';


    for (const item of items) {
        const listItem = document.createElement('li');
        if (item.isEditing) {
            listItem.innerHTML = `<input type="text" id="editItem" value="${item.text}">
                                  <button id="btnsalve" onclick="saveEdit(${item.id})">Speichern</button>`;
        } else {
            listItem.innerHTML = `
    <div style="overflow:hidden;text-overFlow:ellipsis;max-width:270px">${item.text}</div>
    <span style="width:110px">
         <button class="btnEdit" onclick="editItem(${item.id})"><i class="fa fa-pencil"></i></button>
       <button class="btnRemove" onclick="removeItem(${item.id})"><i class="fa fa-trash"></i></button>
       </span> `;
       
        }

        shoppingList.appendChild(listItem);
    }
}
function editItem(itemId) {
    // Set the item's editing flag to true.
    const itemToEdit = items.find(item => item.id === itemId);
    if (itemToEdit) {
        itemToEdit.isEditing = true;
        displayItems();
    }
}

function saveEdit(itemId) {
    // Save the edited item text and set the editing flag to false.
    const itemToSave = items.find(item => item.id === itemId);
    const editInput = document.getElementById('editItem');
    if (itemToSave && editInput) {
        itemToSave.text = editInput.value.trim();
        itemToSave.isEditing = false;
        saveItemsToLocalStorage();
        displayItems();
    }
}


function getItemsFromLocalStorage() {
    const itemsJSON = localStorage.getItem('shoppingItems');
    return itemsJSON ? JSON.parse(itemsJSON) : [];
}

function saveItemsToLocalStorage() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
}
