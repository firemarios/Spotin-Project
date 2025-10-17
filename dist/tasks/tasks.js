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
function pfpClicked() {
    const subMenu = document.querySelector('.sub-menu');
    subMenu === null || subMenu === void 0 ? void 0 : subMenu.classList.toggle('show-sub-menu');
}
window.pfpClicked = pfpClicked;
function addBtnClicked() {
    const addTaskForm = document.getElementById('add-task-form');
    if (addTaskForm) {
        addTaskForm.style.display = 'flex';
    }
}
window.addBtnClicked = addBtnClicked;
//# sourceMappingURL=tasks.js.map