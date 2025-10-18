var _a;
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
    }
}
const hash = window.location.hash;
const filename = hash.startsWith("#/") ? hash.slice(2) : "";
if (filename) {
    const file = decodeURIComponent(filename);
    const fileNameElement = document.getElementById("file-name");
    const fileTypeElement = document.getElementById("file-type");
    const descriptionElement = document.getElementById("description");
    if (fileNameElement && fileTypeElement && descriptionElement) {
        fileNameElement.textContent = file;
        const fileExtension = ((_a = file.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        fileTypeElement.textContent = fileExtension;
        const iconClass = localUtils.getFileIcon(file);
        if (fileTypeElement) {
            fileTypeElement.innerHTML = `<i class="${iconClass}"></i>`;
            ;
            fileTypeElement === null || fileTypeElement === void 0 ? void 0 : fileTypeElement.style.setProperty('color', localUtils.getFileIconColor(iconClass));
        }
    }
}
else {
    document.location = "../";
}
//# sourceMappingURL=view.js.map