export class MyError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class FetchError extends MyError {}

export class CityValidationError extends MyError {
	constructor(city) {
		super(`Не найден город: ${city}`);
	}
}

export class KeyError extends MyError {}

export class InternalError extends MyError {}
