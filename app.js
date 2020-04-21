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
    logdata: () => {
      return data;
    },
  };
})();

//UI Controller
const UICtrl = (() => {
  //Public Methods
  return {};
})();

//App Controller
const AppCtrl = ((ItemCtrl, UICtrl) => {
  //Public Methods
  return {
    init: () => {
      console.log('Initializing App');
    },
  };
})(ItemCtrl, UICtrl);

//Initalize App
AppCtrl.init();
