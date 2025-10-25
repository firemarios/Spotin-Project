var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiUrl, localUtils } from "../code/localUtils.js";
const hash = window.location.hash;
const dir = hash.startsWith("#/") ? hash.slice(2) : "";
localUtils.verifyRenewToken(false);
localUtils.startHashWatcher();
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
const fileViewer = document.getElementById("file-viewer");
function getFilesAndDirectories() {
    return __awaiter(this, void 0, void 0, function* () {
        const responce2 = yield localUtils.GET(`directories/?directory=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        responce2.directories.forEach((e) => {
            if (fileViewer)
                fileViewer.innerHTML += `<div id="content-box">
                                    <div id="file-type" dir="${e}">.dir</div>
                                    <p id="file-name">${e}.dir</p>
                                </div>`;
        });
        const responce = yield localUtils.GET(`files/?directory=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        responce.forEach((e) => {
            if (fileViewer)
                fileViewer.innerHTML += `<div id="content-box">
                                    <div id="file-type" file_id="${e.id}"></div>
                                    <p id="file-name">${e.name}</p>
                                </div>`;
        });
        setIcons();
    });
}
function setIcons() {
    const files = document.querySelectorAll('#file-type');
    const file_contentBox = document.querySelectorAll('#content-box');
    const file_names = document.querySelectorAll('#file-name');
    if (files && file_names && file_contentBox) {
        files.forEach((element, index) => {
            var _a;
            const el = element;
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
                name.textContent = ((_a = name.textContent.split('.')[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            if (box)
                box.onclick = () => {
                    if (dir && !(hash.startsWith("#/"))) {
                        document.location = "../files/#/" + dir;
                        location.reload();
                    }
                    else if (dir && hash.startsWith("#/")) {
                        document.location = document.location + "/" + dir;
                        location.reload();
                    }
                    else {
                        document.location = "../files/view/#/" + file_id;
                    }
                };
        });
    }
}
function fileUpload(uploading) {
    const upload_form = document.querySelector(".upload-form");
    if (upload_form && fileViewer && uploading) {
        upload_form.style.display = 'flex';
    }
    else if (upload_form && fileViewer && !(uploading)) {
        upload_form.style.display = 'none';
    }
}
window.fileUpload = fileUpload;
const progressBar = document.getElementById("uploadProgress");
const statusText = document.getElementById("status");
function uploadFileToServer() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const fileInput = document.getElementById("file-upload");
        const file = (_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            statusText.textContent = "No file selected.";
            return;
        }
        const hash = window.location.hash;
        const filename = hash.startsWith("#/") ? hash.slice(2) : "";
        const file_id = decodeURIComponent(filename);
        const url = apiUrl + `files/upload/?directory=${dir}`;
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
            }
            else {
                statusText.textContent = `Upload failed: ${xhr.status} ${xhr.statusText}`;
            }
        });
        xhr.addEventListener("error", () => {
            statusText.textContent = "Upload failed due to network error.";
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Authorization", "Bearer " + localUtils.getCookie("access_token"));
        xhr.send(formData);
    });
}
window.uploadFileToServer = uploadFileToServer;
function addDir() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = prompt("Enter Directory Name:", "");
        if (name) {
            yield localUtils.POST(`addDirectory/?current_path=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token"), 'Content-Type': 'application/json' }, { name: name });
            location.reload();
        }
    });
}
window.addDir = addDir;
function deleteDir() {
    return __awaiter(this, void 0, void 0, function* () {
        if (hash.startsWith("#/"))
            if (confirm("Do you want to delete this directory and its contents?")) {
                yield localUtils.DELETE(`deleteDirectory/?directory=${dir}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
                document.location = "./";
            }
    });
}
window.deleteDir = deleteDir;
//# sourceMappingURL=files.js.map