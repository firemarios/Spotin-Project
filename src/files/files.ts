import { localUtils } from "../code/localUtils.js";

localUtils.verifyRenewToken(false)

NavigatingTo();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(false);
        const tasks = document.getElementById('files');
        if (tasks) {
            tasks.removeAttribute('onclick');
            tasks.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(false);
    }
}

const fileViewer = document.getElementById("file-viewer")

// for (let i = 0; i < 10; i++) {
//     if (fileViewer) {
//         fileViewer.innerHTML += `<div id="content-box">
//                                     <div id="file-type"></div>
//                                     <p id="file-name">${i}</p>
//                                 </div>`
//     }
// }

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

function fileUpload(uploading : boolean) {
    const dropZone = document.getElementById("dropzone");

    if (dropZone && fileViewer && uploading) {
        dropZone.style.display = 'flex';
    }
    else if (dropZone && fileViewer && !(uploading)) {
        dropZone.style.display = 'none';
    }
}
(window as any).fileUpload = fileUpload;