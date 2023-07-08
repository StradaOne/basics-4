const text = document.querySelector(".text");

function createEmoji(emote) {
	const img = document.createElement("img");
	img.src = `https://cdn.betterttv.net/emote/${emote.id}/2x.webp`;
	return img;
}

async function getRequest() {
	const response = await fetch("https://api.betterttv.net/3/cached/users/twitch/490702236");
	const data = await response.json();

	const words = text.textContent.split(" ");
	text.textContent = ""; // Очищаем текстовый узел

	words.forEach((word, index) => {
		let img;
		data.sharedEmotes.forEach((emote) => {
			if (emote.code === word) {
				img = createEmoji(emote);
			}
		});
		if (img) {
			text.append(img);
		} else {
			text.append(document.createTextNode(word));
		}
		// Добавляем пробелы между словами, если это не последнее слово
		if (index !== words.length - 1) {
			text.append(document.createTextNode(" "));
		}
	});

	console.log(text);
}

getRequest();
