const handleLogout = async (req, res) => {
  const accessToken =  req?.cookies?.jwt;
  if (accessToken) {
    res.clearCookie("jwt", accessToken, {
      httpOnly: true,
      // sameSite: "None",
      secure: true,
    });
  }
  return res.sendStatus(204);
};

module.exports = { handleLogout };
