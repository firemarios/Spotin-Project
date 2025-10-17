import { localUtils } from "../code/localUtils.js";

const file = document.getElementById('file-type')?.innerText;
console.log(file);

NavigatingTo();

if (file) {
    const file_type = document.getElementById('file-type');
    const iconClass = localUtils.getFileIcon(file);
    console.log(`${file}: ${iconClass}`);
    if (file_type)
        file_type.innerHTML = `<i class="${iconClass}"></i>`;;
        file_type?.style.setProperty('color', localUtils.getFileIconColor(iconClass));
}

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML();
        const home = document.getElementById('home');
        if (home) {
            home.removeAttribute('onclick');
            home.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML();
    }
}

function pfpClicked() {
    const subMenu = document.querySelector('.sub-menu');
    subMenu?.classList.toggle('show-sub-menu');
}
(window as any).pfpClicked = pfpClicked;