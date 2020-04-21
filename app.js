//Storage Controller

//Item Controller
const ItemCtrl = (() => {
  //This is all private funtion and object can't accessible

  //Item Constractor
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure /State
  const data = {
    items: [
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 1, name: 'Eggs', calories: 600 },
      { id: 2, name: 'Fruits', calories: 300 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    //Public Methods
    getItems: () => {
      return data.items;
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
  };
  //Public Methods
  return {
    populateItemList: (items) => {
      let html = '';

      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
                  <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                  <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-edit"></i>
                  </a>
                </li>`;
      });
      //inserting item list into to Ul
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
  };
})();

//App Controller
const AppCtrl = ((ItemCtrl, UICtrl) => {
  //Public Methods
  return {
    init: () => {
      //fetching item from data structure in ItemCtrl controller
      const items = ItemCtrl.getItems();
      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

//Initalize App
AppCtrl.init();
