const settingsButton = document.querySelector(".settings-button");
const settingsMenu = document.querySelector(".settings-menu");

settingsButton.addEventListener("click", () => {
	settingsMenu.showModal();
});

settingsMenu.addEventListener("click", (event) => {
	if (event.target === settingsMenu) {
		settingsMenu.close();
	}
});

const messageForm = document.querySelector(".form");
const messageInput = document.querySelector(".message");
const templateMessage = document.querySelector("#template-message");

const chatDisplay = document.querySelector(".chat");
const wrap = document.querySelector(".wrap");

function getTime() {
	const time = new Date();
	return `${time.getHours()}:${time.getMinutes()}`;
}

function validator(text) {
	return text !== "" && text.trim() !== "";
}

function createMyMessage(message) {
	const myNewMessage = document.createElement("div");
	myNewMessage.append(templateMessage.content.cloneNode(true));
	myNewMessage.classList.add("chat-message", "sent-message");
	myNewMessage.querySelector(".chat-message_text").textContent = message;
	myNewMessage.querySelector(".chat-message_time").textContent = getTime();
	chatDisplay.append(myNewMessage);
}

function render(event) {
	event.preventDefault();

	const messageText = messageInput.value;
	messageInput.value = "";

	if (!validator(messageText)) {
		console.log("Error! Message is empty!");
		return;
	}
	createMyMessage(messageText);

	wrap.scrollTop = wrap.scrollHeight;
}

messageForm.addEventListener("submit", render);

// function createOtherMessage(message) {
// 	const myNewMessage = document.createElement("div");
// 	myNewMessage.append(templateMessage.content.cloneNode(true));
// 	myNewMessage.classList.add("chat-message", "received-message");
// 	myNewMessage.querySelector(".chat-message_text").textContent = message;
// 	chatDisplay.append(myNewMessage);
// }

// setInterval(() => createOtherMessage("some text"), 2000);
