const settingsButton = document.querySelector(".settings-button");
const logoutButton = document.querySelector(".logout-button");

const confirmCloseBtn = document.querySelector(".confirm-close");
const settingsCloseBtn = document.querySelector(".settings-close");
const closeButtons = document.querySelectorAll(".cross-icon");

const inputCodeButton = document.querySelector(".form__input-code-button");
const confirmCodeButton = document.querySelector(".form__confirm-code-button");

const settingsWindow = document.getElementById("settings");
const autorizationWindow = document.getElementById("autorization");
const confirmWindow = document.getElementById("confirm");

settingsButton.addEventListener("click", function () {
	settingsWindow.classList.add("show-modal-window");
});

logoutButton.addEventListener("click", function () {
	autorizationWindow.classList.add("show-modal-window");
});

confirmCloseBtn.addEventListener("click", (event) => {
	event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove(
		"show-modal-window",
	);
	autorizationWindow.classList.add("show-modal-window");
});

settingsCloseBtn.addEventListener("click", (event) => {
	event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.remove(
		"show-modal-window",
	);
});

inputCodeButton.addEventListener("click", function () {
	confirmWindow.classList.add("show-modal-window");
	autorizationWindow.classList.remove("show-modal-window");
});

confirmCodeButton.addEventListener("click", function () {
	confirmWindow.classList.remove("show-modal-window");
	autorizationWindow.classList.remove("show-modal-window");
});

const messageTextarea = document.getElementById("message-textarea");

window.onload = function () {
	messageTextarea.value = "";
	messageTextarea.style.height = "28px";
};

messageTextarea.addEventListener("input", function () {

	this.style.height = `${this.scrollHeight}px`;

	if (messageTextarea.value === "") {
		this.style.height = "28px";
	}

	if (this.scrollHeight === 290) {
		messageTextarea.style.overflowY = "hidden";
	}

	if (this.scrollHeight === 308) {
		messageTextarea.style.overflowY = "auto";
	}
});
