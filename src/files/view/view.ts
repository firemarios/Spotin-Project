import { localUtils } from "../../code/localUtils.js";
import { apiUrl } from "../../code/localUtils.js";

localUtils.verifyRenewToken(true)

NavigatingTo();
getFile();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(true);
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(true);
        let innerHTML = actionBar.innerHTML;
        innerHTML = innerHTML.replace("false", "true");
        actionBar.innerHTML = innerHTML;
    }
    localUtils.getPeopleOnline();
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
            if (responce.name == "Error")
                document.location = "../";
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

const hash = window.location.hash;
const filename = hash.startsWith("#/") ? hash.slice(2) : "";
const file_id = decodeURIComponent(filename);

async function download() {
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

function fileUpload(uploading : boolean) {
    const upload_form = document.querySelector<HTMLElement>(".upload-form");

    if (upload_form && uploading) {
        upload_form.style.display = 'flex';
    }
    else if (upload_form && !(uploading)) {
        upload_form.style.display = 'none';
    }
}
(window as any).fileUpload = fileUpload;

function replace() {
    fileUpload(true);
}
(window as any).replace = replace;

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
    const url = apiUrl + "files/replace/";

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressBar.value = percentComplete;
            statusText.textContent = `Uploading... ${Math.round(percentComplete)}%`;
        }
    });

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            statusText.textContent = "Upload successful!";
            progressBar.value = 100;
            fileUpload(false); // Hide the upload form
            getFile(); // Refresh the file info
        } else {
            statusText.textContent = `Upload failed: ${xhr.status} ${xhr.statusText}`;
        }
    });

    xhr.addEventListener("error", () => {
        statusText.textContent = "Upload failed due to network error.";
    });

    xhr.open("PUT", url);
    xhr.setRequestHeader("Authorization", "Bearer " + localUtils.getCookie("access_token"));
    xhr.send(formData);
}
(window as any).uploadFileToServer = uploadFileToServer;

async function fdelete() {
    const hash = window.location.hash;
    const filename = hash.startsWith("#/") ? hash.slice(2) : "";
    const file_id = decodeURIComponent(filename);

    await localUtils.DELETE("files/delete/?file_id=" + file_id, { "Authorization": "Bearer " + localUtils.getCookie("access_token") })
    location.reload();
    getFile();
}
(window as any).fdelete = fdelete;

async function save() {
    const description = document.getElementById("descriptionIn") as HTMLInputElement;
    await localUtils.PUT(`files/modify/?file_id=${file_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token"), "Content-Type": "application/json" }, {description: description.value})
    location.reload();
}
(window as any).save = save;

function preview() {
    window.open("../preview#/" + file_id)
}
(window as any).preview = preview;