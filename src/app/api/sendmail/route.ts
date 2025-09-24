import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, contactnumber, position } = body;

    if (!name || !email || !position) {
      return NextResponse.json(
        { success: false, message: "Name, email, and position are required." },
        { status: 400 }
      );
    }

    console.log("Internship application data:", { name, email, contactnumber, position });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Path to logo in public folder
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoContent = fs.readFileSync(logoPath);

    // 1️⃣ Email to PadhneAI team
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `New Internship Application from ${name} for ${position}`,
      text: `
        Name: ${name}
        Contact Number: ${contactnumber || "N/A"}
        Position: ${position}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Number:</strong> ${contactnumber || "N/A"}</p>
        <p><strong>Position Applied:</strong> ${position}</p>
      `,
    });

    // 2️⃣ Acknowledgment email to the applicant
    await transporter.sendMail({
      from: `"PadhneAI Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for applying to PadhneAI, ${name}!`,
      attachments: [
        {
          filename: "logo.png",
          content: logoContent,
          cid: "padhneai-logo",
        },
      ],
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:padhneai-logo" alt="PadhneAI Logo" style="width: 120px; height: auto;" />
          </div>
          <p>Dear ${name},</p>
          <p>Thank you for submitting your application to join the <strong>PadhneAI Internship Program</strong> for the position of <strong>${position}</strong>.</p>
          <p>We have received your application and our team will review it carefully. You will hear from us soon regarding the next steps.</p>
          <p>Here is a summary of your application:</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Contact Number:</strong> ${contactnumber || "N/A"}</li>
            <li><strong>Position Applied:</strong> ${position}</li>
          </ul>
          <p>We appreciate your interest in PadhneAI and look forward to connecting with you!</p>
          <p>Best regards,<br/>The PadhneAI Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Application submitted and acknowledgment email sent!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send application", error: error.message },
      { status: 500 }
    );
  }
}
