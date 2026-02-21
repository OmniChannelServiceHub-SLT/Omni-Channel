const FTTHDashboardUser = require('../models/ftthLoginModel');

exports.ftthDashboardLogin = async (req, res) => {
  try {
    const { userName, privilege } = req.query;

    if (!userName || privilege === undefined) {
      return res.status(400).json({ message: "userName and privilege are required as query parameters." });
    }

    // Validate privilege value
    const privilegeNum = parseInt(privilege);
    if (isNaN(privilegeNum)) {
      return res.status(400).json({ message: "privilege must be a valid number." });
    }

    // Find or create user
    let user = await FTTHDashboardUser.findOne({ userName });

    if (!user) {
      // Create new user if not exists
      user = await FTTHDashboardUser.create({
        userName,
        privilege: privilegeNum,
        lastLogin: new Date()
      });

      return res.status(201).json({
        message: "User created and logged in successfully",
        data: {
          userName: user.userName,
          privilege: user.privilege,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        }
      });
    }

    // Update existing user
    user.privilege = privilegeNum;
    user.lastLogin = new Date();
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      data: {
        userName: user.userName,
        privilege: user.privilege,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
