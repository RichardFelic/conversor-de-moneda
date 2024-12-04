import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendConfirmationEmail = async (email: string, userId: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const confirmationLink = `${process.env.FRONTEND_PORT}/users/confirm-email/${userId}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Confirma tu correo',
        html: `Por favor, confirma tu correo haciendo clic en el siguiente enlace: <a href="${confirmationLink}">Exchange Rate</a>`
    };

    await transporter.sendMail(mailOptions);
};

