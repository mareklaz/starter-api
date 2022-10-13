const router = require("express").Router();
const userController = require("../controllers/user.controller");
const projectController = require("../controllers/project.controller");

router.get("/", (req, res, next) => {
  res.json({ ok: true });
});

// Users

router.get("/users", userController.list);
router.post("/users", userController.create);
router.get("/users/:id", userController.detail);
router.delete("/users/:id", userController.delete);

// Projects

router.get("/projects", projectController.list);
router.post("/projects", projectController.create);
router.get("/projects/:id", projectController.detail);
router.delete("/projects/:id", projectController.delete);

module.exports = router;
