

class ErrorHandler extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorHandler';
    }

    handleRequestError() {
        console.log('Ошибка при выполнении запроса');
    }

    handleServerResponseError() {
        console.log('Ошибка при ответе от сервера');
    }
}

export default ErrorHandler;