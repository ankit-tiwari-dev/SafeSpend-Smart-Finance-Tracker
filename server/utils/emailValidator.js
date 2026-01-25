import validate from "deep-email-validator";

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
export async function validateEmailDomain(email) {
    const prefix = email.split("@")[0];
    const professionalErrorMessage = "Account not found. Please verify your credentials or register a new account.";

    // 1. Entropy Analysis (Gibberish Detection)
    if (isGibberish(prefix)) {
        return {
            valid: false,
            message: "Unrecognized Identifier. Please provide a standard contact protocol."
        };
    }

    try {
        // 2. Deep Validation (Syntax, MX, Disposable, SMTP Handshake)
        const res = await validate({
            email: email,
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: true, // Performs the RCPT TO handshake
        });

        if (!res.valid) {
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

        return { valid: true, message: "ID routing verified." };
    } catch (error) {
        console.error(`Deep validation failed for ${email}:`, error.message);
        // Fallback for network issues during validation
        return { valid: false, message: professionalErrorMessage };
    }
}
