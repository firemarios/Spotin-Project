import { localUtils } from "../../code/localUtils.js";

NavigatingTo();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(true);
        const tasks = document.getElementById('files');
        if (tasks) {
            tasks.removeAttribute('onclick');
            tasks.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(true);
        let innerHTML = actionBar.innerHTML;
        innerHTML = innerHTML.replace("false", "true");
        actionBar.innerHTML = innerHTML;
    }
}

