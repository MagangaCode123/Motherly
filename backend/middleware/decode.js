// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;  

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = decoded;  // Attach the decoded user information to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};


module.exports = authenticate;
