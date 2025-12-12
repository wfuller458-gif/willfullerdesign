import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, project, appointmentDate, appointmentTime } = body;

    // Validate required fields
    if (!name || !email || !phone || !project || !appointmentDate || !appointmentTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the appointment date
    const date = new Date(appointmentDate);
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send notification email to admin
    const adminEmail = await resend.emails.send({
      from: 'noreply@willfullerdesign.com',
      to: process.env.ADMIN_EMAIL || 'your-email@example.com',
      subject: 'New Appointment Request',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #1e1e1c;
                color: #fff;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .content {
                background-color: #f7f7f0;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: 600;
                color: #1e1e1c;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
              }
              .appointment-info {
                background-color: #fff;
                padding: 15px;
                border-radius: 4px;
                border-left: 4px solid #1e1e1c;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Appointment Request</h1>
            </div>
            <div class="content">
              <div class="appointment-info">
                <div class="field">
                  <div class="label">Appointment Date:</div>
                  <div class="value">${formattedDate}</div>
                </div>
                <div class="field">
                  <div class="label">Appointment Time:</div>
                  <div class="value">${appointmentTime}</div>
                </div>
              </div>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              <div class="field">
                <div class="label">Project Details:</div>
                <div class="value">${project.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: 'noreply@willfullerdesign.com',
      to: email,
      subject: 'Appointment Confirmed!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #1e1e1c;
                color: #fff;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .content {
                background-color: #f7f7f0;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
              }
              .appointment-info {
                background-color: #fff;
                padding: 15px;
                border-radius: 4px;
                border-left: 4px solid #1e1e1c;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Appointment Confirmed!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thanks for booking an appointment with us!</p>
              <div class="appointment-info">
                <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 0;"><strong>Time:</strong> ${appointmentTime}</p>
              </div>
              <p>We'll be in touch shortly to confirm all the details.</p>
              <p>Check your junk folder if you don't see this email in your inbox.</p>
              <p>Best regards,<br>Your Team</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
