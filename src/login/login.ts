import { localUtils } from "../code/localUtils";

async function login() {
    const username = (document.getElementById("username") as HTMLInputElement | null)?.value;
    const password = (document.getElementById("password") as HTMLInputElement | null)?.value;
    
    if (username && password) {
        const response: any = await localUtils.login(username, password);
        if (response.status === 200) {
            document.cookie = `access_token=${response.access_token}`
            document.cookie = `refresh_token=${response.refresh_token}`
            document.location = "../home"
        }
    }
}
(window as any).login = login;