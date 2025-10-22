import { localUtils } from "../code/localUtils.js";

localUtils.verifyRenewToken(false)

NavigatingTo();
getlatestFiles();

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
}

async function getlatestFiles() {
    const recent_content = document.querySelector('.recent-content');
    const response: any = await localUtils.GET("files/latest", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    response.forEach((e: any) => {
        if (recent_content)
        recent_content.innerHTML += `<div id="content-box">
                                        <div id="file-type" directory="${e.directory}"></div>
                                        <p id="file-name">${e.name}</p>
                                    </div>`
    });
    setIcons();
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
            const directory = el.getAttribute('directory') || '';

            if (name)

            el.textContent = name.textContent;

            const iconClass = localUtils.getFileIcon(el.innerHTML);
            el.innerHTML = `<i class="${iconClass}"></i>`;
            el.style.setProperty('color', localUtils.getFileIconColor(iconClass));

            if (box)

            box.onclick = () => {
                if (name)
                document.location = "../files/view/#/" + directory + "/" + name.textContent;
            };
        });
    }
}