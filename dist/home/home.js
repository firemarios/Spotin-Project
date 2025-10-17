var _a;
import { localUtils } from "../code/localUtils.js";
const file = (_a = document.getElementById('file-type')) === null || _a === void 0 ? void 0 : _a.innerText;
console.log(file);
NavigatingTo();
if (file) {
    const file_type = document.getElementById('file-type');
    const iconClass = localUtils.getFileIcon(file);
    console.log(`${file}: ${iconClass}`);
    if (file_type)
        file_type.innerHTML = `<i class="${iconClass}"></i>`;
    ;
    file_type === null || file_type === void 0 ? void 0 : file_type.style.setProperty('color', localUtils.getFileIconColor(iconClass));
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
    subMenu === null || subMenu === void 0 ? void 0 : subMenu.classList.toggle('show-sub-menu');
}
window.pfpClicked = pfpClicked;
//# sourceMappingURL=home.js.map