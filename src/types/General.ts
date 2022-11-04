export class CustomError extends Error {
	/**
     * Represents the statuscode of the error response
     */
	statusCode!: number;
}
export class ApiResponse {
	data:  any;
	message!: any;
	status: any;
}

export class ApiResponseErr {
	data: any;
	message!: string;
}