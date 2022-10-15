const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (authorization) {
    const [type, token] = authorization.split(" ");

    if (type === "Bearer") {
      if (token) {
        // el token es valido?

        jwt.verify(token, "SuperSecreto", (err, decodedToken) => {
          if (err) {
            // Error por secreto incorrecto o por expiración, etc.
            next(err);
          } else {
            req.currentUser = decodedToken.id;
            next(); // Todo ha ido bien!
          }
        });
      } else {
        next(createError(401, "Token error"));
      }
    } else {
      next(createError(401, "Bearer error"));
    }
  } else {
    next(createError(401, "No auth"));
  }
};
