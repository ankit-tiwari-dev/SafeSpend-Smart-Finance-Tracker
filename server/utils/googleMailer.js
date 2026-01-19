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

async function sendWelcomeEmail(tokens, user) {
  if (!tokens || !tokens.accessToken) {
    throw new Error("Missing access token for Gmail API");
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // Attach tokens (including refresh token if present)
  oAuth2Client.setCredentials({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken || user.gmailRefreshToken || undefined,
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const subject = "Welcome to SafeSpend – Portal Access Granted";
  const dashboardUrl = process.env.CLIENT_URL
    ? `${process.env.CLIENT_URL}/dashboard`
    : "https://safespend.app/dashboard";
  const htmlMessage = getWelcomeEmailTemplate(
    user.fullName,
    "google",
    dashboardUrl
  );

  const raw = makeBody({
    to: user.email,
    from: user.email,
    subject,
    message: htmlMessage,
    isHtml: true,
  });

  // Send the message
  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });

  return res.data;
}

// Send welcome email for users without Gmail tokens (normal registration)
// Uses a configured admin/service Gmail account to send emails
async function sendWelcomeEmailViaGmail(user) {
  try {
    // If user has Gmail tokens (e.g., Google Sign-In), use their account
    if (user.gmailAccessToken) {
      return await sendWelcomeEmail(
        {
          accessToken: user.gmailAccessToken,
          refreshToken: user.gmailRefreshToken,
        },
        user
      );
    }

    // For normal email/password registration, use admin/service account
    // This requires GMAIL_SERVICE_ACCOUNT_EMAIL and GMAIL_SERVICE_ACCOUNT_KEY in .env
    // Set up in Google Cloud: Create a service account and grant it Gmail API permissions

    const adminEmail = process.env.GMAIL_SERVICE_ACCOUNT_EMAIL;
    const serviceAccountKey = process.env.GMAIL_SERVICE_ACCOUNT_KEY;

    if (!adminEmail || !serviceAccountKey) {
      console.warn(
        "Service account credentials not configured. Welcome email not sent for normal registration."
      );
      return {
        success: true,
        message: "Account created. Email sending not configured.",
      };
    }

    // Parse service account key (it should be a JSON string)
    let keyData;
    try {
      keyData =
        typeof serviceAccountKey === "string"
          ? JSON.parse(serviceAccountKey)
          : serviceAccountKey;
    } catch (e) {
      throw new Error("Invalid service account key format");
    }

    // Create OAuth2 client using service account
    const { google: googleAuth } = await import("google-auth-library");
    const jwtClient = new googleAuth.auth.JWT({
      email: keyData.client_email,
      key: keyData.private_key,
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    const gmail = google.gmail({
      version: "v1",
      auth: jwtClient,
    });

    const subject = "Welcome to SafeSpend – Portal Access Granted";
    const dashboardUrl = process.env.CLIENT_URL
      ? `${process.env.CLIENT_URL}/dashboard`
      : "https://safespend.app/dashboard";
    const htmlMessage = getWelcomeEmailTemplate(
      user.fullName,
      "email",
      dashboardUrl
    );

    const raw = makeBody({
      to: user.email,
      from: adminEmail,
      subject,
      message: htmlMessage,
      isHtml: true,
    });

    // Send the message
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    console.log(`Welcome email sent to ${user.email}`);
    return res.data;
  } catch (error) {
    console.error("Error in sendWelcomeEmailViaGmail:", error.message);
    // Don't throw - let registration complete even if email fails
    return { success: false, error: error.message };
  }
}

export { sendWelcomeEmail, sendWelcomeEmailViaGmail };
