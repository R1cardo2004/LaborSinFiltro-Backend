
const nodemailer = require("nodemailer");

module.exports = async(email,subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth:{
                user: 'ricardoestrada1661@gmail.com',
                pass: String(process.env.PASS)
            }
        });
        
        await transporter.sendMail({
            from: 'ricardoestrada1661@gmail.com',
            to: email,
            subject: subject,
            text: text
        });
        console.log("email sent succesfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
}