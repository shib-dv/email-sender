const readline = require("readline");
const EmailOTPModule = require("./modules/EmailOTPModule");

require("dotenv").config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputStream = {
    readOTP: () => {
        return new Promise((resolve) => {
            rl.question("Enter your OTP: ", (otp) => resolve(otp.trim()));
        });
    },
};

(async () => {
    const otpModule = new EmailOTPModule();
    otpModule.start();

    const userEmail = process.env.RECEIVER_EMAIL;
    const generateStatus = await otpModule.generate_OTP_email(userEmail);
    console.log(`Generate OTP Status: ${generateStatus}`);

    if (generateStatus === "STATUS_EMAIL_OK") {
        console.log("An OTP has been sent to your email.");
        const checkStatus = await otpModule.check_OTP(inputStream, userEmail);
        console.log(`Check OTP Status: ${checkStatus}`);
    } else {
        console.log("Failed to generate or send OTP.");
    }

    otpModule.close();
    rl.close();
})();
