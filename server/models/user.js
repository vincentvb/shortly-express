const utils = require('../lib/hashUtils');
const Model = require('./model');
const crypto = require('crypto');

// Write you user database model methods here

class Users extends Model {
  constructor() {
    super('users');
  }

  create(user) {
    utils.userPassword(user);

    return super.create.call(this, user);
  }
}

module.exports = new Users();
