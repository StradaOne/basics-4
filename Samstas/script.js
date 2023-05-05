const textArea = document.getElementById("text-area"); // text area
const clearButton = document.getElementById("button-clear"); // button

// value in textarea must to save
function saveText() {
  const textValue = textArea.value;
  localStorage.setItem("text", textValue);
}

textArea.addEventListener("input", saveText);
// Button to clear text area
clearButton.onclick = function () {
  // Delete value from localStorage
  localStorage.removeItem("text");

  // clear value of textarea
  textArea.value = "";
};

textArea.value = localStorage.getItem("text") || "";
