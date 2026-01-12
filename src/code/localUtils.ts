export const apiUrl = "https://fireblocksmp.sdesignshost.gr:25575/Spotin-Project-Api/"

export class localUtils {
    static login(username: any, password: any) {
        return loginLocal(username, password);
    }
    public static getFileIcon(fileName: string): string {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (!ext) return 'fa fa-file';

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
            case 'link':
            return 'fa fa-link';
            default:
            return 'fa fa-file';
        }
    }
    public static getFileIconColor(iconClass: string): string {
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
    public static getSideBarHTML(inner:boolean): string {
        let sidebar =`<div class="page" id="home" onclick="document.location='${inner ? "../../home" : "../home"}'">
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
                        </div>`
        return sidebar;
    }
    public static getActionBarHTML(inner:boolean): string {
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
    public static POST(url: string, headers: HeadersInit, body: any): Promise<any> {
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
    public static PUT(url: string, headers: HeadersInit, body: any): Promise<any> {
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
    public static GET(url: string, headers: HeadersInit): Promise<any> {
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
    public static DELETE(url: string, headers: HeadersInit): Promise<any> {
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
    public static GETFile(url: string, headers: HeadersInit): Promise<any> {
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
    public static GETFileContent(url: string, headers: HeadersInit): Promise<any> {
        return fetch(apiUrl + url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text()
        });
    }
    public static getCookie(cname:string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
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
    public static async verifyRenewToken(inner: boolean, login?: boolean): Promise<boolean> {
    localUtils.GET("me", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    const access_token = localUtils.getCookie("access_token") ?? "0";
    const refresh_token = localUtils.getCookie("refresh_token") ?? "0";
    const response: any = await localUtils.POST("verify_token?token=" + access_token, {'accept': 'application/json'}, {});

    if (response.valid) {
        console.log("Access token valid");
        return true; // access token is fine
    }

    // access token not valid, check refresh token
    const response2: any = await localUtils.POST("verify_token?token=" + refresh_token, {'accept': 'application/json'}, {});
    
    if (response2.valid && refresh_token !== undefined) {
        // refresh token is valid → get new access token
        const response3: any = await localUtils.POST("refresh?token=" + refresh_token, {'accept': 'application/json'}, {});
        document.cookie = `access_token=${response3.access_token}; Path=/; SameSite=Lax;`;
        document.cookie = `refresh_token=${response3.refresh_token}; Path=/; SameSite=Lax;`;
        console.log("Access token renewed");
        location.reload();
        return true;
    } else {
        // refresh token invalid → logout
        if (!login)
            logout(inner);
        console.log("Tokens invalid, logging out");
        return false;
    }
    }
    public static async getPeopleOnline() {
    const peopleOnline = document.getElementById("peopleOnline")
    const responce:any = await localUtils.GET("users/online", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    if (peopleOnline) {
        if (responce.length == 1)
            peopleOnline.textContent = responce.length + " Person Online"
        else
            peopleOnline.textContent = responce.length + " People Online"
    }
}
    public static startHashWatcher() {
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

function logout(inner:boolean) {
    document.cookie = `access_token=undefined; SameSite=Lax; Path=/;`
    document.cookie = `refresh_token=undefined; SameSite=Lax; Path=/;`
    document.location=`${inner ? "../../login" : "../login"}`;
}
(window as any).logout = logout;

function pfpClicked() {
    const subMenu = document.querySelector('.sub-menu');
    subMenu?.classList.toggle('show-sub-menu');
}
(window as any).pfpClicked = pfpClicked;

async function loginLocal(username:string, password:string) {
    const response = await fetch(apiUrl + "login", {
    method: 'POST',
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });   
    if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

