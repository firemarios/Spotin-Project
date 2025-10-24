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
getlatestTasks();
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
    localUtils.getPeopleOnline();
}
function getlatestFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const recent_content = document.querySelector('.recent-content');
        const response = yield localUtils.GET("files/latest", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        if (response.length != 0) {
            response.forEach((e) => {
                if (recent_content)
                    recent_content.innerHTML += `<div id="content-box">
                                        <div id="file-type" file_id="${e.id}"></div>
                                        <p id="file-name">${e.name}</p>
                                    </div>`;
            });
            setIcons();
        }
        else if (recent_content) {
            recent_content.textContent = "No Recent Content Available";
            recent_content.style.fontStyle = "italic";
            recent_content.style.color = "gray";
        }
    });
}
function getlatestTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const current_tasks = document.querySelector('.current-tasks');
        const response = yield localUtils.GET("tasks/latest", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        if (response.length != 0) {
            response.forEach((e) => {
                e.assignees.forEach((c) => {
                    if (current_tasks) {
                        let create_date = e.created_date;
                        create_date = create_date.substring(0, 10);
                        current_tasks.innerHTML += `<div id="task-box">
                            <h3>${e.name}</h3>
                            <p>Δημιουργία: ${create_date}</p>
                            <p>Προθεσμία: ${e.due_date}</p>
                            <p>Μέλος: ${c.name}</p>
                        </div>`;
                    }
                });
            });
            setIcons();
        }
        else if (current_tasks) {
            current_tasks.textContent = "No Tasks Available";
            current_tasks.style.fontStyle = "italic";
            current_tasks.style.color = "gray";
        }
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