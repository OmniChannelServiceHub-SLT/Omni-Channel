const FTTHPermission = require('../models/ftthPermissionModel');

exports.setFTTHPermission = async (req, res) => {
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
      message: "Permission set successfully",
      data: permission
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
