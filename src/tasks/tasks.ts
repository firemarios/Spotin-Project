import { localUtils } from "../code/localUtils.js";

NavigatingTo();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML();
        const tasks = document.getElementById('tasks');
        if (tasks) {
            tasks.removeAttribute('onclick');
            tasks.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML();
    }
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