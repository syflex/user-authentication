export class CustomError extends Error {
	/**
     * Represents the statuscode of the error response
     */
	statusCode!: number;
}
export class ApiResponse {
	constructor () {
		this.message = '';
		this.data = {};
		this.status = '';
	}
	data:  object;
	message!: string | null;
	status: string;
}

export class ApiResponseErr {
	constructor () {
		this.message = '';
		this.data = {};
	}
	data: object;
	message!: string;
}