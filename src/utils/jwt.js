// En jwt.js, define la clave secreta directamente
const JWT_SECRET = 'tiburon';  // La clave secreta directamente en el archivo

const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET, // Usamos la clave directamente
    { expiresIn: '1h' }  // Tiempo de expiración del token
  );
  return token;
};

module.exports = { createToken };