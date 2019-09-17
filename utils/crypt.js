const bcrypt = require('bcryptjs');


module.exports = {
  hashCheck: (pas) => {
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pas, salt, (err, hash) => {
          if (err) throw err
          res(hash)
        });
      });
    })
  },
  checkPwd: (pas, hash) => {
    return new Promise((reslove, rej) => {
      bcrypt.compare(pas, hash, (err, res) => {
        if (err) throw err
        reslove(res)
      });
    })
  }
}

