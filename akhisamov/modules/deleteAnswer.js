import {elements} from "./elements.js";

export function deleteAnswer(item) {
    elements.result_history.removeChild(item.target);
}

