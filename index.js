var todoList = JSON.parse(localStorage.getItem("todoList")) || [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");


addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);


document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e)
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});


function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("😮 Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false
    });
    todoInput.value = "";
    update();
}


function renderTasks() {
    allTodos.innerHTML = "";
    todoList.forEach(function (element) {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

function update() {
    comdoList = todoList.filter(function (ele) {
        return ele.complete;
    });
    remList = todoList.filter(function (ele) {
        return !ele.complete;
    });
    updateLocalStorage();
    renderTasks();
}


function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter(function (ele) {
        return ele.id != deleted;
    });
    update();
}

function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach(function (obj) {
        if (obj.id == completed) {
            obj.complete = !obj.complete;
        }
    });
    update();
}

function deleteAll() {
    todoList = [];
    update();
}


function deleteS() {
    todoList = remList;
    update();
}

function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}

function addinmain(tasks) {
    allTodos.innerHTML = "";
    tasks.forEach(function (element) {
        var x = `<li id=${element.id} class="todo-item">
            <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
            <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>
                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });


}
