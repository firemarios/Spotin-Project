import { localUtils } from "../code/localUtils.js";

onNavigation();

async function onNavigation() {
    if (await localUtils.verifyRenewToken(false, true) == true) {
        document.location = "../home";
    }
}

async function login() {
    const username = (document.getElementById("username") as HTMLInputElement | null)?.value;
    const password = (document.getElementById("password") as HTMLInputElement | null)?.value;
    
   if (username && password) {
    try {
        const response: any = await localUtils.login(username, password);
        if (response.access_token && response.refresh_token) {
            document.cookie = `access_token=${response.access_token}; SameSite=Lax; Path=/;`;
            document.cookie = `refresh_token=${response.refresh_token}; SameSite=Lax; Path=/;`;
            document.cookie = `username=${username}; SameSite=Lax; Path=/;`;
            alertify.success("Loged In!")
        }
        getUser();
    } catch (error: any) {
        console.error(error);
        alertify.error(error?.message || String(error));
        }
    }
}
(window as any).login = login;

async function getUser() {    
    const response: any = await localUtils.GET("me", {"Authorization": "Bearer " + localUtils.getCookie("access_token")})
    document.cookie = `name=${response.name}; SameSite=Lax; Path=/;`
    document.cookie = `role=${response.role}; SameSite=Lax; Path=/;`
    document.location = "../home"
}

function showPass() {
    const show = (document.getElementById("show"));
    const password = (document.getElementById("password") as HTMLInputElement);

    if (password.type == "password" && show) {
        password.type = 'text'
        show.innerHTML = "Hide Password"
    } else if (password.type == "text" && show) {
        password.type = 'password'
        show.innerHTML = "Show Password"
    }
}
(window as any).showPass = showPass;