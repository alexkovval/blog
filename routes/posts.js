const express = require('express')
const controller = require('../controllers/posts')
const router = express.Router()
const passport = require('passport')
const upload = require('../middleware/upload')

router.post('/dashboard', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.dashboard)
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)


module.exports = router