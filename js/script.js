const shoppingList = document.getElementById('shoppingList');
const newItemInput = document.getElementById('newItemInput');

// Inicializa a lista de compras com itens existentes, se houver.
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

    // Atualiza o localStorage.
    saveItemsToLocalStorage();

    // Limpa o campo de entrada e exibe novamente a lista.
    newItemInput.value = '';
    displayItems();
}



function removeItem(itemId) {
    // Remove o item da lista.
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
    }

    // Atualiza o localStorage.
    saveItemsToLocalStorage();

    // Exibe novamente a lista.
    displayItems();
}

function displayItems() {
    // Limpa a lista de compras.
    shoppingList.innerHTML = '';

    // Adiciona os itens à lista.
    for (const item of items) {
        const listItem = document.createElement('li');
        if (item.isEditing) {
            listItem.innerHTML = `<input type="text" id="editItem" value="${item.text}">
                                  <button onclick="saveEdit(${item.id})">Speichern</button>`;
        } else {
            listItem.innerHTML = `${item.text}
     <button onclick="editItem(${item.id})">Bearbeiten</button>
       <button onclick="removeItem(${item.id})">Entfernen</button>`;
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
