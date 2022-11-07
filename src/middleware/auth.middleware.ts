// JWT authention middleware
import { NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from '../config/config';


export default (req: any, res: any, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).send({ error: 'No token provided' });
	}

	const parts = authHeader.split(' ');
	if (parts.length !== 2) {
		return res.status(401).send({ error: 'Token error' });
	}

	const [scheme, token] = parts;
	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).send({ error: 'Token malformation' });
	}
	
	const secret = config.jwt.secret;
	jwt.verify(token, secret as Secret, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ error: 'Token invalid' });
		}
		
		// eslint-disable-next-line no-cond-assign
		if (req.params.email = decoded.email){ 
			next();
		}
	});

	

	// const verifyToken: JwtPayload | string = jwt.verify(token, secret as Secret);
	// if(!verifyToken){
	// 	return res.status(401).send({ error: 'Token invalid' });
	// }

	// console.log(verifyToken);
	// req.params.args = verifyToken.email
	
	
	// next();
	// console.log(verifyToken);
	

	// token: jwt.sign({ email: args }, this.secret, { expiresIn: this.min }),
	// 		expiresIn: this.min
};

