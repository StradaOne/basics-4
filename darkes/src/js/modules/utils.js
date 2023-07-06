import { format } from "date-fns";

export function getCurrentTime() {
	const currentDate = new Date();
	const formattedTime = format(currentDate, "HH:mm");
	return formattedTime;
}

export function scrollToBottom() {
	const { scrollHeight } = document.querySelector(".main");

	document.querySelector(".main").scrollTo({
		top: scrollHeight,
		behavior: "smooth",
	});
}
