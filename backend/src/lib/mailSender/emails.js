import { PASSWORD_CHANGED_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from './emailTemplate.js';
import { transporter, sender } from './nodemailer.js';

const sendVerificationEmail = async (email, otp) => {
    try {
        const response = await transporter.sendMail({
          from: sender,
          to: email,
          subject: "Verify your email", 
          html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp)
        });
    } 
    catch (error) {
        console.error(`Error sending verification email: ${error.message}`);
    }
};

const sendWelcomeEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
          from: sender,
          to: email,
          subject: "Welcome to MediConnect", 
          html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name)
        });
    } 
    catch (error) {
        console.error(`Error sending Welcome email: ${error.message}`);
    }
}

const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
          from: sender,
          to: email,
          subject: "Password Reset Email", 
          html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
        });

        console.log('Password reset link sent your email successfully:', response.messageId);
    } 
    catch (error) {
        console.error(`Error sending Password Reset email link: ${error.message}`);
    }
}

const sendResetSuccessEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
          from: sender,
          to: email,
          subject: "Password reset Successfully", 
          html: PASSWORD_RESET_SUCCESS_TEMPLATE
        });

        console.log('Password reset successfull:', response.messageId);
    } 
    catch (error) {
        console.error(`Error sending Reset success email: ${error.message}`);
    }
}

const sendPasswordChangedEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
          from: sender,
          to: email,
          subject: "Password Changed Successfully", 
          html: PASSWORD_CHANGED_TEMPLATE.replaceAll("{userName}", name)
        });

        console.log('Password Changed email sent successfully:', response.messageId);
    } 
    catch (error) {
        console.error(`Error sending Welcome email: ${error.message}`);
    }
}

export { sendVerificationEmail,sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendPasswordChangedEmail};
