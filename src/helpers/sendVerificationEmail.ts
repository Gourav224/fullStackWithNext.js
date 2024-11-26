// import { ApiResponse } from "@/types/ApiResponse";
// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";

// export async function sendVerificationEmail(
//     email: string,
//     username: string,
//     verifyCode: string
// ): Promise<ApiResponse> {
//     try {
//         await resend.emails.send({
//             from: "onboarding@resend.dev",
//             to: email,
//             subject: "Mystery message | Verification Code",
//             react: VerificationEmail({ username, otp: verifyCode }),
//         });
//         return {
//             success: true,
//             message: "Verification email send successfully",
//         };
//     } catch (emailError) {
//         console.error("Error sending verification email", emailError);
//         return { success: false, message: "Failed to send verification email" };
//     }
// }

import nodemailer from "nodemailer";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        // Create a Nodemailer transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.GMAIL_USER, // Gmail email
                pass: process.env.GMAIL_PASS, // Gmail password or App password
            },
        });

        // Generate the email HTML content using VerificationEmail function
        const emailHtml = VerificationEmail({ username, otp: verifyCode });

        // Define email options
        const mailOptions = {
            from: process.env.GMAIL_USER, // sender address
            to: email, // list of recipients
            subject: "Mystery message | Verification Code", // subject line
            html: emailHtml, // HTML body content
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: "Verification email sent successfully",
        };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}
