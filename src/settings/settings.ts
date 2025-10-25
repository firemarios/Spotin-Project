import { localUtils } from "../code/localUtils.js";

const user_role_select = document.querySelector<HTMLSelectElement>(".user-role-select")
const user_name_input = document.querySelector<HTMLInputElement>(".user-name-input")
const user_username_input = document.querySelector<HTMLInputElement>(".user-username-input")
const user_password_input = document.querySelector<HTMLInputElement>(".user-password-input")
const donebtn = document.querySelector(".submit-user-button")
const addbtn = document.getElementById("add")
const users = document.getElementById("users")
const add_user_form = document.getElementById("add-user-form")

localUtils.verifyRenewToken(false)

NavigatingTo();
getUsers();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(false);
        const home = document.getElementById('settings');
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

async function getUsers() {
    const response:any = await localUtils.GET("users/all", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    response.forEach((e:any) => {
        if (users)
        users.innerHTML += `<div id="user">
                                <p>${e.name}</p>
                                <div class="actions">
                                    <span id="edit" class="material-symbols-outlined" onclick="modifyUser(${e.id})">edit</span>
                                    <span id="delete" class="material-symbols-outlined" onclick="deleteUser(${e.id})">delete</span>
                                </div>
                            </div>`
    });
}

function openForm() {
    if (add_user_form)
        add_user_form.style.display = "flex"
}
(window as any).openForm = openForm;

function closeForm() {
    if (add_user_form)
        add_user_form.style.display = "none"
}
(window as any).closeForm = closeForm;

async function addUser() {
    const edit = addbtn?.getAttribute("edit")
    const user_id = addbtn?.getAttribute("user_id")
    const body: any = {username: user_username_input?.value, email: user_username_input?.value + "@example.com", name: user_name_input?.value, role: user_role_select?.value}
    if (user_password_input && user_password_input.value.trim() !== '') {
        body.password = user_password_input.value
    }
    if (user_name_input && user_password_input && user_role_select && user_username_input && !(edit))
        await localUtils.POST("addNewUser", {"Authorization": "Bearer " + localUtils.getCookie("access_token"), 'Content-Type': 'application/json'}, body)
        location.reload();
        getUsers();
    if (user_name_input && user_password_input && user_role_select && user_username_input && edit)
        await localUtils.PUT(`users/${user_id}`, {"Authorization": "Bearer " + localUtils.getCookie("access_token"), 'Content-Type': 'application/json'}, body)
        location.reload();
        getUsers();
}
(window as any).addUser = addUser;

async function modifyUser(user_id:number) {
    openForm();
    addbtn?.setAttribute("edit", "1");
    addbtn?.setAttribute("user_id", user_id.toString());
    const response:any = await localUtils.GET(`users/${user_id}`, {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    if (user_name_input && user_password_input && user_role_select && user_username_input) {
        user_username_input.value = response.username;
        user_name_input.value = response.name;
        user_role_select.value = response.role;
    }
}
(window as any).modifyUser = modifyUser;

async function deleteUser(user_id:number) {
    localUtils.DELETE(`users/${user_id}`, {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    location.reload();
    getUsers();
}
(window as any).deleteUser = deleteUser;