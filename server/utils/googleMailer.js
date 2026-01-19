import { google } from "googleapis";
import { getWelcomeEmailTemplate } from "./emailTemplates.js";

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

    return res.data;
  } catch (error) {
    console.error("Gmail API Send Error:", error.response?.data || error.message);
    return { success: false, error: error.message };
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

  console.log(`Attempting to send Gmail API welcome email to: ${user.email}`);
  return await sendEmailViaGmailAPI({
    to: user.email,
    subject,
    htmlMessage
  });
}

// Deprecated: Use sendWelcomeEmailViaGmail instead for consistency
async function sendWelcomeEmail(tokens, user) {
  return await sendWelcomeEmailViaGmail(user);
}

export { sendWelcomeEmail, sendWelcomeEmailViaGmail, sendEmailViaGmailAPI };
