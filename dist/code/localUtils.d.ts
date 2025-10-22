export declare class localUtils {
    static login(username: any, password: any): Promise<any>;
    static getFileIcon(fileName: string): string;
    static getFileIconColor(iconClass: string): string;
    static getSideBarHTML(inner: boolean): string;
    static getActionBarHTML(inner: boolean): string;
    static POST(url: string, headers: HeadersInit, body: any): Promise<any>;
    static GET(url: string, headers: HeadersInit): Promise<any>;
    static getCookie(cname: string): string;
    static verifyRenewToken(inner: boolean): Promise<boolean>;
}
//# sourceMappingURL=localUtils.d.ts.map