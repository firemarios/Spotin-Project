var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUtils } from "../code/localUtils.js";
localUtils.verifyRenewToken(false);
NavigatingTo();
getlatestFiles();
const username_text = document.getElementById("username-text");
if (username_text)
    username_text.textContent = localUtils.getCookie("name");
function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(false);
        const home = document.getElementById('home');
        if (home) {
            home.removeAttribute('onclick');
            home.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(false);
    }
}
function getlatestFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const recent_content = document.querySelector('.recent-content');
        const response = yield localUtils.GET("files/latest", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        response.forEach((e) => {
            if (recent_content)
                recent_content.innerHTML += `<div id="content-box">
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
            const el = element;
            const name = file_names[index];
            const box = file_contentBox[index];
            const file_id = el.getAttribute('file_id') || '';
            if (name)
                el.textContent = name.textContent;
            const iconClass = localUtils.getFileIcon(el.innerHTML);
            el.innerHTML = `<i class="${iconClass}"></i>`;
            el.style.setProperty('color', localUtils.getFileIconColor(iconClass));
            if (box)
                box.onclick = () => {
                    if (name)
                        document.location = "../files/view/#/" + file_id;
                };
        });
    }
}
//# sourceMappingURL=home.js.map