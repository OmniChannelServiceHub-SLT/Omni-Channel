const bcrypt = require("bcryptjs");
const User = require("../../RegisterV2/models/user");

class ChangePasswordService {
  /**
   * Change the password for a given user.
   *
   * @param {Object} params
   * @param {string} params.username - Account username
   * @param {string} params.currentPassword - Current password (for verification)
   * @param {string} params.newPassword - New password to set
   *
   * This mirrors the patterns used in loginService and refreshTokenService:
   * - Look up the User by username
   * - Ensure the user is ACTIVE
   * - Verify current password with bcrypt
   * - Hash and store the new password
   * - (Optionally) invalidate existing refresh token
   */
  static async changePassword({ username, currentPassword, newPassword }) {
    // 1. Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      // Mirror loginService messaging style
      throw new Error("Invalid username or password");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("User is not activated");
    }

    // 2. Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid current password");
    }

    // 3. Hash new password
    const newHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = newHash;

    // 4. (Security) Invalidate existing refresh token so old sessions are logged out
    user.refreshToken = undefined;

    // 5. Persist changes
    await user.save();

    // 6. Return minimal service result; controller will shape HTTP response
    return {
      success: true
    };
  }
}

module.exports = ChangePasswordService;


