module.exports = async function verify(provider, token) {

  provider = provider.toUpperCase();

  if (!token) return null;

  return {
    id: provider + "_" + token.slice(0,8),
    email: "user@test.com",
    firstName: provider,
    lastName: "User"
  };
};
