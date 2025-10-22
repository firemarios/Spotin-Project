import { localUtils } from "../code/localUtils.js";

localUtils.verifyRenewToken(false)

NavigatingTo();

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

const files = document.querySelectorAll<HTMLElement>('#file-type');
const file_contentBox = document.querySelectorAll<HTMLElement>('#content-box');
const file_names = document.querySelectorAll('#file-name');

if (files && file_names && file_contentBox) {
    files.forEach((element, index) => {
        const el = element as HTMLElement;
        const name = file_names[index];
        const box = file_contentBox[index];

        if (name)

        el.textContent = name.textContent;

        const iconClass = localUtils.getFileIcon(el.innerHTML);
        el.innerHTML = `<i class="${iconClass}"></i>`;
        el.style.setProperty('color', localUtils.getFileIconColor(iconClass));

        if (box)

        box.onclick = () => {
            if (name)
            document.location = "../files/view/#/" + name.textContent;
        };
    });
}