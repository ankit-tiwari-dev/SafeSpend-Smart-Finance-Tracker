import validate from "deep-email-validator";
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
 * Calculates the entropy of a string to detect "gibberish" or random prefixes.
 * Lower entropy generally means more structure, but for email prefixes, 
 * extremely high unique-character-to-length ratios in short strings often indicate random typing.
 */
function isGibberish(prefix) {
    if (prefix.length < 5) return false; // Too short to judge accurately

    const uniqueChars = new Set(prefix.toLowerCase().replace(/[^a-z]/g, "")).size;
    const vowelCount = (prefix.match(/[aeiou]/gi) || []).length;

    // Heuristic 1: Very low vowel ratio (typical of random consonant strings like 'sdgfd')
    const vowelRatio = vowelCount / prefix.length;

    // Heuristic 2: Very high unique character count relative to length
    const uniqueRatio = uniqueChars / prefix.length;

    // Flag if it looks like a keyboard smash
    if (vowelRatio < 0.1 && prefix.length > 6) return true;
    if (uniqueRatio > 0.8 && prefix.length > 8) return true;

    return false;
}

/**
 * Upgraded Email Validation:
 * 1. Syntax check
 * 2. Entropy / Gibberish detection
 * 3. Disposable email provider check
 * 4. SMTP Handshake (Mailbox existence)
 */
export async function validateEmailDomain(email, ip) {
    const prefix = email.split("@")[0];
    const professionalErrorMessage = "Account not found. Please verify your credentials or register a new account.";
    const securityTriggerMsg = "Security check triggered. Too many attempts from this connection. Please try again in an hour.";

    // 0. Rate Limiting Check
    try {
        // Check failure block first (15 mins)
        const failRes = await failureLimiter.get(ip);
        if (failRes && failRes.remainingPoints <= 0) {
            return {
                valid: false,
                rateLimited: true,
                message: "Security threat detected. Connection blocked for 15 minutes due to multiple invalid IDs."
            };
        }

        // Check hourly limit (5 per hour)
        await hourlyLimiter.consume(ip);
    } catch (limitRes) {
        return {
            valid: false,
            rateLimited: true,
            message: securityTriggerMsg
        };
    }

    // 1. Entropy Analysis (Gibberish Detection)
    if (isGibberish(prefix)) {
        await failureLimiter.consume(ip).catch(() => { }); // Count as failure
        return {
            valid: false,
            message: "Unrecognized Identifier. Please provide a standard contact protocol."
        };
    }

    try {
        // 2. Deep Validation (Syntax, MX, Disposable, SMTP Handshake)
        const res = await validate({
            email: email,
            validateSMTP: true,
        });

        if (!res.valid) {
            await failureLimiter.consume(ip).catch(() => { }); // Count as failure
            // Check if it's a disposable email
            if (res.validators.disposable && !res.validators.disposable.valid) {
                return { valid: false, message: "Disposable email providers are not permitted for elite access." };
            }

            // For most other failures (SMTP, MX) return the professional error
            return {
                valid: false,
                message: professionalErrorMessage
            };
        }

        // Success: Reset failure count for this IP
        await failureLimiter.delete(ip).catch(() => { });

        return { valid: true, message: "ID routing verified." };
    } catch (error) {
        console.error(`Deep validation failed for ${email}:`, error.message);
        // Fallback for network issues during validation
        return { valid: false, message: professionalErrorMessage };
    }
}
