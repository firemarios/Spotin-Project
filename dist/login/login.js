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
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const username = (_a = document.getElementById("username")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = document.getElementById("password")) === null || _b === void 0 ? void 0 : _b.value;
        if (username && password) {
            const response = yield localUtils.login(username, password);
            document.cookie = `access_token=${response.access_token}; SameSite=Lax; Path=/;`;
            document.cookie = `refresh_token=${response.refresh_token}; SameSite=Lax; Path=/;`;
            document.cookie = `username=${username}; SameSite=Lax; Path=/;`;
            getUser();
        }
    });
}
window.login = login;
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield localUtils.GET("me", { "Authorization": "Bearer " + localUtils.getCookie("access_token") });
        document.cookie = `name=${response.name}; SameSite=Lax; Path=/;`;
        document.cookie = `role=${response.role}; SameSite=Lax; Path=/;`;
        document.location = "../home";
    });
}
//# sourceMappingURL=login.js.map