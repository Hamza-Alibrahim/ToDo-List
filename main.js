let input = document.querySelector(".add input");
let add = document.querySelector(".add i");
let tasks = document.querySelector(".tasks");
let text;
let alert = document.querySelector(".alert");
let array = [];
if (localStorage.getItem("tasks")) {
    array = JSON.parse(localStorage.getItem("tasks"));
    addelementtopage(array);
};
function createlement(val) {
    if (val == "") {
        alert.textContent = "Please add your task name";
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 5000);
    } else {
        const task = {
            name: val,
            compelet: false,
        };
        alert.textContent = "Your task added successfuly";
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 5000);
        array.push(task);
        input.value = "";
        addelementtopage(array);
        addelementtolocalstorage(array);
    };
};
function addelementtopage(arr) {
    tasks.innerHTML = "";
    arr.forEach(task => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(task.name));
        span.setAttribute("ondblclick", "done(this)");
        if (task.compelet) {
            span.style.textDecoration = "line-through";
        };
        let icons = document.createElement("div");
        let x = `<i class="fa-solid fa-pen" onclick="edittask(this.parentElement.parentElement)"></i>
        <i class="fa-solid fa-trash-can" onclick="deletetask(this.parentElement)"></i>`;
        icons.innerHTML = x;
        li.appendChild(span);
        li.appendChild(icons);
        tasks.appendChild(li);
    });
};
function addelementtolocalstorage(arr) {
    localStorage.setItem("tasks", JSON.stringify(arr));
};
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        add.click();
});
function edittask(task) {
    let taskname = task.querySelector("span").textContent;
    input.value = taskname;
    input.focus();
    add.className = "fa-solid fa-rotate";
    add.setAttribute("onclick", "updatevalue()");
    text = task.querySelector("span");
};
function deletetask(task) {
    if (confirm(`Are you sure? Do you want to delete ${task.parentElement.querySelector("span").textContent} task`)) {
        task.parentElement.className = "delete";
        setTimeout(() => {
            task.parentElement.remove();
        }, 1000);
        array = array.filter(e => {
            return (e.name !== task.parentElement.querySelector("span").textContent)
        });
        alert.textContent = "Your task deleted successfuly";
        alert.style.display = "block";
        setTimeout(function () {
            alert.style.display = "none";
        }, 5000);
    };
    addelementtolocalstorage(array);
};
function done(e) {
    if (e.style.textDecoration === "" || e.style.textDecoration === "none") {
        e.style.textDecoration = "line-through";
    } else {
        e.style.textDecoration = "none";
    };
    array.forEach(el => {
        if (el.name === e.textContent) {
            if (el.compelet === true) {
                el.compelet = false;
            } else {
                el.compelet = true;
            };
        };
    });
    addelementtolocalstorage(array);
};
function updatevalue() {
    array.forEach(el => {
        if (el.name === text.textContent) {
            el.name = input.value;
        };
        addelementtolocalstorage(array);
    });
    text.textContent = input.value;
    add.className = "fa-solid fa-plus";
    add.setAttribute("onclick", "createlement(input.value)");
    input.value = "";
    alert.textContent = "Your task edited successfuly";
    alert.style.display = "block";
    setTimeout(function () {
        alert.style.display = "none";
    }, 5000);
};