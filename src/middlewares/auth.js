require("dotenv");
const secret = process.env.JWT_TOKEN;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//verifica se o token é valido
const withAuth = (req, res, next) => {
  const token = req.headers["token"];
  console.log(token);
  if (!token) {
    res.status(400).json({ error: "acesso não autorizado" });
  } else {
    console.log(secret);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ err });
      } else {
        User.findOne({ email: decoded.email }).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  }
};

module.exports = withAuth;
