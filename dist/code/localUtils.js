var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const apiUrl = "https://fireblocksmp.sdesignshost.gr:25575/";
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
            case 'dir':
                return 'fa fa-folder';
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
        let sidebar = `<div class="page" id="home" onclick="document.location='${inner ? "../../home" : "../home"}'">
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
                        </div>`;
        if (localUtils.getCookie("role") == "admin")
            sidebar += `<div class="page" id="settings" onclick="document.location='${inner ? "../../settings" : "../settings"}'">
                            <span class="material-symbols-outlined">settings</span>
                            <p>Ρυθμίσεις</p>
                        </div>`;
        return sidebar;
    }
    static getActionBarHTML(inner) {
        return `<img src="${inner ? "../../assets/logo.png" : "../assets/logo.png"}" alt="Logo" class="logo">
            <div>
                <p id="peopleOnline"></p>
                <img src="${inner ? "../../assets/user.png" : "../assets/user.png"}" alt="User" class="user-icon" onclick="pfpClicked()">
                <div class="sub-menu">
                    <button onclick="logout(false)">Logout</button>
                </div>
            </div>
            <script src="${inner ? "../../code/localUtils.js" : "../code/localUtils.js"}"></script>`;
    }
    static POST(url, headers, body) {
        return fetch(apiUrl + url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) {
                return new Error(`HTTP error! status: ${response.status} ${response.statusText} ${response}`);
            }
            return response.json();
        });
    }
    static PUT(url, headers, body) {
        return fetch(apiUrl + url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => {
            if (!response.ok) {
                return new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
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
                return new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    }
    static DELETE(url, headers) {
        return fetch(apiUrl + url, {
            method: 'DELETE',
            headers: headers
        }).then(response => {
            if (!response.ok) {
                return new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
    }
    static GETFile(url, headers) {
        return fetch(apiUrl + url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        });
    }
    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c)
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
            if (c)
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
        }
        return "";
    }
    static verifyRenewToken(inner) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            localUtils.GET("me", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
            const access_token = (_a = localUtils.getCookie("access_token")) !== null && _a !== void 0 ? _a : "0";
            const refresh_token = (_b = localUtils.getCookie("refresh_token")) !== null && _b !== void 0 ? _b : "0";
            const response = yield localUtils.POST("verify_token?token=" + access_token, { 'accept': 'application/json' }, {});
            if (response.valid) {
                return true; // access token is fine
            }
            // access token not valid, check refresh token
            const response2 = yield localUtils.POST("verify_token?token=" + refresh_token, { 'accept': 'application/json' }, {});
            if (response2.valid && refresh_token !== undefined) {
                // refresh token is valid → get new access token
                const response3 = yield localUtils.POST("refresh?token=" + refresh_token, { 'accept': 'application/json' }, {});
                document.cookie = `access_token=${response3.access_token}; Path=/; SameSite=Lax;`;
                document.cookie = `refresh_token=${response3.refresh_token}; Path=/; SameSite=Lax;`;
                return true;
            }
            else {
                // refresh token invalid → logout
                logout(inner);
                return false;
            }
        });
    }
    static getPeopleOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            const peopleOnline = document.getElementById("peopleOnline");
            const responce = yield localUtils.GET("users/online", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
            if (peopleOnline) {
                if (responce.length == 1)
                    peopleOnline.textContent = responce.length + " Person Online";
                else
                    peopleOnline.textContent = responce.length + " People Online";
            }
        });
    }
    static startHashWatcher() {
        let lastHash = location.hash;
        window.addEventListener("hashchange", () => {
            const newHash = location.hash;
            if (newHash !== lastHash) {
                location.reload();
                lastHash = newHash;
            }
        });
    }
}
function logout(inner) {
    document.cookie = `access_token=undefined; SameSite=Lax; Path=/;`;
    document.cookie = `refresh_token=undefined; SameSite=Lax; Path=/;`;
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
        return response.json();
    });
}
//# sourceMappingURL=localUtils.js.map