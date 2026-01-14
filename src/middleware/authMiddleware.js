module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "Missing Authorization header"
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      code: "UNAUTHORIZED",
      message: "Invalid token format"
    });
  }

  // Mock decoded token
  req.user = {
    username: "Thameera",
    channel: "SCP",
    roles: ["CUSTOMER"]
  };

  next();
};
