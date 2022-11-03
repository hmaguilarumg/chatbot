
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const msg = {
  to: 'haguilaro1@miumg.edu.gt', // Change to your recipient
  from: 'haguilaro1@miumg.edu.gt', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  templateId:"d-742487d99b0f4e798bcc606920b762e3" 
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
