var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUtils } from "../../code/localUtils.js";
import { apiUrl } from "../../code/localUtils.js";
localUtils.verifyRenewToken(true);
let file_name;
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
function getFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = window.location.hash;
        const filename = hash.startsWith("#/") ? hash.slice(2) : "";
        if (filename) {
            const file = decodeURIComponent(filename);
            const fileTypeElement = document.getElementById("file-type");
            const fileNameElement = document.getElementById("file-name");
            const descriptionElement = document.getElementById("description");
            if (fileNameElement && fileTypeElement && descriptionElement) {
                const responce = yield localUtils.GET("files/" + file, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
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
                file_name = fileTypeElement === null || fileTypeElement === void 0 ? void 0 : fileTypeElement.innerHTML;
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
    });
}
const hash = window.location.hash;
const filename = hash.startsWith("#/") ? hash.slice(2) : "";
const file_id = decodeURIComponent(filename);
function download() {
    return __awaiter(this, void 0, void 0, function* () {
        const blob = yield localUtils.GETFile("files/download/" + file_id, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file_id.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });
}
window.download = download;
function fileUpload(uploading) {
    const upload_form = document.querySelector(".upload-form");
    if (upload_form && uploading) {
        upload_form.style.display = 'flex';
    }
    else if (upload_form && !(uploading)) {
        upload_form.style.display = 'none';
    }
}
window.fileUpload = fileUpload;
function replace() {
    fileUpload(true);
}
window.replace = replace;
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
            }
            else {
                statusText.textContent = `Upload failed: ${xhr.status} ${xhr.statusText}`;
            }
        });
        xhr.addEventListener("error", () => {
            statusText.textContent = "Upload failed due to network error.";
        });
        xhr.open("PUT", url);
        xhr.setRequestHeader("Authorization", "Bearer " + localUtils.getCookie("access_token"));
        xhr.send(formData);
    });
}
window.uploadFileToServer = uploadFileToServer;
function fdelete() {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = window.location.hash;
        const filename = hash.startsWith("#/") ? hash.slice(2) : "";
        const file_id = decodeURIComponent(filename);
        yield localUtils.DELETE("files/delete/?file_id=" + file_id, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        location.reload();
        getFile();
    });
}
window.fdelete = fdelete;
function save() {
    return __awaiter(this, void 0, void 0, function* () {
        const description = document.getElementById("descriptionIn");
        yield localUtils.PUT(`files/modify/?file_id=${file_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token"), "Content-Type": "application/json" }, { description: description.value });
        location.reload();
    });
}
window.save = save;
function preview() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const ext = (_a = file_name === null || file_name === void 0 ? void 0 : file_name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (ext == "link") {
            const responce = yield localUtils.GETFileContent(`files/download/${file_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
            window.open(responce);
        }
        else {
            window.open("../preview#/" + file_id);
        }
    });
}
window.preview = preview;
//# sourceMappingURL=view.js.map