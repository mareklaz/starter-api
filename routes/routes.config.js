const router = require('express').Router();
const userController = require('../controllers/user.controller');
const projectController = require('../controllers/project.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', (req, res, next) => {
  res.json({ ok: true });
});

// Auth
router.post('/login', authController.login);

// Users
router.get('/users', userController.list);
router.get(
  '/users/me',
  authMiddleware.isAuthenticated,
  userController.getCurrentUser
);
router.post('/users', userController.create);
router.get('/users/:id', userController.detail);
router.delete('/users/:id', userController.delete);
router.delete('/users/', userController.deleteAllUsers);
router.put('/users', userController.update);

// Projects
router.get('/projects', projectController.list);
router.post('/projects', projectController.create);
router.get('/projects/:id', projectController.detail);
router.delete('/projects/:id', projectController.delete);
router.delete('/projects/', projectController.deleteAllProjects);
router.put('/projects/suscribe', projectController.addCollaborator);
router.put('/projects/unsuscribe', projectController.removeCollaborator);

// Likes
router.get('/projects/likes', userController.getLikes);
router.post('/projects/likes', userController.addLikes);

module.exports = router;
