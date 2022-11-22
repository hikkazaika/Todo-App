//all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button");

showTasks();

inputBox.onkeyup = () =>{
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}

addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New todo");
    if(getLocalStorage == null) {
        listArr = [];
    } else {
        listArr = JSON.parse(getLocalStorage);
        if(listArr.length != 0) {deleteAllBtn.classList.add("active")} else {deleteAllBtn.classList.remove("active")}
    }
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length;
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li class="anim">${element} <span onclick="deleteTask(${index})"><img src="./img/delete.svg" alt="delete"></span></li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
    addBtn.classList.remove("active");
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1)

    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
}

function deleteAll() {
    let getLocalStorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getLocalStorage);
    listArr = []

    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTasks();
    deleteAllBtn.classList.remove("active");
}