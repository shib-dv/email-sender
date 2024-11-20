const nodemailer = require("nodemailer");

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            },
        });
    }

    async sendEmail(emailAddress, emailBody) {
        const mailOptions = {
            from: `"DSO OTP Service" <${process.env.SENDER_EMAIL}>`,
            to: emailAddress,
            subject: "Your OTP Code",
            text: emailBody,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${emailAddress}`);
            return true;
        } catch (error) {
            console.error(`Failed to send email to ${emailAddress}:`, error);
            return false;
        }
    }
}

module.exports = EmailService;