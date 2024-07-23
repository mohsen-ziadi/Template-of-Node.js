'use strict'

// json web token module
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
	let BearerToken = req.headers["access-token"] || req.cookies['access-token'];
	if (!BearerToken) {
		return res.status(403).json({ success: false, message: "No token provided." });
	}

	let token = BearerToken.split(" ")[1] || BearerToken;
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			console.log("err>>", err);
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
	verifyToken
}
