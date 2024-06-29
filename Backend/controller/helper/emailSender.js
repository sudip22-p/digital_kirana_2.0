const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();
const sendMail = async (to,subject,html) => {
    try {
        //transporter object 
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME, 
                pass: process.env.EMAIL_PASSWORD 
            }
        });

        // Email data
        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            html: html
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return 'success'
    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
};
module.exports = sendMail;