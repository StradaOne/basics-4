export class CustomError extends Error {
	constructor(message) {
		super(message);
		this.name = 'CustomError'
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message) {
		super(message);
		this.name = 'UnathorizedError'
	}
}

export class NotFoundError extends CustomError {
	constructor(message) {
		super(message);
		this.name = 'UnathorizedError'
	}
}

export function errorHandler(error) {
	if (error instanceof UnauthorizedError) {
		console.error("Ошибка: UnauthorizedError:", error.message);
	} else if (error instanceof NotFoundError) {
		console.error("Ошибка: NotFoundError:", error.message);
	} else if (error instanceof CustomError) {
		console.error("Ошибка: CustomError:", error.message);
	} else {
		console.error("Ошибка:", error.message);
	}
}