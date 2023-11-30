const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const routes = new Router();

const userController = require('../controllers/user.controller');
const contactController = require('../controllers/contact.controller');
const authController = require('../controllers/auth.controller');

routes.post("/auth", authController.login);

// routes.use(auth);
routes.post("/user", userController.store);
routes.get("/user", auth, userController.index);

routes.get("/user/:id", auth, userController.show);
routes.put("/user/:id", auth, userController.update);
routes.delete("/user/:id", auth, userController.destroy);

routes.get("/contacts", auth, contactController.index);
routes.post("/contacts", auth, contactController.store);

routes.get("/contacts/:id", auth, contactController.show);
routes.put("/contacts/:id", auth, contactController.update);
routes.delete("/contacts/:id", auth, contactController.destroy);

module.exports = routes;
