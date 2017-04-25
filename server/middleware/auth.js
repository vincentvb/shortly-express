const models = require('../models');
const Promise = require('bluebird');
const parseCookies = require('./cookieParser');
const utils = require('./../lib/hashUtils');
const crypto = require('crypto');

module.exports.createSession = (req, res, next) => {
  //declare hash && cookies
  let hash;
  let cookies = {'shortlyid': {'value': 0}}

  //if req has no cookies
  if (Object.keys(req.cookies).length === 0) {
    hash = utils.uniqueHash();
  } 
  //if req has cookies
  else {
    hash = req.cookies.shortlyid;
    models.Sessions.get({'hash': hash})
    .then((results) => {
      if (!results) {
        hash = utils.uniqueHash();
      } else {
        let client = req.headers['user-agent'];
        if (client !== 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)') {
          
        }
        console.log('browser', client);
      }
    })
  }

  //create new session
  req.session = {
    'hash': hash
  }

  models.Sessions.create(req.session);
  models.Sessions.get({'hash': hash})
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

  //put cookie on response
  cookies.shortlyid.value = hash;
  res.cookies = cookies;

  next();
}
/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

