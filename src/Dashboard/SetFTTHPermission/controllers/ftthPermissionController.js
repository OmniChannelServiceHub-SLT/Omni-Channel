// TMF672 - User Roles & Permissions v4 - SetFTTHPermission
const FTTHPermission = require('../../../models/TMF672_DashboardLogin');

exports.setFTTHPermission = async (req, res) => {
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

    // Update or create permission
    const permission = await FTTHPermission.findOneAndUpdate(
      { userName },
      { 
        userName, 
        privilege: privilegeNum,
        updatedAt: new Date()
      },
      { 
        new: true, 
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      "@type": "Permission",
      "@schemaLocation": "/tmf-api/userRolesPermissions/v4/schema/permission",
      id: permission._id,
      href: `/tmf-api/userRolesPermissions/v4/permission/ftth`,
      userName: permission.userName,
      privilege: permission.privilege,
      state: "granted",
      lastModifiedDate: permission.updatedAt
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
