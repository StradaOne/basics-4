import { getBetterTVEmoji } from "./api";
import { SELECTORS } from "./constants";

const { TEXT_EMOJI_SELECTOR } = SELECTORS.CHAT;

function createEmoji(id) {
	const img = document.createElement("img");
	img.src = `https://cdn.betterttv.net/emote/${id}/1x.webp`;
	return img;
}

let emojiData = null;

async function getBetterTVEmojiData() {
	if (!emojiData) {
		emojiData = getBetterTVEmoji();
	}
	return emojiData;
}

export async function addBetterTVEmoji(text) {
	const emotes = await getBetterTVEmojiData();
	const words = text.split(" ");
	const container = document.createElement("span");
	container.classList.add(TEXT_EMOJI_SELECTOR);
	const { sharedEmotes } = emotes;

	words.forEach((word) => {
		const emote = sharedEmotes.find(({ code }) => code === word);

		if (emote) {
			const { id } = emote;
			container.append(createEmoji(id));
		} else {
			container.append(document.createTextNode(word));
		}
		container.append(document.createTextNode(" "));
	});

	return container;
}
