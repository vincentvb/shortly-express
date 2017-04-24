const utils = require('../lib/hashUtils');
const Model = require('./model');
const crypto = require('crypto');

// Write you user database model methods here

class Users extends Model {
  constructor() {
    super('users');
  }

  
  create(user) {
    // let shasum = crypto.createHash('sha1');
    // //dont know what update does
    // shasum.update(user.username);
    // user.password = shasum.digest('hex').slice(0, 5);
    utils.userPassword(user)

    return super.create.call(this, user);
  }
}

module.exports = new Users();
