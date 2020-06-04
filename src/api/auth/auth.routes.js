const express = require('express')
const router = express.Router()
const authController = require('./auth.controller')

router.post('/login', authController.login)

router.delete('/logout', authController.logout)

router.post('/signup', authController.signup)

router.get('/confirmEmail', authController.confirmEmail)

router.post('/changePassword', authController.changePassword)
  
router.post('/token', authController.token)

router.post('/sendEmailToRetrievePassword', authController.sendEmailToRetrievePassword)
   
router.post('/changeLostPassword', authController.changeLostPassword)

router.get('/userSessions', authController.userSessions)

module.exports = router;