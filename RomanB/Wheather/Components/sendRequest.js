

export const sendRequest = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка при выполнении запроса');
        }
        const result = await response.json();
        return result
    } catch (error) {
        throw new Error('Ошибка при ответе от сервера');
    }
}