const Router = require("express");
const path = require("path");
const router = new Router();
const controller = require('./authController');
const {check}=require("express-validator");
const authMiddleware = require('./Middleware/authMiddleware');
const roleMiddleware = require("./Middleware/roleMiddleware")

router.post('/registration',[check('username',"Ім'я користовуча не можк бути пустим ").notEmpty(),
                             check('password',"Пароль повинен бути не меньше 4 та не більше 10 символів").isLength({min:4,max:10})],controller.registration)
router.post('/login', controller.login)
router.get('/users',roleMiddleware(['ADMIN']), controller.getUsers)
router.get('/boss',roleMiddleware(['BOSS']),controller.getUsers)
router.get('/user',roleMiddleware(['USER']),controller.getUsers)

module.exports = router