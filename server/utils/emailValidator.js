import { validate } from "deep-email-validator";
import { RateLimiterMemory } from "rate-limiter-flexible";

// 1. Hourly attempt limiter (5 per hour)
const hourlyLimiter = new RateLimiterMemory({
    points: 5,
    duration: 3600, // 1 hour
});

// 2. Failure block limiter (3 fails in 15 mins)
const failureLimiter = new RateLimiterMemory({
    points: 3,
    duration: 900, // 15 mins
});

/**
 * Simple Email Validation:
 * 1. Syntax check
 * 2. MX records check (Domain existence)
 * 3. Disposable email provider check
 * 
 * Reliability: We rely on OTP verification for mailbox-level validity.
 */
export async function validateEmailDomain(email, ip) {
    const professionalErrorMessage = "Account not found. Please verify your credentials or register a new account.";
    const securityTriggerMsg = "Security check triggered. Too many attempts from this connection. Please try again in an hour.";

    // 0. Rate Limiting Check
    try {
        const failRes = await failureLimiter.get(ip);
        if (failRes && failRes.remainingPoints <= 0) {
            return {
                valid: false,
                rateLimited: true,
                message: "Security threat detected. Connection blocked for 15 minutes due to multiple invalid IDs."
            };
        }
        await hourlyLimiter.consume(ip);
    } catch (limitRes) {
        return {
            valid: false,
            rateLimited: true,
            message: securityTriggerMsg
        };
    }

    try {
        // 1. Core Validation (Syntax, MX, Disposable)
        const res = await validate({
            email: email,
            validateSMTP: false, // SMTP check is unreliable and removed as per request
        });

        const validators = res.validators;

        // CRITICAL FAILURES: Syntax, Disposable, and Domain Existence (MX)
        const isSyntaxValid = validators.regex?.valid;
        const isDomainValid = validators.mx?.valid;
        const isNotDisposable = validators.disposable?.valid;

        if (!isSyntaxValid || !isDomainValid || !isNotDisposable) {
            await failureLimiter.consume(ip).catch(() => { });

            if (!isNotDisposable) {
                return { valid: false, message: "Disposable email providers are not permitted for elite access." };
            }

            return {
                valid: false,
                message: professionalErrorMessage
            };
        }

        // Success: Reset failure count for this IP
        await failureLimiter.delete(ip).catch(() => { });

        return { valid: true, message: "ID routing verified." };
    } catch (error) {
        console.error(`Validation failed for ${email}:`, error.message);
        await failureLimiter.consume(ip).catch(() => { });
        return { valid: false, message: professionalErrorMessage };
    }
}
