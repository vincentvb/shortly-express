const models = require('../models');
const Promise = require('bluebird');
const parseCookies = require('./cookieParser');
const utils = require('./../lib/hashUtils');
const crypto = require('crypto');


module.exports.createSession = (req, res, next) => {
  var newHash = utils.uniqueHash();
  if (!req.session) {
    req.session = {
      'hash': newHash,
    };
    models.Sessions.create(req.session);
  }
  models.Sessions.get({'hash': newHash})
  .then((results) => {
    if (results.user_id !== null) {
      req.session.user_id = results.user_id;
      models.Users.get({'id': req.session.user_id})
      .then((results) => {
        if (results.username !== null) {
          req.session.username = results.username;
        }
      })
    }
  })
  if (Object.keys(req.cookies).length === 0) {
    var cookies = {
      'shortlyid': {'value': newHash}
    };
    res.cookies = cookies;
  } else {
    models.Sessions.get({'hash': req.cookies.shortlyid})
    .then((results) => {
      console.log(results);
    })
  }


  next();
}

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

