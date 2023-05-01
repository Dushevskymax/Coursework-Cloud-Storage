const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const userDirController = require("../controllers/user-dir-controller");
const { body } = new require("express-validator");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.post('/registration',
    body('email').isEmail(),
    body('nickname').isLength({ min: 1, max: 16 }),
    body('password').isLength({ min: 8, max: 16 }),
    userController.registration
);
router.post('/login', userController.login);
router.delete('/delete', authMiddleware, userDirController.deleteItem);
router.post('/newdir', authMiddleware, userDirController.newDirectory);
router.get('/search', authMiddleware, userDirController.getSearchItems);
router.get('/dirdata', authMiddleware, userDirController.getDirData);
router.get('/download', authMiddleware, userDirController.downloadFile);
router.post('/upload', authMiddleware, userDirController.uploadFile);

module.exports = router;