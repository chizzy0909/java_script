const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
// const itemLists = document.querySelectorAll('.drag-item-list');
const listColumns = document.querySelectorAll('.drag-item-list');  // 5.4
const backlogListEl = document.getElementById('backlog-list');
const progressListEl = document.getElementById('progress-list');
const completeListEl = document.getElementById('complete-list');
const onHoldListEl = document.getElementById('on-hold-list');


// 3.Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// 5.0 Drag Functionality
let draggedItem;  // 5.2
let dragging = false;  // 7.1 
let currentColumn;   //5.5


// 1.Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// getSavedColumns();
// updateSavedColumns();

// 2.Set localStorage Arrays
function updateSavedColumns() {

  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });

  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // 4.1做完后 comment
  // console.log('columnEl:', columnEl);  //columnEl:  <ul id="backlog-list" class="drag-item-list" ondrop="drop(event)" ondragover="allowDrop(event)" ondragenter="dragEnter(0)">
  // console.log('column:', column);  // 1 2 
  // console.log('item:', item);   // Listen to music
  // console.log('index:', index);  // 0

  // List Item
  const listEl = document.createElement('li');

  listEl.classList.add('drag-item');
  listEl.textContent = item;  // 4.2 
  listEl.id = index;  // 6.2
  listEl.draggable = true;   // 5.1 拖放 
  listEl.setAttribute('ondragstart', 'drag(event)');  // 5.1 ondragenter Attribute
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);  // 6.2
  listEl.contentEditable = true;  // 6.2 



  // console.log(columnEl.children); // HTMLCollection { 0: li.drag-item, length: 1 }
  columnEl.appendChild(listEl);  // 4.2 Append
}

// 4.Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  // Backlog Column
  backlogListEl.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogListEl, 0, backlogItem, index);
  });
  backlogListArray = filterArray(backlogListArray);  // 6.2.2

  // Progress Column
  progressListEl.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressListEl, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);  // 6.2.2

  // Complete Column
  completeListEl.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeListEl, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);  // 6.2.2

  // On Hold Column
  onHoldListEl.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldListEl, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);  // 6.2.2

  // 5.6.2 Don't run more than once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();

}

// 5.4 When Item Enters Column Area
function dragEnter(column) {
  // console.log(listColumns[column]);
  listColumns[column].classList.add('over');
  currentColumn = column;  // 5.5
}

// 6.2.2 Filter Array to remove empty values
function filterArray(array) {
  // console.log(array);
  const filteredArray = array.filter(item => item !== null);
  // console.log(filterArray);
  return filteredArray;
}

// 6.2.1 Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  // console.log(selectedArray);  // Array(2) [ "Sit back and relax", "Work on projects"]
  const selectedColumnEl = listColumns[column].children;
  // console.log(selectedColumnEl);  // HTMLCollection { 0: li#0.drag-item, 1: li#1.drag-item, length: 2, … }
  // console.log(selectedColumnEl[id].textContent);  // Sit back and relax
  if (!dragging) {    // 7.1
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;   // 7.1 update item
    }
    updateDOM();
  }
}

// 6.1.3 Add to Column List, Reset Textbox
function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM(column);
}

// 6.1.1 Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// 6.1.2 Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}


// 5.6.1 Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  // console.log(backlogListEl.children);  // HTMLCollection { 0: li.drag-item, 1: li.drag-item, length: 2 }
  backlogListArray = [];
  for (let i = 0; i < backlogListEl.children.length; i++) {
    backlogListArray.push(backlogListEl.children[i].textContent);
  }
  progressListArray = [];
  for (let i = 0; i < progressListEl.children.length; i++) {
    progressListArray.push(progressListEl.children[i].textContent);
  }
  completeListArray = [];
  for (let i = 0; i < completeListEl.children.length; i++) {
    completeListArray.push(completeListEl.children[i].textContent);
  }
  onHoldListArray = [];
  for (let i = 0; i < onHoldListEl.children.length; i++) {
    onHoldListArray.push(onHoldListEl.children[i].textContent);
  }
  updateDOM();
}

// 5.2 When Item Starts Dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;  // 7.1
}

// 5.3 Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// 5.5 Dropping Item in Column
function drop(e) {
  e.preventDefault();
  const parent = listColumns[currentColumn];

  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });

  // Add item to Column
  parent.appendChild(draggedItem);

  // Dragging complete
  dragging = false;    // 7.1
  rebuildArrays();
}


// On Load
updateDOM();
