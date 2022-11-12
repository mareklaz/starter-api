const router = require('express').Router();
const fileUploader = require('../config/cloudinary.config');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const projectController = require('../controllers/project.controller');
const collaborationController = require('../controllers/collaboration.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', (req, res, next) => {
  res.json({ ok: true });
});

// Auth
router.post('/login', authController.login);

// Users
router.get(
  '/users/me',
  authMiddleware.isAuthenticated,
  userController.getCurrentUser
);
router.get('/users', userController.list);
router.get('/users/:id', userController.detail);

router.post(
  '/users/create-user',
  fileUploader.single('image'),
  userController.create
);
router.put('/users/update-user', userController.update);
router.delete('/users/delete-user', userController.delete);
router.delete('/users/delete-all', userController.deleteAllUsers);

// Projects
router.get('/projects', projectController.list);
router.post('/projects', projectController.create);
router.get('/projects/:id', projectController.detail);
router.delete('/projects/', projectController.deleteAllProjects);
router.delete('/projects/:id', projectController.delete);

// Collaboration

router.get('/collaboration', collaborationController.list);
router.get('/collaboration/:id', collaborationController.detail);
router.post('/collaboration/create', collaborationController.create);
router.delete('/collaboration/delete', collaborationController.delete);

module.exports = router;
