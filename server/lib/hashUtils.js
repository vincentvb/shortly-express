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

exports.uniqueHash = () => {
  // let shasum = crypto.createHash('sha1');
  // var data = shasum.read();
  // return data.toString('hex');
  return crypto.createHash('sha1').update(Math.random().toString()).digest('hex');
}