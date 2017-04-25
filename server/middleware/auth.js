const models = require('../models');
const Promise = require('bluebird');
const parseCookies = require('./cookieParser');
const utils = require('./../lib/hashUtils');
const crypto = require('crypto');


module.exports.createSession = (req, res, next) => {
	var newHash = crypto.createHash('sha1').update(Math.random().toString()).digest('hex')
	if (!req.session) {
		req.session = {'hash': newHash}
	}
	if (Object.keys(req.cookies).length === 0) {
		var cookies = {
			'shortlyid': {'value': newHash}
		};
		res.cookies = cookies;
	}
	next();
}

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

