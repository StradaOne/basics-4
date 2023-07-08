import Cookies from "js-cookie";
import {
	render,
	Element,
	ElementWithEvent,
	Div,
	Span,
	Paragraph,
	Image,
	Form,
	Button,
	Input,
	Label,
} from "./DOM_render";
import { variables, apiVariables } from "./ui_variables";
import { saveToLocalStorage, loadFromLocalStorage, emailValidate } from "./utiles";
import { codeFetch, changeNameFetch, getUserInfoFetch } from "./api_requests";
import { closeConnectionWs, connectWs } from "./websocket";
import { showMessageHistory } from "./message";

export let theme = loadFromLocalStorage("chatAppTheme") || "light";

const popupAreaHandler = (e) => {
	if (e.target === variables.popup) {
		variables.popup.style.display = "none";
		// const popupCloseBtn = document.querySelector(".popup-close-btn");
		// const themeBtn = document.querySelector("#theme-btn");
		// variables.popup.removeEventListener("click", popupAreaHandler);
		// popupCloseBtn.removeEventListener("click", popupCloseBtnHandler);
		// themeBtn.removeEventListener("click", themeBtnHandler);
		variables.popupWindow.innerHTML = "";
	}
};

const popupCloseBtnHandler = () => {
	variables.popup.style.display = "none";
	// const popupCloseBtn = document.querySelector(".popup-close-btn");
	// const themeBtn = document.querySelector("#theme-btn");
	// variables.popup.removeEventListener("click", popupAreaHandler);
	// popupCloseBtn.removeEventListener("click", popupCloseBtnHandler);
	// themeBtn.removeEventListener("click", themeBtnHandler);
	variables.popupWindow.innerHTML = "";
};

const themeBtnHandler = (e) => {
	changeTheme(e.target);
	variables.popup.style.display = "none";
	variables.popupWindow.innerHTML = "";
};
const getCodeBtnHandler = async (e) => {
	e.preventDefault();
	const inputEmailValue = document.querySelector(".email-input").value;
	const authorizationMessageNode = document.querySelector(".authorization-message");
	if (emailValidate(inputEmailValue)) {
		const answer = await codeFetch(inputEmailValue);
		if (answer === true) {
			authorizationMessageNode.textContent = "Код отправлен на email";
			authorizationMessageNode.classList.remove("authorization-message-visible-wrong");
			authorizationMessageNode.classList.add("authorization-message-visible-ok");
		} else {
			console.log(answer);
			authorizationMessageNode.textContent = `Ошибка запроса: ${answer}`;
			authorizationMessageNode.classList.add("authorization-message-visible-wrong");
		}
	} else {
		authorizationMessageNode.textContent = "Email введён неверно";
		authorizationMessageNode.classList.add("authorization-message-visible-wrong");
	}
};

const enterCodeBtnHandler = (e) => {
	e.preventDefault();
	variables.popupWindow.innerHTML = "";
	render(popupConfirmation, variables.popupWindow);
	const inputCode = document.querySelector(".confirmation-input");
	inputCode.focus();
};

const enterConfirmationBtnHandler = async (e) => {
	e.preventDefault();
	const nickname = Cookies.get(apiVariables.nickname);
	const inputCodeValue = document.querySelector(".confirmation-input").value;
	const user = await getUserInfoFetch(inputCodeValue);
	console.log(user);
	if (user === false || user.message === "Authentication failed!") {
		const messageNode = document.querySelector(".authorization-message");
		messageNode.textContent = `Неверный код`;
		messageNode.classList.add("authorization-message-visible-wrong");
		return;
	}
	Cookies.set(apiVariables.tokenCookieName, inputCodeValue, { expires: 30 });
	Cookies.set(apiVariables.email, user.email, { expires: 30 });
	if (!nickname) {
		variables.popup.style.display = "none";
		variables.popupWindow.innerHTML = "";
		render(popupSettings, variables.popupWindow);
		const inputNickname = document.querySelector(".nickname-input");
		const messageNode = document.querySelector(".authorization-message");
		messageNode.textContent = `Необходимо ввести имя`;
		messageNode.classList.add("authorization-message-visible-wrong");
		variables.popup.style.display = "flex";
		inputNickname.focus();
		return;
	}
	variables.popup.style.display = "none";
	variables.popupWindow.innerHTML = "";
};

