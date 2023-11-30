const UserModel = require("../models/user.model");
const users = [];

async function index(req, res) {
  res.json(await UserModel.index());
}
async function store(req, res) {
  const user = req.body;
  const userExists = await UserModel.checkUserExists(user.username);
  if (userExists) {
    return res.status(400).json({ message: "user already exists"});
  }
  await UserModel.save(user.name ,user.username, user.password);
  res.json({ message: "User created" });
 }
async function show(req, res) {
  const id = req.params.id;
  const user = await UserModel.find(id);
  if (!user)
    return res.status(404).json({ message: "User not found" });
  res.json(user);
}
async function update(req, res) {
  const id = req.params.id;
  const user = req.body;
  const userArray = await UserModel.find(id)
  if (!userArray)
    return res.status(404).json({ message: "User not found" });
  const userExists = await UserModel.checkUserExists(user.username);
  if (userExists) {
    return res.status(400).json({ message: "user already exists"});
  }
  await UserModel.update(id, user);
  res.json({ message: "User updated" });
}
async function destroy(req, res) {
  const id = req.params.id;
  const user = await UserModel.find(id)
  if (!user)
    return res.status(404).json({ message: "User not found" });
  await UserModel.remove(id);
  res.json({ message: "User deleted" });
}
module.exports = { index, store, show, update, destroy }