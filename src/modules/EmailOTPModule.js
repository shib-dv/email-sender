const EmailService = require("../services/EmailService");
const {
    STATUS_EMAIL_OK,
    STATUS_EMAIL_FAIL,
    STATUS_EMAIL_INVALID,
    STATUS_OTP_OK,
    STATUS_OTP_FAIL,
    STATUS_OTP_TIMEOUT,
} = require("../constants/StatusCodes");
const { isValidDSOEmail } = require("../utils/RegexValidators");

class EmailOTPModule {
    constructor() {
        this.emailService = new EmailService();
        this.activeOTPs = {};
    }

    start() {
        console.log("Email OTP Module started.");
    }

    close() {
        console.log("Email OTP Module closed.");
    }

    generateRandomOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async generate_OTP_email(userEmail) {
        if (!isValidDSOEmail(userEmail)) {
            return STATUS_EMAIL_INVALID;
        }

        const otp = this.generateRandomOTP();
        this.activeOTPs[userEmail] = {
            otp,
            expiresAt: Date.now() + 60 * 1000, // Valid for 1 minute
        };

        const emailBody = `Your OTP Code is ${otp}. The code is valid for 1 minute.`;
        const emailSent = await this.emailService.sendEmail(userEmail, emailBody);

        if (emailSent) {
            return STATUS_EMAIL_OK;
        } else {
            delete this.activeOTPs[userEmail];
            return STATUS_EMAIL_FAIL;
        }
    }

    async check_OTP(inputStream, userEmail) {
        if (!this.activeOTPs[userEmail]) {
            console.log("No OTP generated for this email.");
            return STATUS_OTP_TIMEOUT;
        }

        const { otp: validOtp, expiresAt } = this.activeOTPs[userEmail];
        let attempts = 0;

        while (Date.now() < expiresAt && attempts < 10) {
            const userOtp = await inputStream.readOTP();
            attempts++;

            if (userOtp === validOtp) {
                delete this.activeOTPs[userEmail];
                return STATUS_OTP_OK;
            } else {
                console.log("Incorrect OTP. Try again.");
            }
        }

        delete this.activeOTPs[userEmail];
        return Date.now() >= expiresAt ? STATUS_OTP_TIMEOUT : STATUS_OTP_FAIL;
    }
}

module.exports = EmailOTPModule;