const nicknameBtnHandler = async (e) => {
	// debugger;
	e.preventDefault();
	const token = Cookies.get(apiVariables.tokenCookieName);
	const nickname = Cookies.get(apiVariables.nickname);
	const messageNode = document.querySelector(".authorization-message");
	if (!token) {
		messageNode.textContent = `Необходимо сначала авторизоваться`;
		messageNode.classList.add("authorization-message-visible-wrong");
		return;
	}
	if (!nickname) {
		messageNode.textContent = `Необходимо ввести имя`;
		messageNode.classList.add("authorization-message-visible-wrong");
	}
	const inputNicknameValue = document.querySelector(".nickname-input").value;
	await changeNameFetch(inputNicknameValue);
	const user = await getUserInfoFetch(token);
	Cookies.set(apiVariables.nickname, user.name, { expires: 30 });
	variables.popup.style.display = "none";
	variables.popupWindow.innerHTML = "";
	closeConnectionWs();
	connectWs(token);
	showMessageHistory();
	variables.messagesField.scrollTop += 1e9;
};

export const popupSettings = [
	new Div({
		className: "popup-header",
		content: [
			new Paragraph({
				className: "head",
				content: "Настройки",
			}),
			new Button({
				className: "popup-close-btn",
				event: "click",
				callback: popupCloseBtnHandler,
			}),
		],
	}),

	new Form({
		className: "popup-form",
		content: [
			new Div({
				content: "Имя в чате:",
			}),
			new Input({
				className: "nickname-input",
			}),
			new Button({
				className: "popup-nickname-btn",
				attribute: "type",
				attValue: "submit",
				event: "click",
				callback: nicknameBtnHandler,
			}),
			new Div({
				className: "authorization-message",
			}),
		],
	}),
	new Label({
		content: [
			new Span({
				content: "Тёмная тема",
			}),
			new Input({
				className: "theme-btn",
				id: "theme-btn",
				attribute: "type",
				attValue: "checkbox",
				event: "click",
				callback: themeBtnHandler,
			}),
		],
	}),
];

export const popupAuthorization = [
	new Div({
		className: "popup-header",
		content: [
			new Paragraph({
				className: "head",
				content: "Авторизация",
			}),
			new Button({
				className: "popup-close-btn",
				event: "click",
				callback: popupCloseBtnHandler,
			}),
		],
	}),
	new Form({
		className: "authorization-form",
		content: [
			new Div({ content: "Почта:" }),
			new Input({
				className: "email-input",
				attribute: "type",
				attValue: "email",
			}),
			new Div({
				className: "authorization-message",
			}),
			new Div({
				className: "btn-wrapper",
				content: [
					new Button({
						className: "popup-get-code-btn",
						content: "Получить код",
						event: "click",
						attribute: "type",
						attValue: "submit",
						callback: getCodeBtnHandler,
					}),
					new Button({
						className: "popup-send-code-btn",
						content: "Ввести код",
						event: "click",
						callback: enterCodeBtnHandler,
					}),
				],
			}),
		],
	}),
];

export const popupConfirmation = [
	new Div({
		className: "popup-header",
		content: [
			new Paragraph({
				className: "head",
				content: "Подтверждение",
			}),
			new Button({
				className: "popup-close-btn",
				event: "click",
				callback: popupCloseBtnHandler,
			}),
		],
	}),
	new Form({
		className: "popup-form",
		content: [
			new Div({ content: "Код:" }),
			new Input({ className: "confirmation-input" }),
			new Div({
				className: "authorization-message",
			}),
			new Button({
				className: "popup-enter-btn",
				attribute: "type",
				attValue: "submit",
				event: "click",
				callback: enterConfirmationBtnHandler,
				content: "Войти",
			}),
		],
	}),
];
export function changeTheme() {
	theme = theme === "light" ? "dark" : "light";
	document.documentElement.setAttribute("data-theme", theme);
	saveToLocalStorage("chatAppTheme", theme);
}

export function setTheme() {
	document.documentElement.setAttribute("data-theme", theme);
}

variables.popup.addEventListener("click", popupAreaHandler);
