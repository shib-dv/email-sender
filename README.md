# Project Name

Email OTP Sender App

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/shib-dv/email-sender.git
2. Navigate to the project directory
   ```bash
   cd email-sender
3. Download node modules
   ```bash
   npm install
4. Edit the .env file and provide the smtp email attributes
   ```bash
    SMTP_HOST=<provide your host name>
    SMTP_PORT=<provide your port name>
    SENDER_EMAIL=<provide sender email id>
    SENDER_PASSWORD=<provide applicattive password for the email provider>
    RECEIVER_EMAIL=<provide receiver email>
4. Run the project
   ```bash
    node src/app.js
   
