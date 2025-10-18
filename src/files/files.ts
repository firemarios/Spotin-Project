import { localUtils } from "../code/localUtils.js";

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

for (let i = 0; i < 50; i++) {
    const filesDiv = document.getElementById("file-viewer")
    if (filesDiv) {
        filesDiv.innerHTML += `
        <div id="file">
            <div id="content-box">
                <div id="file-type"></div>
            </div>
            <p id="file-name">${i + ".pdf"}</p>
        </div>`
    }
}

const files = document.querySelectorAll<HTMLElement>('#file-type');
const file_contentBox = document.querySelectorAll<HTMLElement>('#content-box');
const file_names = document.querySelectorAll('#file-name');

if (files && file_names && file_contentBox) {
    files.forEach((element, index) => {
        const el = element as HTMLElement;
        const name = file_names[index];
        const box = file_contentBox[index];

        if (name)

        el.textContent = name.textContent;

        const iconClass = localUtils.getFileIcon(el.innerHTML);
        el.innerHTML = `<i class="${iconClass}"></i>`;
        el.style.setProperty('color', localUtils.getFileIconColor(iconClass));

        if (box)

        box.onclick = () => {
            if (name)
            document.location = "./view/#/" + name.textContent;
        };
    });
}