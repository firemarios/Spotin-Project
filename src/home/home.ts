import { localUtils } from "../code/localUtils.js";

const file = document.getElementById('file-type')?.innerText;
console.log(file);

if (file) {
    const file_type = document.getElementById('file-type');
    const iconClass = localUtils.getFileIcon(file);
    console.log(`${file}: ${iconClass}`);
    if (file_type)
        file_type.innerHTML = `<i class="${iconClass}"></i>`;;
        file_type?.style.setProperty('color', localUtils.getFileIconColor(iconClass));
}
