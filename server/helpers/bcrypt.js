const bcrypt = require("bcryptjs");

module.exports = {
  encrypt: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
};
