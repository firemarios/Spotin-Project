var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { localUtils } from "../../code/localUtils.js";
const hash = window.location.hash;
const filename = hash.startsWith("#/") ? hash.slice(2) : "";
const file_id = decodeURIComponent(filename);
const player = document.getElementById("player");
localUtils.verifyRenewToken(true);
getFile();
function getFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localUtils.getCookie("access_token");
            if (!token) {
                console.error("❌ No access token found.");
                return;
            }
            // Get the file blob from your API
            const blob = yield localUtils.GETFile("files/download/" + file_id, { "Authorization": "Bearer " + token });
            if (!(blob instanceof Blob)) {
                console.error("❌ Expected Blob but got:", blob);
                return;
            }
            const objectUrl = URL.createObjectURL(blob);
            const mime = blob.type || "";
            console.log("📄 File type:", mime);
            if (player) {
                // Default preview using the iframe
                player.src = objectUrl;
                return;
            }
            // Fallback container if iframe doesn’t exist
            const container = document.getElementById("preview") || document.body;
            if (mime.startsWith("image/")) {
                const img = document.createElement("img");
                img.src = objectUrl;
                img.style.maxWidth = "100%";
                img.style.borderRadius = "8px";
                container.appendChild(img);
            }
            else if (mime.startsWith("video/")) {
                const video = document.createElement("video");
                video.src = objectUrl;
                video.controls = true;
                video.style.maxWidth = "100%";
                container.appendChild(video);
            }
            else if (mime.startsWith("audio/")) {
                const audio = document.createElement("audio");
                audio.src = objectUrl;
                audio.controls = true;
                container.appendChild(audio);
            }
            else if (mime === "application/pdf") {
                const iframe = document.createElement("iframe");
                iframe.src = objectUrl;
                iframe.width = "100%";
                iframe.height = "600";
                container.appendChild(iframe);
            }
            else {
                const link = document.createElement("a");
                link.href = objectUrl;
                link.download = file_id;
                link.textContent = "Download " + file_id;
                container.appendChild(link);
            }
        }
        catch (err) {
            console.error("⚠️ Error fetching or displaying file:", err);
        }
    });
}
//# sourceMappingURL=preview.js.map