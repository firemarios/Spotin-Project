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
const user_role_select = document.querySelector(".user-role-select");
const user_name_input = document.querySelector(".user-name-input");
const user_username_input = document.querySelector(".user-username-input");
const user_password_input = document.querySelector(".user-password-input");
const donebtn = document.querySelector(".submit-user-button");
const addbtn = document.getElementById("add");
const users = document.getElementById("users");
const add_user_form = document.getElementById("add-user-form");
localUtils.verifyRenewToken(false);
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
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield localUtils.GET("users/all", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        response.forEach((e) => {
            if (users)
                users.innerHTML += `<div id="user">
                                <p>${e.name}</p>
                                <div class="actions">
                                    <span id="edit" class="material-symbols-outlined" onclick="modifyUser(${e.id})">edit</span>
                                    <span id="delete" class="material-symbols-outlined" onclick="deleteUser(${e.id})">delete</span>
                                </div>
                            </div>`;
        });
    });
}
function openForm() {
    if (add_user_form)
        add_user_form.style.display = "flex";
}
window.openForm = openForm;
function closeForm() {
    if (add_user_form)
        add_user_form.style.display = "none";
}
window.closeForm = closeForm;
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const edit = addbtn === null || addbtn === void 0 ? void 0 : addbtn.getAttribute("edit");
        const user_id = addbtn === null || addbtn === void 0 ? void 0 : addbtn.getAttribute("user_id");
        const body = { username: user_username_input === null || user_username_input === void 0 ? void 0 : user_username_input.value, email: (user_username_input === null || user_username_input === void 0 ? void 0 : user_username_input.value) + "@example.com", name: user_name_input === null || user_name_input === void 0 ? void 0 : user_name_input.value, role: user_role_select === null || user_role_select === void 0 ? void 0 : user_role_select.value };
        if (user_password_input && user_password_input.value.trim() !== '') {
            body.password = user_password_input.value;
        }
        if (user_name_input && user_password_input && user_role_select && user_username_input && !(edit))
            yield localUtils.POST("addNewUser", { "Authorization": "Bearer " + localUtils.getCookie("access_token"), 'Content-Type': 'application/json' }, body);
        location.reload();
        getUsers();
        if (user_name_input && user_password_input && user_role_select && user_username_input && edit)
            yield localUtils.PUT(`users/${user_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token"), 'Content-Type': 'application/json' }, body);
        location.reload();
        getUsers();
    });
}
window.addUser = addUser;
function modifyUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        openForm();
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("edit", "1");
        addbtn === null || addbtn === void 0 ? void 0 : addbtn.setAttribute("user_id", user_id.toString());
        const response = yield localUtils.GET(`users/${user_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        if (user_name_input && user_password_input && user_role_select && user_username_input) {
            user_username_input.value = response.username;
            user_name_input.value = response.name;
            user_role_select.value = response.role;
        }
    });
}
window.modifyUser = modifyUser;
function deleteUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        localUtils.DELETE(`users/${user_id}`, { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        location.reload();
        getUsers();
    });
}
window.deleteUser = deleteUser;
//# sourceMappingURL=settings.js.map