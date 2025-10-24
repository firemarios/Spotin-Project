import { apiUrl, localUtils } from "../code/localUtils.js";

const hash = window.location.hash;
const dir = hash.startsWith("#/") ? hash.slice(2) : "";

localUtils.verifyRenewToken(false)

NavigatingTo();
getFilesAndDirectories();

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
    localUtils.getPeopleOnline();
}

const fileViewer = document.getElementById("file-viewer")

async function getFilesAndDirectories() {
    const responce2:any = await localUtils.GET(`directories/?directory=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") })
    responce2.directories.forEach((e:any) => {
        if (fileViewer)
        fileViewer.innerHTML += `<div id="content-box">
                                    <div id="file-type" dir="${e}">.dir</div>
                                    <p id="file-name">${e}.dir</p>
                                </div>`
    });
    const responce:any = await localUtils.GET(`files/?directory=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") })
    responce.forEach((e:any) => {
        if (fileViewer)
        fileViewer.innerHTML += `<div id="content-box">
                                    <div id="file-type" file_id="${e.id}"></div>
                                    <p id="file-name">${e.name}</p>
                                </div>`
    });
    setIcons();
}

function setIcons() {
    const files = document.querySelectorAll<HTMLElement>('#file-type');
    const file_contentBox = document.querySelectorAll<HTMLElement>('#content-box');
    const file_names = document.querySelectorAll('#file-name');

    if (files && file_names && file_contentBox) {
        files.forEach((element, index) => {
            const el = element as HTMLElement;
            const name = file_names[index];
            const box = file_contentBox[index];
            const file_id = el.getAttribute('file_id') || '';
            const dir = el.getAttribute('dir') || '';

            if (name)

            el.textContent = name.textContent;

            const iconClass = localUtils.getFileIcon(el.innerHTML);
            el.innerHTML = `<i class="${iconClass}"></i>`;
            el.style.setProperty('color', localUtils.getFileIconColor(iconClass));
            if (name && dir)
                name.textContent = name.textContent.split('.')[0]?.toLowerCase() || '';

            if (box)

            box.onclick = () => {
                if (dir) {
                    document.location = "../files/#/" + dir;
                    location.reload();
                }
                else {
                    document.location = "../files/view/#/" + file_id;
                }
            };
        });
    }
}

function fileUpload(uploading : boolean) {
    const upload_form = document.querySelector<HTMLElement>(".upload-form");

    if (upload_form && fileViewer && uploading) {
        upload_form.style.display = 'flex';
    }
    else if (upload_form && fileViewer && !(uploading)) {
        upload_form.style.display = 'none';
    }
}
(window as any).fileUpload = fileUpload;

const progressBar = document.getElementById("uploadProgress") as HTMLProgressElement;
const statusText = document.getElementById("status") as HTMLDivElement;

async function uploadFileToServer() {
    const fileInput = document.getElementById("file-upload") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) {
        statusText.textContent = "No file selected.";
        return;
    }

    const hash = window.location.hash;
    const filename = hash.startsWith("#/") ? hash.slice(2) : "";
    const file_id = decodeURIComponent(filename);
    const url = apiUrl + "files/upload/";

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.value = percentComplete;
            statusText.textContent = `Uplitoading... ${Math.round(percentComplete)}%`;
        }
    });

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            statusText.textContent = "Upload successful!";
            progressBar.value = 100;
            fileUpload(false); // Hide the upload form
            location.reload();
        } else {
            statusText.textContent = `Upload failed: ${xhr.status} ${xhr.statusText}`;
        }
    });

    xhr.addEventListener("error", () => {
        statusText.textContent = "Upload failed due to network error.";
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", "Bearer " + localUtils.getCookie("access_token"));
    xhr.send(formData);
}
(window as any).uploadFileToServer = uploadFileToServer;