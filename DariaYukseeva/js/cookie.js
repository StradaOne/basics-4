/* eslint-disable prettier/prettier */
export function getCookie(name) {
	// eslint-disable-next-line prettier/prettier, prefer-template
	const matches = document.cookie.match(new RegExp(
		// eslint-disable-next-line prefer-template
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setCookie(name, value, age = 60) {
	document.cookie = `${name}=${value}; max-age=${age}`;
}
