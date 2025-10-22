import { get } from "http";
import { localUtils } from "../code/localUtils";

async function login() {
    const username = (document.getElementById("username") as HTMLInputElement | null)?.value;
    const password = (document.getElementById("password") as HTMLInputElement | null)?.value;
    
    if (username && password) {
        const response: any = await localUtils.login(username, password);
        document.cookie = `access_token=${response.access_token}; SameSite=Strict;`
        document.cookie = `refresh_token=${response.refresh_token}; SameSite=Strict;`
        document.cookie = `username=${username}; SameSite=Strict;`
        getUser();
}
}
(window as any).login = login;

function getUser() {    
    console.log(localUtils.GET("me", {"Authorization": "Bearer " + localUtils.getCookie("access_token")}))
}