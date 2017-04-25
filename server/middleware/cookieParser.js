const parseCookies = (req, res, next) => {
	if (req.headers.cookie === undefined) {
	   return {};
	}
	var splitCookies = req.headers.cookie.split("; ")
	var cookies = {}
	for (var i = 0; i < splitCookies.length; i++) {
		var key = splitCookies[i].split("=")[0];
		var value = splitCookies[i].split("=")[1];
		cookies[key] = value;
	}
	req.cookies = cookies
	next();
};

module.exports = parseCookies;