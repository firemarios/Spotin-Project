import { localUtils } from "../../code/localUtils.js";
import * as monaco from "../../monaco-editor/esm/vs/editor/editor.api";

NavigatingTo();

function NavigatingTo() {
    const actionBar = document.querySelector('.action-bar');
    const pages = document.querySelector('.pages');
    if (pages) {
        pages.innerHTML = localUtils.getSideBarHTML(true);
        const tasks = document.getElementById('files');
        if (tasks) {
            tasks.removeAttribute('onclick');
            tasks.classList.add('disabled');
        }
    }
    if (actionBar) {
        actionBar.innerHTML = localUtils.getActionBarHTML(true);
        let innerHTML = actionBar.innerHTML;
        innerHTML = innerHTML.replace("false", "true");
        actionBar.innerHTML = innerHTML;
    }
}

const editor = monaco.editor.create(document.getElementById("editor")!, {
  value: `// Start typing here...\nconsole.log("Hello world!");`,
  language: "typescript",
  theme: "vs-dark",
  automaticLayout: true,
});