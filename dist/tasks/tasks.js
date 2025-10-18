import { localUtils } from "../code/localUtils.js";
NavigatingTo();
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
    }
}
window.closeForm = closeForm;
//# sourceMappingURL=tasks.js.map