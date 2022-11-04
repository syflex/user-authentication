import { CustomError, ApiResponse, ApiResponseErr } from '../types/General';



export const paginateSuccessResponse = (status: string,  docs: any, totalDocs: number, limit: number, totalPages: number, page: number, pagingCounter: number,
	hasPrevPage: boolean,
	hasNextPage: boolean,
	prevPage: number,
	nextPage: number, message: any) => ({ 
	status,
	docs,
	totalDocs,
	limit,
	totalPages,
	page,
	pagingCounter,
	hasPrevPage,
	hasNextPage,
	prevPage,
	nextPage,
	message     
});


export const successResponse = (data: any, message = 'Response received for this request...!'): ApiResponse => ({
    
	status: 'success',
	data,
	message: null
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

