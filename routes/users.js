const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.route('/').post(usersController.addUser).get(usersController.getAllUser)
router.route('/rfid/:rfid').get(usersController.getUser)
router.route('/:id').patch(usersController.updateUser)

module.exports = router
