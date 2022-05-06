const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAll);
router.route('/:id').get(userController.getOne);
router.route('/createUser').post(userController.createUser);
router.route('/updateUser/:id').put(userController.updateUser);
router.route('/loginUser').post(userController.loginUser);

module.exports = router;
