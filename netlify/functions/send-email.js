const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing parameters' }) };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.zoho.in',
            port: process.env.SMTP_PORT || 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to yourself
            replyTo: email,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <br/>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        console.error('Email error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
