const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');

let todos = [];

todoForm.addEventListener("submit", function addItem(e) {
    e.preventDefault();
    const item = {
        id: Date.now(),
        name: todoInput.value,
    }
    add(item);
});

function add(item) {
    todos.push(item);
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = "";
    getItems()
}

const htmlItems = document.querySelector('#items');
let root = document.querySelector(':root');
getItems();
getColor();
function getItems() {
    const items = localStorage.getItem('todos');
    if (items) {
        todos = JSON.parse(items);
        htmlItems.innerHTML = '';
        todos.forEach(todo => {
            const htmlCard = document.createElement('div');
            const itemText = document.createElement('h3');
            const itemDelete = document.createElement('button')
            htmlCard.setAttribute("class", "card");
            htmlCard.setAttribute("id", todo['id']);
            itemDelete.setAttribute("class", "delete btn w-100");
            htmlCard.append(itemText);
            htmlCard.append(itemDelete);
            itemText.innerHTML = todo['name'];
            itemDelete.innerHTML = "Delete";
            htmlItems.append(htmlCard);
            // delete button
            let deleteButtons = document.querySelectorAll(".delete");
            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener("click", function DeleteItem(e) {
                    const itemId = e.target.parentElement.getAttribute("id");
                    remove(itemId);
                });
            });
        });
    }
}


function getColor() {
    let themeColor = localStorage.getItem('color');
    if (themeColor) {
        root.style.setProperty('--color', themeColor);
    }
}

function remove(itemId) {
    todos = todos.filter(function (item) {
        return item.id != itemId;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    getItems();
}

let colors = document.querySelectorAll(".color");
colors.forEach(color => {
    color.addEventListener("click", function (e) {
        let newColor = window.getComputedStyle(e.target).backgroundColor;
        localStorage.setItem('color',newColor);
        root.style.setProperty('--color', newColor);
    });
});