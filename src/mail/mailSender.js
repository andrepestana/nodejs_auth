const nodemailer = require('nodemailer');

//TODO create constants object
const emailConfirmationEndPoint = '/confirmEmail'
const changeLostPasswordEndPoint = '/changeLostPassword'


module.exports = {
    sendRetrievePasswordMail(user, retrievePasswordToken, sendMailCallback) {
        const transport = this.createTransport()
      
        const mailOptions = this.createMailOptionsForRetrievingPassword(user, retrievePasswordToken)
      
        transport.sendMail(mailOptions, sendMailCallback)
      },
      sendConfirmationMail(user) {
        const transport = this.createTransport()
      
        const mailOptions = this.createMailOptionsForEmailConfirmation(user)
      
        transport.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
      },
      createMailOptionsForRetrievingPassword(user, retrievePasswordToken) {
        return {
          from: process.env.SMTP_FROM,
          to: user.username,
          subject: 'Retrieve password',
          html: `<p>Change the password for <strong>${user.username}</strong> by clicking <a href="${this.generateRetrievePasswordTokenLink(retrievePasswordToken)}">here</a></p>`
        }
      },
      createMailOptionsForEmailConfirmation(user) {
        return {
          from: process.env.SMTP_FROM,
          to: user.username,
          subject: 'User registration confirmation',
          html: `<p>User registration confirmation for <strong>${user.username}</strong></p><p><a href="${this.generateConfirmationEmailTokenLink(user)}">Click here to confirm your email</a></p>`
        }
      },
      createTransport() {
        return nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        })
      },
      generateConfirmationEmailTokenLink(user) {
        return process.env.VUE_APP_URL + emailConfirmationEndPoint + '?emailConfirmationToken=' + user.emailConfirmationToken
      },
      generateRetrievePasswordTokenLink(retrievePasswordToken) {
        return process.env.VUE_APP_URL + changeLostPasswordEndPoint + '?retrievePasswordToken=' + retrievePasswordToken
      }
      
}