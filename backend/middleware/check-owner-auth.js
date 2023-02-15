const jwt = require('jsonwebtoken');

const verifyOwnerJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return res
      .status(401)
      .json({ message: 'User is not Logged in! Access Denied' });
  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'secret_this_should_be_longer', (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError)
        res.status(401).json({ message: 'Expired Token' });
      res.status(401).json({ message: 'UnAuthorized' });
    } else {
      if (decoded.userType != 'OWNER') {
        res.status(401).json({ message: 'UnAuthorized! Not a Owner User' });
      } else {
        req.user = decoded.email;
        next();
      }
    }
  });
};

module.exports = verifyOwnerJWT;
