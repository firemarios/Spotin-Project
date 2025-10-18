export class localUtils {
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
            default:
            return 'fa fa-file';
        }
    }
    public static getFileIconColor(iconClass: string): string {
        switch (iconClass) {
            case 'fa fa-file-image':
                return '#FF5733';
            case 'fa fa-file-video':
                return '#33C1FF'; 
            case 'fa fa-file-audio':
                return '#33FF57'; 
            case 'fa fa-file-pdf':
                return '#FF3333';
            case 'fa fa-file-alt':
                return '#AAAAAA';
            case 'fa fa-file-archive':
                return '#FF33A8';
            case 'fa fa-file-code':
                return '#8E44AD';
            case 'fa fa-file-word':
                return '#2E86C1';
            case 'fa fa-file-excel':
                return '#27AE60';
            case 'fa fa-file-powerpoint':
                return '#E67E22';
            default:
                return '#000000';
        }
    }
    public static getSideBarHTML(inner:boolean): string {
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
                <div class="page" id="setting" onclick="document.location='${inner ? "../../settings" : "../settings"}'">
                    <span class="material-symbols-outlined">settings</span>
                    <p>Ρυθμίσεις</p>
                </div>`;
    }
    public static getActionBarHTML(inner:boolean): string {
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
}

function logout(inner:boolean) {
    document.location=`${inner ? "../../login" : "../login"}`;
}
(window as any).logout = logout;

function pfpClicked() {
    const subMenu = document.querySelector('.sub-menu');
    subMenu?.classList.toggle('show-sub-menu');
}
(window as any).pfpClicked = pfpClicked;
