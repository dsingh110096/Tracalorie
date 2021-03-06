//Storage Controller

//Item Controller
const ItemCtrl = (() => {
  //Item Constractor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure /State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: 'Eggs', calories: 600 },
      // { id: 2, name: 'Fruits', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    //Public Methods
    getItems: () => {
      return data.items;
    },

    addItem: (name, calories) => {
      let ID;
      //Creating IDs for item,
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Calories to number
      calories = parseInt(calories);
      //create new item
      newItem = new Item(ID, name, calories);
      //adding item to array
      data.items.push(newItem);
      return newItem;
    },

    getTotalCalories: () => {
      let total = 0;
      //looping through items and adding calories
      data.items.forEach((item) => {
        total += item.calories;
      });
      //setting totalcalories in data structure
      data.totalCalories = total;
      return data.totalCalories;
    },

    getItemById: (id) => {
      let found = null;
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    setCurrentItem: (item) => {
      data.currentItem = item;
    },

    getCurrentItem: () => {
      return data.currentItem;
    },

    updateItem: (name, calories) => {
      let found = null;
      calories = parseInt(calories);
      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem: (id) => {
      //getting the ids
      const ids = data.items.map((item) => {
        return item.id;
      });
      //getting the index
      const index = ids.indexOf(id);
      //removing the item from the data structure
      data.items.splice(index, 1);
    },

    clearAllItem: () => {
      data.items = [];
    },

    logData: () => {
      return data;
    },
  };
})();

//UI Controller
const UICtrl = (() => {
  //selector for scalable code so that easy change can be done
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    clearBtn: '.clear-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  };

  //Public Methods
  return {
    populateItemList: (items) => {
      let html = '';
      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-edit"></i>
          </a>
        </li>`;
      });
      //inserting item list into to Ul
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: (item) => {
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //creating li element
      const li = document.createElement('li');
      //adding class
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-edit"></i>
      </a>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },

    showTotalCalories: (totalCalories) => {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },

    clearInputFields: () => {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    clearEditState: () => {
      UICtrl.clearInputFields();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    addItemToForm: () => {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    showEditState: () => {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    updateListItem: (item) => {
      //selecting all list item from the ul
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //converting nodeList into arrah
      listItems = Array.from(listItems);
      listItems.forEach((listItem) => {
        const ItemID = listItem.getAttribute('id');
        if (ItemID === `item-${item.id}`) {
          document.querySelector(`#${ItemID}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-edit"></i>
          </a>`;
        }
      });
    },

    deleteListItem: (id) => {
      //geting the id
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      //turning nodelist into the array
      listItems = Array.from(listItems);
      listItems.forEach((item) => {
        item.remove();
      });
    },

    getUISelectors: () => {
      return UISelectors;
    },
  };
})();

//App Controller
const AppCtrl = ((ItemCtrl, UICtrl) => {
  //Load all event liseners
  const loadEventListeners = () => {
    //Get UISelctors
    const UISelectors = UICtrl.getUISelectors();
    //Add item event Click
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    //Edit icon even Click
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    //Update Item Event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    //Back button click
    document.querySelector(UISelectors.backBtn).addEventListener('click', (e) => {
      e.preventDefault();
      UICtrl.clearEditState();
    });
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    //Disable the submit on Enter
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
  };

  const itemAddSubmit = (e) => {
    //Get item input from UI controller
    const input = UICtrl.getItemInput();
    //check for input name and input calories
    if (input.name !== '' && input.calories !== '') {
      //Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add item to the UI list
      UICtrl.addListItem(newItem);
      //getting totalcaloreis
      const totalCalories = ItemCtrl.getTotalCalories();
      //showing total calories to the UI
      UICtrl.showTotalCalories(totalCalories);
      //clearing inputfields
      UICtrl.clearInputFields();
    } else {
      alert('Please Provide the Input first.');
    }
    e.preventDefault();
  };

  //Update item submit
  const itemEditClick = (e) => {
    if (e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id;
      const listIdArr = listId.split('-');
      //getting the actual id
      const id = parseInt(listIdArr[1]);
      //item to edit
      const itemToEdit = ItemCtrl.getItemById(id);
      //setting currentItem
      ItemCtrl.setCurrentItem(itemToEdit);
      //adding item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  const itemUpdateSubmit = (e) => {
    //gettting input
    const input = UICtrl.getItemInput();
    //updated item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    //updating item to UICtrl
    UICtrl.updateListItem(updatedItem);
    //getting totalcaloreis
    const totalCalories = ItemCtrl.getTotalCalories();
    //showing total calories to the UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const itemDeleteSubmit = (e) => {
    //getting the current item
    const currentItem = ItemCtrl.getCurrentItem();
    //delete from data Structure
    ItemCtrl.deleteItem(currentItem.id);
    //delelting the list from the UICtrl
    UICtrl.deleteListItem(currentItem.id);
    //getting totalcaloreis
    const totalCalories = ItemCtrl.getTotalCalories();
    //showing total calories to the UI
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.clearEditState();
    e.preventDefault();
  };

  const clearAllItemsClick = () => {
    //Get item input from UI controller
    const input = UICtrl.getItemInput();
    //check for input name and input calories
    if (input.name !== '' && input.calories !== '') {
      //Delete all items from data structure
      ItemCtrl.clearAllItem();
      //getting totalcaloreis
      const totalCalories = ItemCtrl.getTotalCalories();
      //showing total calories to the UI
      UICtrl.showTotalCalories(totalCalories);
      //delete List from the UI
      UICtrl.removeItems();
      //hide the ul
      UICtrl.hideList();
    } else {
      alert('Nothing To clear, Please Add first');
    }
  };

  //Public Methods
  return {
    init: () => {
      //clear edit state / set initial state
      UICtrl.clearEditState();
      //fetching item from data structure in ItemCtrl controller
      const items = ItemCtrl.getItems();
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate list with items
        UICtrl.populateItemList(items);
      }
      //getting totalcaloreis
      const totalCalories = ItemCtrl.getTotalCalories();
      //showing total calories to the UI
      UICtrl.showTotalCalories(totalCalories);
      //Load Event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);
//Initalize App
AppCtrl.init();
