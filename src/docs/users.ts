const createUser = {
	tags: ['Authentication'],
	description: 'Create a new use in the system',
	operationId: 'createUser',
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/createUserBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'User created successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								example: '60564fcb544047cdc3844818',
							},
							name: {
								type: 'string',
								example: 'John Snow',
							},
							email: {
								type: 'string',
								example: 'john.snow@email.com',
							},
							password: {
								type: 'string',
								example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
							}
						},
					},
				},
			},
		},
		'409': {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'string',
									example: 'failed',
								},
								message: {
									type: 'string',
									example: 'User Already Exist',
								}
							},
							message: {
								type: 'string',
								example: 'User Already Exist',
							},
						},
					},
				},
			},
		},
		'400': {
			description: 'Internal Server Error',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'string',
									example: 'failed',
								},
								message: {
									type: 'string',
									example: 'Invalid User Data',
								}
							},
							message: {
								type: 'string',
								example: 'Invalid User Data',
							},
						},
					},
				},
			},
		},
	},
};
  
const createUserBody = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			example: 'John Snow',
		},
		email: {
			type: 'string',
			example: 'john.snow@email.com',
		},
		password: {
			type: 'string',
			description: 'unencrypted user\'s password',
			example: '!1234aWe1Ro3$#',
		}
	},
};

const updateUser = {
	tags: ['User'],
	description: 'Update existing user in the system',
	operationId: 'updateUser',
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/updateUserBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'User updated successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							_id: {
								type: 'string',
								example: '60564fcb544047cdc3844818',
							},
							name: {
								type: 'string',
								example: 'John Snow',
							},
							email: {
								type: 'string',
								example: 'john.snow@email.com',
							},
							password: {
								type: 'string',
								example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
							}
						},
					},
				},
			},
		},
		'404': {
			description: 'User not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'string',
									example: 'failed',
								},
								message: {
									type: 'string',
									example: 'User not found',
								}
							},
							message: {
								type: 'string',
								example: 'User not found',
							},
						},
					},
				},
			},
		},
		'400': {
			description: 'Invalid User Data',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'array',
									example: '[]',
								},
								message: {
									type: 'string',
									example: 'Invalid User Data',
								}
							},
							message: {
								type: 'string',
								example: 'Invalid User Data',
							},
						},
					},
				},
			},
		},
	},
};

const updateUserBody = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			example: 'John Snow',
		},
		password: {
			type: 'string',
			description: 'unencrypted user\'s password',
			example: '!1234aWe1Ro3$#',
		}
	},
};


const loginUser = {
	tags: ['Authentication'],
	description: 'Login user in the system',
	operationId: 'loginUser',
	security: [
		{
			bearerAuth: [],
		},
	],
	requestBody: {
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/loginUserBody',
				},
			},
		},
		required: true,
	},
	responses: {
		'200': {
			description: 'User updated successfully!',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							token: {
								type: 'string',
								example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed'
							},
						},
					},
				},
			},
		},
		'404': {
			description: 'User not found',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'object',
									example: '{}',
								},
								message: {
									type: 'string',
									example: 'User not found',
								}
							},
							message: {
								type: 'string',
								example: 'User not found',
							},
						},
					},
				},
			},
		},
		'401': {
			description: 'Invalid Credentials',
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							data: {
								status: {
									type: 'string',
									example: 'failed',
								},
								message: {
									type: 'object',
									example: '{}',
								}
							},
							message: {
								type: 'string',
								example: 'Invalid Credentials',
							},
						},
					},
				},
			},
		},
	},
};


const loginUserBody = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			example: 'password',
		},
		password: {
			type: 'string',
			description: 'unencrypted user\'s password',
			example: 'password',
		}
	},
};
  
export { createUser, createUserBody, updateUser, updateUserBody, loginUser, loginUserBody };