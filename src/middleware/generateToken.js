const Jwt = require("jsonwebtoken");

module.exports = (params = {}) => {
  return Jwt.sign({ id: params }, "c6cb80d67cb540d698c2a3e7c54246ca", {
    expiresIn: 86400,
  });
};
