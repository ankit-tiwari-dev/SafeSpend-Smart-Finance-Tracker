import Feedback from "../models/feedback.model.js";
import { sendEmailViaGmailAPI } from "../utils/googleMailer.js";

/**
 * Handle Contact Form Submission
 * Sends an email to the admin with the user's message.
 */
export async function submitContact(req, res) {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email, and message are required." });
        }

        const adminEmail = "oliver827691@gmail.com";
        const emailSubject = `[SafeSpend Contact] ${subject || "New Inquiry"}`;
        const htmlMessage = `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <br/>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

        const result = await sendEmailViaGmailAPI({
            to: adminEmail,
            subject: emailSubject,
            htmlMessage,
        });

        if (result.success) {
            res.status(200).json({ message: "Message sent successfully!" });
        } else {
            console.error("Email sending failed:", result.error);
            res.status(500).json({ message: "Failed to send message. Please try again later." });
        }
    } catch (error) {
        console.error("Contact submission error:", error);
        res.status(500).json({ message: "Server error handling contact form." });
    }
}

/**
 * Handle Feedback Submission
 * Saves feedback to the database.
 */
export async function submitFeedback(req, res) {
    try {
        const { rating, category, comment, email } = req.body;
        const userId = req.user ? req.user._id : null; // Optional: specific to logged-in users

        if (!rating || !category || !comment) {
            return res.status(400).json({ message: "Rating, category, and comment are required." });
        }

        const newFeedback = new Feedback({
            user: userId,
            rating,
            category,
            comment,
            email,
        });

        await newFeedback.save();

        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        console.error("Feedback submission error:", error);
        res.status(500).json({ message: "Server error handling feedback." });
    }
}
