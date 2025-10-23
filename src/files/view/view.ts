import { localUtils } from "../../code/localUtils.js";

localUtils.verifyRenewToken(true)

NavigatingTo();
getFile();

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

async function getFile() {
    const hash = window.location.hash;
    const filename = hash.startsWith("#/") ? hash.slice(2) : "";

    if (filename) {
        const file = decodeURIComponent(filename);
        const fileNameElement = document.getElementById("file-name");
        const fileTypeElement = document.getElementById("file-type");
        const descriptionElement = document.getElementById("description");
        if (fileNameElement && fileTypeElement && descriptionElement) {
            const responce: any = await localUtils.GET("files/" + file, {"Authorization": "Bearer " + localUtils.getCookie("access_token")});
            fileNameElement.textContent = responce.name;
            fileTypeElement.textContent = responce.name;
            if (responce.description)
                descriptionElement.textContent = responce.description;
            else {
                descriptionElement.textContent = "No Description Available";
                descriptionElement.style.fontStyle = "italic";
                descriptionElement.style.color = "gray";
            }
        }
        if (fileTypeElement) {
            const iconClass = localUtils.getFileIcon(fileTypeElement.innerHTML);
            fileTypeElement.innerHTML = `<i class="${iconClass}"></i>`;
            fileTypeElement.style.setProperty('color', localUtils.getFileIconColor(iconClass));
        }
    }
    else {
            document.location = "../";
    }
}

async function download() {
    const hash = window.location.hash;
    const filename = hash.startsWith("#/") ? hash.slice(2) : "";
    const file_id = decodeURIComponent(filename);

    const blob = await localUtils.GETFile("files/download/" + file_id, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = file_id.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

(window as any).download = download;