var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUtils } from "../code/localUtils.js";
const task_member_select = document.querySelector(".task-member-select");
const task_name_input = document.querySelector(".task-name-input");
const task_description_input = document.querySelector(".task-description-input");
const task_deadline_input = document.querySelector(".task-deadline-input");
const task_status_select = document.querySelector(".task-status-select");
const task_table = document.querySelector(".task-table");
const addbtn = document.querySelector(".submit-task-button");
localUtils.verifyRenewToken(false);
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
window.addBtnClicked = addBtnClicked;
function closeForm() {
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.style.display = 'none';
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("edit", "0");
    }
}
window.closeForm = closeForm;
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield localUtils.GET("users/all", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        responce.forEach((e) => {
            if (task_member_select) {
                task_member_select.innerHTML += `<option value="" user_id="${e.id}" selected>${e.name}</option>`;
            }
        });
    });
}
function addTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const edit = addbtn === null || addbtn === void 0 ? void 0 : addbtn.getAttribute("edit");
        const selectedOption = task_member_select === null || task_member_select === void 0 ? void 0 : task_member_select.selectedOptions[0];
        const userId = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.getAttribute("user_id");
        const task_id = addbtn === null || addbtn === void 0 ? void 0 : addbtn.getAttribute("task_id");
        if (userId && !(edit))
            yield localUtils.POST("addTask", { "Authorization": "Bearer " + localUtils.getCookie("access_token"), "Content-Type": "application/json" }, { name: task_name_input === null || task_name_input === void 0 ? void 0 : task_name_input.value, description: task_description_input === null || task_description_input === void 0 ? void 0 : task_description_input.value, status: task_status_select === null || task_status_select === void 0 ? void 0 : task_status_select.value, assignee_id: parseInt(userId), due_date: task_deadline_input === null || task_deadline_input === void 0 ? void 0 : task_deadline_input.value });
        closeForm();
        location.reload();
        if (userId && edit)
            yield localUtils.PUT(`tasks/${task_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token"), "Content-Type": "application/json" }, { name: task_name_input === null || task_name_input === void 0 ? void 0 : task_name_input.value, description: task_description_input === null || task_description_input === void 0 ? void 0 : task_description_input.value, status: task_status_select === null || task_status_select === void 0 ? void 0 : task_status_select.value, assignee_id: parseInt(userId), due_date: task_deadline_input === null || task_deadline_input === void 0 ? void 0 : task_deadline_input.value });
        closeForm();
        location.reload();
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("edit", "0");
    });
}
window.addTask = addTasks;
function modifyTask(task_id) {
    return __awaiter(this, void 0, void 0, function* () {
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("edit", "1");
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("task_id", task_id.toString());
        const responce = yield localUtils.GET(`tasks/${task_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        addBtnClicked();
        responce.assignees.forEach((e) => {
            if (task_member_select)
                task_member_select.selectedIndex = e.id;
        });
        if (task_deadline_input)
            task_deadline_input.value = responce.due_date.split("-").reverse().join("-");
        if (task_status_select)
            task_status_select.value = responce.status;
        if (task_description_input)
            task_description_input.value = responce.description;
        if (task_name_input)
            task_name_input.value = responce.name;
    });
}
window.modifyTask = modifyTask;
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const responce = yield localUtils.GET("tasks/?", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        if (responce.length == 0 && task_table) {
            task_table.textContent = "No Tasks Available";
            task_table.style.fontStyle = "italic";
            task_table.style.color = "gray";
        }
        else {
            responce.forEach((e) => {
                e.assignees.forEach((c) => {
                    if (task_table) {
                        let create_date = e.created_date;
                        create_date = create_date.substring(0, 10);
                        task_table.innerHTML += `<tr>
                                            <td>${e.name}</td>
                                            <td>${e.description}</td>
                                            <td>${create_date}</td>
                                            <td>${e.due_date}</td>
                                            <td>${c.name}</td>
                                            <td>${e.status}</td>
                                            <td><button onclick="modifyTask(${e.id})">Edit</button></td>
                                            <td><button onclick="deleteTask(${e.id})">Delete</button></td>
                                        </tr>`;
                    }
                });
            });
        }
    });
}
function deleteTask(task_id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield localUtils.DELETE("tasks/" + task_id, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        location.reload();
    });
}
window.deleteTask = deleteTask;
//# sourceMappingURL=tasks.js.map