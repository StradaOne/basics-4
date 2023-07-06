import { getCookie } from "./cookie.mjs";
import { showHidePreload } from "./help-functions.mjs";
import { URL, API_METHOD } from "./variables.mjs";

// Получить код, смена имени
async function getDataServer(url, method, moreHeader = null, value = null) {
    try {
        showHidePreload("flex");

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization:
                    moreHeader !== null ? `Bearer ${getCookie("token")}` : null,
            },
            body: value !== null ? JSON.stringify(value) : null,
        });
        const answer = await response.json();
        if (response.status === 200) {
            console.log(answer);

            return { status: "true", answer };
        } else {
            console.log("ошибка", answer);
            console.log("response статус", response.status);
            return { status: "false", answer };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload("none");
    }
}

export {
    URL,
    API_METHOD,
    getToken,
    confirmationAuthorization,
    renameNickname,
    getHistoryMessages,
    getDataServer,
};
