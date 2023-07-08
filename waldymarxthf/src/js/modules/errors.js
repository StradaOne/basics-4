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

export class LocalStorageError extends Error {
	constructor(message) {
		super(message);
		this.name = "LocalStorageError";
	}
}

export class WebSocketError extends Error {
	constructor(message) {
		super(message);
		this.name = "WebSocketError";
	}
}

export function errorHandler(error) {
	if (error instanceof ServerError) {
		console.error(`ServerError: ${error.message}`);
	} else if (error instanceof AuthorizationError) {
		console.error(`AuthorizationError: ${error.message}`);
	} else if (error instanceof LocalStorageError) {
		console.error(`LocalStorageError: ${error.message}`);
	} else if (error instanceof WebSocketError) {
		console.error(`WebSocketError: ${error.message}`);
	} else {
		console.error("Повторите попытку позже");
	}
}

export const ERRORS = {
	WEBSOCKET_ERROR_RECIEVE: "Failed to recieve message",
	WEBSOCKET_ERROR_CONNECT: "Failed to connect WebSocket",
	WEBSOCKET_ERROR_SEND: "Failed to send message",
	LOCALSTORAGE_ERROR_SAVE: "Failed when save to localStorage",
	LOCALSTORAGE_ERROR_LOAD: "Failed when load from localStorage",
};
