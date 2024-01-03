const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Token is not valid' });
    }
  
    req.user = user;
    next();
  });
}


module.exports = {
    authenticateToken
}