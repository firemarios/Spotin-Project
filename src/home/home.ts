import { localUtils } from "../code/localUtils.js";

localUtils.verifyRenewToken(false)

NavigatingTo();
getlatestFiles();
getlatestTasks();

const username_text = document.getElementById("username-text");

if (username_text)
username_text.textContent = localUtils.getCookie("name")

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

async function getlatestFiles() {
    const recent_content = document.querySelector<HTMLElement>('.recent-content');
    const response: any = await localUtils.GET("files/latest", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    if (response.length != 0) {
    response.forEach((e: any) => {
        if (recent_content)
        recent_content.innerHTML += `<div id="content-box">
                                        <div id="file-type" file_id="${e.id}"></div>
                                        <p id="file-name">${e.name}</p>
                                    </div>`
    });
    setIcons();
    } else if (recent_content) {
        recent_content.textContent = "No Recent Content Available";
        recent_content.style.fontStyle = "italic";
        recent_content.style.color = "gray";
    }
}

async function getlatestTasks() {
    const current_tasks = document.querySelector<HTMLElement>('.current-tasks');
    const response: any = await localUtils.GET("tasks/latest", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    if (response.length != 0) {
    response.forEach((e: any) => {
        if (current_tasks)
        current_tasks.innerHTML += `<div id="task-box">
                        <h3>{title}</h3>
                        <p>Δημιουργία: {date}</p>
                        <p>Προθεσμία: {date}</p>
                        <p>Μέλος: {name}</p>
                    </div>`
    });
    setIcons();
    } else if (current_tasks) {
        current_tasks.textContent = "No Tasks Available";
        current_tasks.style.fontStyle = "italic";
        current_tasks.style.color = "gray";
    }
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