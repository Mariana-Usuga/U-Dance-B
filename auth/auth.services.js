const jsonwebtoken = require('jsonwebtoken');
// const compose = require('composable-middleware');
const { getUserByEmail } = require('../api/user/user.service');
const { config } = require('../config');

function signToken(payload) {

  const token = jsonwebtoken.sign(payload, config.secrets.session, {
    expiresIn: config.expiresIn,
  });

  return token;
}

async function isAuthenticated(req, res, next) {
  // return compose().use(async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const [, token] = authHeader.split(' ');

        const payload = await validateToken(token);
        if (!payload) {
          return res.status(401).json({message: 'unauthorized'}).end();
        }

        const user = await getUserByEmail(payload.email);

        if (!user) {
          return res.status(401).json({message: 'Unauthorized'}).end();
        }
        req.user = user;
        next();
        return null;
      } else {
        return res.status(401).json({message: 'Unauthorized'}).end();
      }
    } catch (error) {
      console.log('entra en error en auth')
      return next(error);
    }
  // );
}

async function validateToken(token) {
  try {
    const payload = await jsonwebtoken.verify(token, config.secrets.session);
    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  signToken,
  isAuthenticated,
  // hasRole,
};
