/*const User = require("../../RegisterV2/models/User");
const verify = require("../external.provider.verify");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.execute = async ({ provider, externalAccessToken }) => {

  if (!provider || !externalAccessToken) {
    throw { status: 400, message: "provider and externalAccessToken required" };
  }

  const profile = await verify(provider, externalAccessToken);
  if (!profile) throw { status: 401, message: "Invalid token" };

  let user = await User.findOne({
    externalIdentities: {
      $elemMatch: {
        provider: provider.toUpperCase(),
        externalUserId: profile.id
      }
    }
  });

  if (!user) {
    const hash = await bcrypt.hash(profile.id + Date.now(), 10);

    user = await User.create({
      individual: {
        firstName: profile.firstName || "External",
        lastName: profile.lastName || "User",
        contactMedium: profile.email
          ? [{ type: "email", value: profile.email }]
          : []
      },
      username: `${provider}_${profile.id}`,
      passwordHash: hash,
      status: "ACTIVE",
      externalIdentities: [{
        provider: provider.toUpperCase(),
        externalUserId: profile.id,
        email: profile.email
      }]
    });
  }

  const token = jwt.sign(
    { uid: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    loginState: "SUCCESS",
    accessToken: token,
    userId: user._id
  };
};
*/
const User = require("../../RegisterV2/models/User");
const verify = require("../external.provider.verify");
const bcrypt = require("bcrypt");
const tokenService = require("../../../middleware/authMiddleware"); // adjust path

exports.execute = async ({ provider, externalAccessToken }) => {

  if (!provider || !externalAccessToken) {
    throw { status: 400, message: "provider and externalAccessToken required" };
  }

  const profile = await verify(provider, externalAccessToken);
  if (!profile) throw { status: 401, message: "Invalid token" };

  let user = await User.findOne({
    externalIdentities: {
      $elemMatch: {
        provider: provider.toUpperCase(),
        externalUserId: profile.id
      }
    }
  });

  if (!user) {
    const hash = await bcrypt.hash(profile.id + Date.now(), 10);

    user = await User.create({
      individual: {
        firstName: profile.firstName || "External",
        lastName: profile.lastName || "User",
        contactMedium: profile.email
          ? [{ type: "email", value: profile.email }]
          : []
      },
      username: `${provider}_${profile.id}`,
      passwordHash: hash,
      status: "ACTIVE",
      externalIdentities: [{
        provider: provider.toUpperCase(),
        externalUserId: profile.id,
        email: profile.email
      }]
    });
  }

  // ✅ Use platform token service
  const token = tokenService.createAccessToken(user);

  return {
    loginState: "SUCCESS",
    accessToken: token,
    userId: user._id
  };
};
