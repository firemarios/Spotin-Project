import fileIcons from "file-icons-js";

const filename = "document.pdf";
const iconClass = fileIcons.getClass(filename);

const iconElement = document.getElementById("file-type");
if (iconElement) {
  // add the class for the icon
  iconElement.className = iconClass || "fi fi-file"; 
  iconElement.textContent = filename;
}
