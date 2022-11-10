require('dotenv').config();

const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const LoginError = createError(401, 'Email or password are not valid');

  if (!email || !password) {
    // Campos requeridos
    next(LoginError);
  } else {
    User.findOne({ email }) // Intento buscar por email
      .then((user) => {
        if (!user) {
          next(LoginError); // No hay usuario
        } else {
          user
            .checkPassword(password) // La contraseña es válida?
            .then((result) => {
              if (!result) {
                next(LoginError); // Contraseña incorrecta
              } else {
                const token = jwt.sign(
                  {
                    id: user.id,
                  },
                  JWT_SECRET,
                  {
                    expiresIn: '24h',
                  }
                ); // Firmar y enviar el token jwt
                res.json({ accessToken: token });
              }
            });
        }
      });
  }
};
