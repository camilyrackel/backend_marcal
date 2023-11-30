const AuthModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const data = req.body;
  const user = await AuthModel.login(data.username, data.password);

  if (!user)
    return res.status(401).json({ message: "Unauthorized" });
  try {
    const token = jwt.sign({ id: user.id, username: user.username}, "iehiewhienfiwefniweniaicni");
    return res.json({ message: "Login successful", token, user });
  } catch (error) {
    return res.status(401).json({ message: "Error sign", error });
  }
}

module.exports = { login }