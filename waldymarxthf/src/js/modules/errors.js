export class ServerError extends Error {
	constructor(message) {
		super(message);
		this.name = "ServerError";
	}
}

export class AuthorizationError extends Error {
	constructor(message) {
		super(message);
		this.name = "AuthorizationError";
	}
}

export function errorHandler(error) {
	if (error instanceof ServerError) {
		console.error(`ServerError: ${error.message}`);
	} else if (error instanceof AuthorizationError) {
		console.error(`AuthorizationError: ${error.message}`);
	} else {
		console.error("Повторите попытку позже");
	}
}
