// TMF672 - User Roles & Permissions v4 - FTTHDashboardLogin
const FTTHDashboardUser = require('../models/ftthLoginModel');

exports.ftthDashboardLogin = async (req, res) => {
  try {
    const { userName, privilege } = req.query;

    if (!userName || privilege === undefined) {
      return res.status(400).json({
        "@type": "Error",
        code: "ERR_MISSING_PARAMS",
        reason: "userName and privilege are required as query parameters."
      });
    }

    // Validate privilege value
    const privilegeNum = parseInt(privilege);
    if (isNaN(privilegeNum)) {
      return res.status(400).json({
        "@type": "Error",
        code: "ERR_INVALID_PRIVILEGE",
        reason: "privilege must be a valid number."
      });
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
        "@type": "UserRole",
        "@schemaLocation": "/tmf-api/userRolesPermissions/v4/schema/userRole",
        id: user._id,
        href: `/tmf-api/userRolesPermissions/v4/permission/ftthLogin`,
        userName: user.userName,
        privilege: user.privilege,
        state: "created",
        isActive: user.isActive,
        lastLogin: user.lastLogin
      });
    }

    // Update existing user
    user.privilege = privilegeNum;
    user.lastLogin = new Date();
    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      "@type": "UserRole",
      "@schemaLocation": "/tmf-api/userRolesPermissions/v4/schema/userRole",
      id: user._id,
      href: `/tmf-api/userRolesPermissions/v4/permission/ftthLogin`,
      userName: user.userName,
      privilege: user.privilege,
      state: "authenticated",
      isActive: user.isActive,
      lastLogin: user.lastLogin
    });
  } catch (err) {
    res.status(500).json({
      "@type": "Error",
      code: "ERR_INTERNAL",
      reason: "Server Error",
      message: err.message
    });
  }
};
