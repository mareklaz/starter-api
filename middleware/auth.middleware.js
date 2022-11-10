require('dotenv').config();

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header('Authorization');
  if (authorization) {
    const [type, token] = authorization.split(' ');

    if (type === 'Bearer') {
      if (token) {
        // el token es valido?

        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
          if (err) {
            // Error por secreto incorrecto o por expiración, etc.
            next(err);
          } else {
            console.log(decodedToken);
            req.currentUser = decodedToken.id;
            next(); // Todo ha ido bien!
          }
        });
      } else {
        next(createError(401, 'Token error'));
      }
    } else {
      next(createError(401, 'Bearer error'));
    }
  } else {
    next(createError(401, 'No auth'));
  }
};
