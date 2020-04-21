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
    addBtn: '.add-btn',
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
    //Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
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
    }
    e.preventDefault();
  };

  //Public Methods
  return {
    init: () => {
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
