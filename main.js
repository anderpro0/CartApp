import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-78697-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listInDB = ref(database, "list");

const inputField = document.getElementById("input-field");
const button = document.getElementById("submit_button");
const listItems = document.getElementById("list_items");

button.addEventListener("click", () => {
  const itemValue = inputField.value;
  push(listInDB, itemValue);
  clearInputField();
});

onValue(listInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
  
    clearListItems();
  
    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];
  
      appendItemtoList(currentItem);
    }
  } else {
    listItems.innerHTML = "No items added yet..."
  }
});

function clearListItems() {
  listItems.innerHTML = "";
}

function clearInputField() {
  inputField.value = "";
}

function appendItemtoList(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newItem = document.createElement("li");
  newItem.textContent = itemValue;

  newItem.addEventListener("click", () => {
    let itemLocationInDB = ref(database, `/list/${itemID}`);
    remove(itemLocationInDB);
  });
  listItems.append(newItem);
}
