import { localUtils } from "../code/localUtils.js";

const task_member_select = document.querySelector<HTMLSelectElement>(".task-member-select")
const task_name_input = document.querySelector<HTMLInputElement>(".task-name-input")
const task_description_input = document.querySelector<HTMLInputElement>(".task-description-input")
const task_deadline_input = document.querySelector<HTMLInputElement>(".task-deadline-input")
const task_status_select = document.querySelector<HTMLInputElement>(".task-status-select")
const task_table = document.querySelector<HTMLElement>(".task-table")

localUtils.verifyRenewToken(false)

NavigatingTo();
getUsers();
getTasks();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(false);
        const tasks = document.getElementById('tasks');
        if (tasks) {
            tasks.removeAttribute('onclick');
            tasks.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(false);
    }
    localUtils.getPeopleOnline();
}

function addBtnClicked() {
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.style.display = 'flex';
    }
}
(window as any).addBtnClicked = addBtnClicked;

function closeForm() {
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.style.display = 'none';
    }
}
(window as any).closeForm = closeForm;

async function getUsers() {
    const responce:any = await localUtils.GET("users/all", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    responce.forEach((e:any) => {
        if (task_member_select) {
            task_member_select.innerHTML += `<option value="" user_id="${e.id}" selected>${e.name}</option>`;
        }
    });
}

async function addTasks() {
    const selectedOption = task_member_select?.selectedOptions[0];
    const userId = selectedOption?.getAttribute("user_id");
    if (userId)
        await localUtils.POST("addTask", {"Authorization": "Bearer " + localUtils.getCookie("access_token"), "Content-Type": "application/json"}, {name: task_name_input?.value, description: task_description_input?.value, status: task_status_select?.value, assignee_id: parseInt(userId), due_date: task_deadline_input?.value})
        closeForm();
        location.reload();
}
(window as any).addTask = addTasks;

async function getTasks() {
    const responce:any = await localUtils.GET("tasks/?", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    if (responce.length == 0 && task_table) {
        task_table.textContent = "No Tasks Available";
        task_table.style.fontStyle = "italic";
        task_table.style.color = "gray";
    } else {
        responce.forEach((e: any) => {
            e.assignees.forEach((c:any) => {
                if (task_table) {
                let create_date:string = e.created_date;
                create_date = create_date.substring(0,10);
                task_table.innerHTML += `<tr>
                                            <td>${e.name}</td>
                                            <td>${e.description}</td>
                                            <td>${create_date}</td>
                                            <td>${e.due_date}</td>
                                            <td>${c.name}</td>
                                            <td>${e.status}</td>
                                            <td><button>Edit</button></td>
                                            <td><button onclick="deleteTask(${e.id})">Delete</button></td>
                                        </tr>`
                }
            });
        });
    }
}

async function deleteTask(task_id:number) {
    await localUtils.DELETE("tasks/" + task_id, {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    location.reload();
}
(window as any).deleteTask = deleteTask;