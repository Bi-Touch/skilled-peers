import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Email to Admin
    await resend.emails.send({
      from: "Skilled Peers Contact <onboarding@resend.dev>", // must be verified in Resend
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 2️⃣ Confirmation Email to Sender
    await resend.emails.send({
      from: "Skilled Peers <onboarding@resend.dev>",
      to: email,
      subject: "✅ We’ve received your message",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for reaching out to <strong>Skilled Peers</strong>. We’ve received your message and will get back to you shortly.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <blockquote>${message.replace(/\n/g, "<br/>")}</blockquote>
        <br/>
        <p>Best regards,</p>
        <p><strong>Skilled Peers Team</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}