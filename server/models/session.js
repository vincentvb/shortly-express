const utils = require('../lib/hashUtils');
const Model = require('./model');
const crypto = require('crypto');

// Write you user database model methods here

class Sessions extends Model {
  constructor() {
    super('sessions');
  }

  create(hash) {
    return super.create.call(this, hash);
  }

}

module.exports = new Sessions();
