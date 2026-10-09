const assert = require("node:assert/strict");
const test = require("node:test");
const {
  validateCompanyCode,
  validateVatCode,
  validateIban,
  getBankFromIban,
  formatVatCode
} = require("./dist/index.js");

test("Lithuanian Company Code validation (Modulus 11)", () => {
  // Real Lithuanian companies
  assert.equal(validateCompanyCode("123033512"), true); // Maxima LT
  assert.equal(validateCompanyCode("121215434"), true); // Telia Lietuva
  assert.equal(validateCompanyCode("301844044"), true); // Ignitis grupė
  
  // Invalid codes
  assert.equal(validateCompanyCode("123456788"), false);
  assert.equal(validateCompanyCode("abcdefghi"), false);
  assert.equal(validateCompanyCode("12345"), false);
});

test("Lithuanian VAT (PVM) validation", () => {
  assert.equal(validateVatCode("LT230335113"), true);
  assert.equal(validateVatCode("LT212154314"), true);
  assert.equal(validateVatCode("230335113"), true);
  
  // Invalid VAT
  assert.equal(validateVatCode("LT123456789"), false);
  assert.equal(validateVatCode("LV123456789"), false);
});

test("Lithuanian IBAN validation & bank identification", () => {
  // Real valid Lithuanian IBANs
  assert.equal(validateIban("LT747044060001000000"), true);
  assert.equal(getBankFromIban("LT747044060001000000"), "SEB Bankas");
  assert.equal(validateIban("LT207300010112345678"), true);
  assert.equal(getBankFromIban("LT207300010112345678"), "Swedbank");
  assert.equal(validateIban("LT000000000000000000"), false);
});

test("VAT formatting", () => {
  assert.equal(formatVatCode("230335113"), "LT230335113");
  assert.equal(formatVatCode("lt 230335113"), "LT230335113");
});
