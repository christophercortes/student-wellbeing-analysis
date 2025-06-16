import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { studentName, parentName, parentEmail, studentReport, teacherName } = await req.json();
    console.log({ studentName, parentEmail, parentName, studentReport, teacherName });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email_User,
            pass: process.env.Email_Pass,
        },
    });

    const mailOptions = {
        from: process.env.Email_User,
        to: parentEmail,
        subject: `${studentName}'s Sentiment Report`,
        html: `<p><strong>Dear ${parentName},</strong></p>
        ${studentReport}
        
        <p>Sincerely,</p>
        <p>${teacherName}</>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Nodemailer error:", error);
        return NextResponse.json({ success: false, error: "Unknown error" }, { status: 500 });
    }
}