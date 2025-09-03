const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;

    // Security check: subscriberID in query must match token subscriberID
    if (req.query.subscriberID && req.query.subscriberID !== decoded.subscriberID) {
      return res.status(403).json({ error: "Subscriber ID mismatch. Unauthorized request." });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

module.exports = auth;
