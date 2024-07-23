'use strict'

// json web token module
const jwt = require('jsonwebtoken')



function checkAdminLogin(req, res, next) {
	if(!req.body.username || !req.body.password) {
		return res.status(406).send({ success: false, message: 'The username or password is not correct.' })
	}
	if(req.body.username.length < 8 || req.body.password.length < 16) {
		return res.status(406).send({ success: false, message: 'The username or password is not correct.' })
	}
	next()
}
function verifyToken(req, res, next) {
	let token = req.headers["zi-access-token"] || req.cookies['zi-access-token'];
	if (!token) {
		return res.status(403).json({ success: false, message: "No token provided." });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ success: false, message: "Unauthorized!" });
		}
		const date = new Date()
		if (Math.floor(date.getTime() / 1000) > decoded.exp){
		    return res.status(401).send({
		        message: "Unauthorized!"
		    })
		}
		req.user = decoded.user;
		req.account = decoded.account;
		next();
	});
}


// export middleware
module.exports = {
	checkAdminLogin,
	verifyToken
}