// src/BBVAS/ChangeBBPassword/middleware/validatePasswordChange.js
module.exports = (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and newPassword are required" });
  }

  next();
};
