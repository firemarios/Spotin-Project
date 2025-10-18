import { localUtils } from "../code/localUtils.js";

const file = document.getElementById('file-type')?.innerText;

NavigatingTo();

if (file) {
    const file_type = document.getElementById('file-type');
    const iconClass = localUtils.getFileIcon(file);
    if (file_type)
        file_type.innerHTML = `<i class="${iconClass}"></i>`;;
        file_type?.style.setProperty('color', localUtils.getFileIconColor(iconClass));
}

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(false);
        const home = document.getElementById('home');
        if (home) {
            home.removeAttribute('onclick');
            home.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(false);
    }
}
