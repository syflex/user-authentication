import { CustomError, ApiResponse, ApiResponseErr } from '../types/General';

export const successResponse = (data: object, message = 'Response received for this request...!'): ApiResponse => ({
	status: 'success',
	data,
	message: message || null,
});

/**
 * To build a global error response parser.
 *
 * @param { object } error
 */
export const errorResponse = (error: CustomError): ApiResponseErr => ({
	data: {
		status: 'failed',
		message: error.message
	},
	message: error.message || 'Request caught an error...!'

});

