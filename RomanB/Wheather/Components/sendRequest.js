import ErrorHandler from "./error-handling.js";

export const sendRequest = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new ErrorHandler().handleRequestError();
        }
        const result = await response.json();
        return result
    } catch (error) {
        throw new ErrorHandler().handleServerResponseError();
    }
}