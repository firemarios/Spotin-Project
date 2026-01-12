export declare const apiUrl = "https://fireblocksmp.sdesignshost.gr:25575/Spotin-Project-Api/";
export declare class localUtils {
    static login(username: any, password: any): Promise<any>;
    static getFileIcon(fileName: string): string;
    static getFileIconColor(iconClass: string): string;
    static getSideBarHTML(inner: boolean): string;
    static getActionBarHTML(inner: boolean): string;
    static POST(url: string, headers: HeadersInit, body: any): Promise<any>;
    static PUT(url: string, headers: HeadersInit, body: any): Promise<any>;
    static GET(url: string, headers: HeadersInit): Promise<any>;
    static DELETE(url: string, headers: HeadersInit): Promise<any>;
    static GETFile(url: string, headers: HeadersInit): Promise<any>;
    static GETFileContent(url: string, headers: HeadersInit): Promise<any>;
    static getCookie(cname: string): string;
    static verifyRenewToken(inner: boolean, login?: boolean): Promise<boolean>;
    static getPeopleOnline(): Promise<void>;
    static startHashWatcher(): void;
}
//# sourceMappingURL=localUtils.d.ts.map