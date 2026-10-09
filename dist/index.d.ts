/**
 * Lithuanian Bank Codes Mapping
 */
export declare const LT_BANK_CODES: Record<string, string>;
/**
 * Calculates check digit using Lithuanian Modulus-11 algorithm.
 * Used by Lithuanian State Tax Inspectorate (VMI) & Centre of Registers (Registrų Centras).
 */
export declare function calculateModulus11(digits: number[]): number;
/**
 * Validates Lithuanian Company Code (Įmonės kodas).
 * Must be 7 or 9 numeric digits satisfying Modulus-11 checksum.
 */
export declare function validateCompanyCode(code: string | number): boolean;
/**
 * Validates Lithuanian VAT Number (PVM mokėtojo kodas).
 * Must be "LT" followed by 9 digits (standard) or 12 digits (branches/temporary).
 */
export declare function validateVatCode(vat: string): boolean;
/**
 * Validates Lithuanian IBAN Bank Account using standard MOD-97 checksum.
 * Must be 20 characters starting with "LT".
 */
export declare function validateIban(iban: string): boolean;
/**
 * Identifies the bank name from a Lithuanian IBAN.
 */
export declare function getBankFromIban(iban: string): string | null;
/**
 * Formats a VAT code into standard 'LT123456789' representation.
 */
export declare function formatVatCode(vat: string): string;
