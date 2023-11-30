const ContactModel = require("../models/contact.model");
const contacts = [];
async function index(req, res) {
  res.json(await ContactModel.index());
}
async function store(req, res) {
  const contact = req.body;
  await ContactModel.save(contact.nome, contact.telefone);
  res.json({ message: "Contact created" });
}
async function show(req, res) {
  const id = req.params.id;
  const contact = await ContactModel.find(id);
  if (!contact)
    return res.status(404).json({ message: "Contact not found" });
  res.json(contact);
}
async function update(req, res) {
  const id = req.params.id;
  const contact = req.body;
  const contactArray = await ContactModel.find(id)
  if (!contactArray)
    return res.status(404).json({ message: "Contact not found" });
  await ContactModel.update(id, contact);
  res.json({ message: "Contact updated" });
}
async function destroy(req, res) {
  const id = req.params.id;
  const contact = await ContactModel.find(id)
  if (!contact)
    return res.status(404).json({ message: "Contact not found" });
  await ContactModel.remove(id);
  res.json({ message: "Contact deleted" });
}
module.exports = { index, store, show, update, destroy }