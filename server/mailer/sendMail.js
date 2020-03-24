const nodemailer = require("nodemailer");

const sendMail = async (sendTo, subject, content) => {
    let transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transport.verify((err, success) => {
        if (err) {
            return false;
        }
    });

    let message = {
        from: process.env.MAILTRAP_EMAIL_FROM,
        to: sendTo,
        subject,
        html: content
    };

    return await transport.sendMail(message);
};

module.exports = sendMail;
