import { google } from "googleapis";
import { getWelcomeEmailTemplate, getOTPEmailTemplate } from "./emailTemplates.js";

function makeBody({ to, from, subject, message, isHtml = false }) {
  const contentType = isHtml
    ? 'Content-Type: text/html; charset="UTF-8"'
    : 'Content-Type: text/plain; charset="UTF-8"';

  const str = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    contentType,
    "",
    message,
  ].join("\n");

  // base64url
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Sends an email using the Gmail REST API with a system-wide Refresh Token.
 * Required Environment Variables:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - GMAIL_REFRESH_TOKEN (The permanent refresh token for the sender account)
 * - EMAIL_USER (The email address of the sender)
 */
async function sendEmailViaGmailAPI({ to, subject, htmlMessage }) {
  try {
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      console.warn("GMAIL_REFRESH_TOKEN not found in environment variables. Email sending skipped.");
      return { success: false, error: "Missing GMAIL_REFRESH_TOKEN" };
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oAuth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const raw = makeBody({
      to,
      from: process.env.EMAIL_USER || "me",
      subject,
      message: htmlMessage,
      isHtml: true,
    });

    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    console.log(`✅ Email successfully dispatched to: ${to} (Message ID: ${res.data.id})`);
    return { success: true, data: res.data };
  } catch (error) {
    const errorDetails = error.response?.data?.error || error.message;
    console.error("❌ Gmail API Critical Failure:", JSON.stringify(errorDetails, null, 2));

    // Help users debug common OAuth errors
    if (error.response?.status === 401) {
      console.error("💡 TIP: This likely indicates an expired refresh token or invalid credentials. Check GMAIL_REFRESH_TOKEN.");
    } else if (error.response?.status === 403) {
      console.error("💡 TIP: This might be an 'Access Blocked' error. Ensure your developer email is added to 'Test users' in Google Cloud Console.");
    }

    return { success: false, error: errorDetails };
  }
}

/**
 * Specifically sends a welcome email to a new user.
 * This is the primary entry point used by controllers and passport.
 */
async function sendWelcomeEmailViaGmail(user) {
  const subject = "Welcome to SafeSpend – Your Premium Finance Tracker";
  const dashboardUrl = process.env.CLIENT_URL
    ? `${process.env.CLIENT_URL}/dashboard`
    : "https://safespend-pro.vercel.app/dashboard";

  const htmlMessage = getWelcomeEmailTemplate(
    user.fullName,
    user.authProvider || "account",
    dashboardUrl
  );

  console.log(`🚀 Triggering welcome protocol for: ${user.email} (${user.fullName})`);
  const result = await sendEmailViaGmailAPI({
    to: user.email,
    subject,
    htmlMessage
  });

  if (!result.success) {
    console.error(`⚠️ Welcome email delivery failed for ${user.email}. System proceeding without interruption.`);
  }

  return result;
}

// Deprecated: Use sendWelcomeEmailViaGmail instead for consistency
async function sendWelcomeEmail(tokens, user) {
  return await sendWelcomeEmailViaGmail(user);
}

/**
 * Specifically sends an OTP verification email.
 */
async function sendOTPEmailViaGmail(email, otpCode) {
  const subject = `Your SafeSpend Security Code: ${otpCode}`;
  const htmlMessage = getOTPEmailTemplate(otpCode);

  console.log(`Attempting to send Gmail API OTP email to: ${email}`);
  return await sendEmailViaGmailAPI({
    to: email,
    subject,
    htmlMessage,
  });
}

export { sendWelcomeEmail, sendWelcomeEmailViaGmail, sendEmailViaGmailAPI, sendOTPEmailViaGmail };
