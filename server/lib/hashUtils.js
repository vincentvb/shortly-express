const crypto = require('crypto');

/************************************************************/
// Add any hashing utility functions below
/************************************************************/
exports.userPassword = (user) => {
     let shasum = crypto.createHash('sha1');
    //dont know what update does
    shasum.update(user.password);
    user.password = shasum.digest('hex').slice(0, 5);
  }
