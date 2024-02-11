function GetTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function GetData(url) {
    let storedData = JSON.parse(localStorage.getItem(url)) || [];
    return storedData;
}
function SetData(data, url) {
    localStorage.setItem(url, JSON.stringify(data));
}
function ShowTasks(tasks) {
    const TaskContainar = document.querySelector(".task_content");
    TaskContainar.innerHTML = `
    <div class="item">
    <div class="item_content">
        <div class="name ">Task Name</div>
        <div class="check">Success</div>
        <ul class="date">
            <li class="star">Date Start</li>
            <li class="end">Date End</li>
        </ul>
        <ul class="btns">
            <li >done</li>
            <li >del</li>
        </ul>
    </div>
</div>
<div class="items">

</div>
    `;
    if (tasks != undefined) {
        const tasksContainar = document.querySelector(".task_content .items");
        tasks.forEach((task, counter) => {
            tasksContainar.innerHTML += `
            <div class="item">
            <div class="item_content">
                <div class="name">${task.name}</div>
                <div class="check">${task.success}</div>
                <ul class="date">
                    <li class="star">${task.sdate}</li>
                    <li class="end">${task.edate}</li>
                </ul>
                <ul class="btns">
                    <li class="done"  onclick="DoneTask(${counter})" ></li>
                    <li class="delete" onclick="DelTask(${counter})" ></li>
                </ul>
            </div>
            <div class="item_decription">
               ${task.description}
            </div>
            <div class="btn_decrption" onclick="ShowDecription(${counter})"></div>
        </div>
            `;
        });
    }
}
function DelTask(id) {
    let storedData = GetData("TasksData");
    storedData.splice(id, 1);
    SetData(storedData, "TasksData");
    ShowTasks(storedData);
}
function DoneTask(id) {
    let data = GetData("TasksData");
    data[id].success = "true";
    data[id].edate = GetTime();
    SetData(data, "TasksData");
    ShowTasks(data);
}
function AddTask(newTask) {
    let storedData = GetData("TasksData");
    const date = GetTime();
    const task = {
        name: newTask.name,
        success: "no",
        sdate: date,
        edate: "--/--/----",
        description: newTask.description,
    };
    storedData.push(task);
    SetData(storedData, "TasksData");
    ShowTasks(storedData);
}
function ShowDecription(index) {
    console.log("asd")
    const item_description = document.querySelectorAll(".item_decription");
    console.log(item_description[index])
    item_description[index].classList.toggle("block");
}

const MyTasks = GetData("TasksData");
ShowTasks(MyTasks);


const ListTaskBtn = document.querySelector(".list_btn").addEventListener("click", (e) => {
    e.preventDefault();
    const MyTasks = GetData("TasksData");
    ShowTasks(MyTasks);
});

const AddTaskBtn = document.querySelector(".add_btn").addEventListener("click", (e) => {
    e.preventDefault();
    const addbox = document.querySelector(".addbox").style.visibility = "visible";
});
const description = document.getElementById("decription");
const TaskName = document.getElementById("taskname");
TaskName.addEventListener("keyup", () => {
    const btn = document.getElementById("addbtn");
    if (TaskName.value != "") {
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", "");
    }
});
const btn = document.getElementById("addbtn").addEventListener("click", (e) => {
    e.preventDefault();
    const newtask = {
        name: TaskName.value,
        description: description.value,
    }
    AddTask(newtask);
    TaskName.value = "";
    description.value = "";
    const btn = document.getElementById("addbtn");
    btn.setAttribute("disabled", "");
    const addbox = document.querySelector(".addbox").style.visibility = "hidden";
    const confirmbox = document.querySelector(".ask").style.visibility = "visible";

});
const yesbtn = document.querySelector(".yes").addEventListener("click", (e) => {
    e.preventDefault();
    const addbox = document.querySelector(".addbox").style.visibility = "visible";
    const confirmbox = document.querySelector(".ask").style.visibility = "hidden";
});

const nobtn = document.querySelectorAll(".no");
nobtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        TaskName.value = "";
        description.value = "";
        const btn = document.getElementById("addbtn");
        btn.setAttribute("disabled", "");
        const addbox = document.querySelector(".addbox").style.visibility = "hidden";
        const confirmbox = document.querySelector(".ask").style.visibility = "hidden";
    })
});