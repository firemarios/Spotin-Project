var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrl = "http://127.0.0.1:8000/";
export class localUtils {
    static login(username, password) {
        return loginLocal(username, password);
    }
    static getFileIcon(fileName) {
        var _a;
        const ext = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!ext)
            return 'fa fa-file';
        switch (ext) {
            case 'png':
            case 'jpg':
            case 'jpeg':
            case 'gif':
                return 'fa fa-file-image';
            case 'mp4':
            case 'mov':
            case 'avi':
                return 'fa fa-file-video';
            case 'mp3':
            case 'wav':
            case 'flac':
                return 'fa fa-file-audio';
            case 'pdf':
                return 'fa fa-file-pdf';
            case 'txt':
            case 'md':
            case 'log':
                return 'fa fa-file-alt';
            case 'zip':
            case 'rar':
            case '7z':
                return 'fa fa-file-archive';
            case 'html':
            case 'htm':
                return 'fa fa-file-code';
            case 'js':
            case 'ts':
            case 'css':
                return 'fa fa-file-code';
            case 'doc':
            case 'docx':
            case 'odt':
                return 'fa fa-file-word';
            case 'xls':
            case 'xlsx':
                return 'fa fa-file-excel';
            case 'ppt':
            case 'pptx':
                return 'fa fa-file-powerpoint';
            default:
                return 'fa fa-file';
        }
    }
    static getFileIconColor(iconClass) {
        switch (iconClass) {
            case 'fa fa-file-image':
                return '#FF5733';
            case 'fa fa-file-video':
                return '#217498ff';
            case 'fa fa-file-audio':
                return '#25b580ff';
            case 'fa fa-file-pdf':
                return '#e5252a';
            case 'fa fa-file-alt':
                return '#AAAAAA';
            case 'fa fa-file-archive':
                return '#FF33A8';
            case 'fa fa-file-code':
                return '#6000c6';
            case 'fa fa-file-word':
                return '#0363d1';
            case 'fa fa-file-excel':
                return '#00733a';
            case 'fa fa-file-powerpoint':
                return '#df3303';
            default:
                return '#4a4a4aff';
        }
    }
    static getSideBarHTML(inner) {
        return `<div class="page" id="home" onclick="document.location='${inner ? "../../home" : "../home"}'">
                    <span class="material-symbols-outlined">home</span>
                    <p>Αρχική</p>
                </div>
                <div class="page" id="tasks" onclick="document.location='${inner ? "../../tasks" : "../tasks"}'">
                    <span class="material-symbols-outlined">assignment</span>
                    <p>Εργασίες</p>
                </div>
                <div class="page" id="files" onclick="document.location='${inner ? "../../files" : "../files"}'">
                    <span class="material-symbols-outlined">files</span>
                    <p>Αρχεία</p>
                </div>
                <div class="page" id="settings" onclick="document.location='${inner ? "../../settings" : "../settings"}'">
                    <span class="material-symbols-outlined">settings</span>
                    <p>Ρυθμίσεις</p>
                </div>`;
    }
    static getActionBarHTML(inner) {
        return `<img src="${inner ? "../../assets/logo.png" : "../assets/logo.png"}" alt="Logo" class="logo">
            <div>
                <p>{n} People online</p>
                <img src="${inner ? "../../assets/user.png" : "../assets/user.png"}" alt="User" class="user-icon" onclick="pfpClicked()">
                <div class="sub-menu">
                    <button onclick="logout(false)">Logout</button>
                </div>
            </div>
            <script src="${inner ? "../../code/localUtils.js" : "../code/localUtils.js"}"></script>`;
    }
    static POST(url, headers, body) {
        console.log("POST Request to:", url);
        console.log("With body:", body);
        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) {
                console.log("Response received:", response);
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
    }
    static GET(url, headers) {
        return fetch(apiUrl + url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    }
    static getCookie(name) {
        var _a;
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const parts = cookie.trim().split('=');
            const key = parts[0];
            const value = (_a = parts[1]) !== null && _a !== void 0 ? _a : null; // handle undefined safely
            if (key === name && value !== null) {
                return decodeURIComponent(value);
            }
        }
        return null;
    }
}
function logout(inner) {
    document.location = `${inner ? "../../login" : "../login"}`;
}
window.logout = logout;
function pfpClicked() {
    const subMenu = document.querySelector('.sub-menu');
    subMenu === null || subMenu === void 0 ? void 0 : subMenu.classList.toggle('show-sub-menu');
}
window.pfpClicked = pfpClicked;
function loginLocal(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiUrl + "login", {
            method: 'POST',
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        });
        if (!response.ok) {
            throw new Error(`Login failed: ${response.status} ${response.statusText}`);
        }
        document.cookie = `responce_code=${response.status}`;
        return response.json();
    });
}
//# sourceMappingURL=localUtils.js.map