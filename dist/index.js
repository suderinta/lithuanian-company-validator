"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LT_BANK_CODES = void 0;
exports.calculateModulus11 = calculateModulus11;
exports.validateCompanyCode = validateCompanyCode;
exports.validateVatCode = validateVatCode;
exports.validateIban = validateIban;
exports.getBankFromIban = getBankFromIban;
exports.formatVatCode = formatVatCode;
/**
 * Lithuanian Bank Codes Mapping
 */
exports.LT_BANK_CODES = {
    "70440": "SEB Bankas",
    "73000": "Swedbank",
    "40100": "Luminor Bank",
    "71800": "Šiaulių Bankas",
    "35000": "Paysera LT",
    "30100": "Revolut Bank UAB",
    "72900": "Citadele Bankas",
    "70100": "Lietuvos Bankas",
    "21400": "Nordea Bank Lietuva",
    "70800": "Danske Bank Lietuva",
};
/**
 * Calculates check digit using Lithuanian Modulus-11 algorithm.
 * Used by Lithuanian State Tax Inspectorate (VMI) & Centre of Registers (Registrų Centras).
 */
function calculateModulus11(digits) {
    const w1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7];
    let sum1 = 0;
    for (let i = 0; i < digits.length; i++) {
        sum1 += digits[i] * w1[i % w1.length];
    }
    let rem = sum1 % 11;
    if (rem < 10)
        return rem;
    const w2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let sum2 = 0;
    for (let i = 0; i < digits.length; i++) {
        sum2 += digits[i] * w2[i % w2.length];
    }
    rem = sum2 % 11;
    if (rem < 10)
        return rem;
    return 0;
}
/**
 * Validates Lithuanian Company Code (Įmonės kodas).
 * Must be 7 or 9 numeric digits satisfying Modulus-11 checksum.
 */
function validateCompanyCode(code) {
    if (code == null)
        return false;
    const str = String(code).trim();
    if (!/^\d{7}$|^\d{9}$/.test(str))
        return false;
    const digits = str.split("").map(Number);
    const dataDigits = digits.slice(0, -1);
    const expectedChecksum = digits[digits.length - 1];
    return calculateModulus11(dataDigits) === expectedChecksum;
}
/**
 * Validates Lithuanian VAT Number (PVM mokėtojo kodas).
 * Must be "LT" followed by 9 digits (standard) or 12 digits (branches/temporary).
 */
function validateVatCode(vat) {
    if (!vat || typeof vat !== "string")
        return false;
    const clean = vat.trim().toUpperCase().replace(/\s+/g, "");
    // Must match LT + 9 or 12 digits, or raw 9/12 digits
    let numPart = clean;
    if (clean.startsWith("LT")) {
        numPart = clean.slice(2);
    }
    if (!/^\d{9}$|^\d{12}$/.test(numPart))
        return false;
    const digits = numPart.split("").map(Number);
    if (digits.length === 9) {
        // 9-digit VAT: 8th digit can be anything, 9th is checksum
        const dataDigits = digits.slice(0, 8);
        const expected = digits[8];
        return calculateModulus11(dataDigits) === expected;
    }
    else if (digits.length === 12) {
        // 12-digit VAT: 11th digit must be 1, 12th is checksum
        if (digits[10] !== 1)
            return false;
        const dataDigits = digits.slice(0, 11);
        const expected = digits[11];
        return calculateModulus11(dataDigits) === expected;
    }
    return false;
}
/**
 * Validates Lithuanian IBAN Bank Account using standard MOD-97 checksum.
 * Must be 20 characters starting with "LT".
 */
function validateIban(iban) {
    if (!iban || typeof iban !== "string")
        return false;
    const clean = iban.trim().toUpperCase().replace(/\s+/g, "");
    if (!/^LT\d{18}$/.test(clean))
        return false;
    // Rearrange: move first 4 chars to end: LTxx -> 2129xx
    const rearranged = clean.slice(4) + "2129" + clean.slice(2, 4);
    // BigInt mod 97 check
    try {
        return BigInt(rearranged) % 97n === 1n;
    }
    catch {
        return false;
    }
}
/**
 * Identifies the bank name from a Lithuanian IBAN.
 */
function getBankFromIban(iban) {
    if (!validateIban(iban))
        return null;
    const clean = iban.trim().toUpperCase().replace(/\s+/g, "");
    const bankCode = clean.slice(4, 9);
    return exports.LT_BANK_CODES[bankCode] || "Kitas Lietuvos bankas / Kredito unija";
}
/**
 * Formats a VAT code into standard 'LT123456789' representation.
 */
function formatVatCode(vat) {
    const clean = vat.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    return clean.startsWith("LT") ? clean : `LT${clean}`;
}
