const User = require("../models/User");
const verify = require("./provider.verify");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.execute = async (body) => {

  const {
    externalAccessToken,
    firebaseId,
    appVersion,
    channelId
  } = body;

  if (!externalAccessToken)
    throw { status: 400, message: "externalAccessToken required" };

  const profile = await verify("FACEBOOK", externalAccessToken);
  if (!profile) throw { status: 401, message: "Invalid token" };

  let user = await User.findOne({
    "externalIdentities.externalUserId": profile.id
  });

  if (!user) {
    const hash = await bcrypt.hash(profile.id + Date.now(), 10);

    user = await User.create({
      individual: {
        firstName: profile.firstName,
        lastName: profile.lastName,
        contactMedium: [{ type: "email", value: profile.email }]
      },
      username: `FACEBOOK_${profile.id}`,
      passwordHash: hash,
      status: "ACTIVE",
      externalIdentities: [{
        provider: "FACEBOOK",
        externalUserId: profile.id,
        email: profile.email
      }]
    });
  }

  user.deviceContext = {
    firebaseId,
    appVersion,
    osType: "IOS",
    channelId
  };

  await user.save();

  const token = jwt.sign(
    { uid: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    loginState: "SUCCESS",
    accessToken: token
  };
};
