"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const index_1 = require("./index");
(0, node_test_1.default)("Lithuanian Company Code validation (Modulus 11)", () => {
    // Real Lithuanian companies
    strict_1.default.equal((0, index_1.validateCompanyCode)("123033512"), true); // Maxima LT
    strict_1.default.equal((0, index_1.validateCompanyCode)("121215434"), true); // Telia Lietuva
    strict_1.default.equal((0, index_1.validateCompanyCode)("301844044"), true); // Ignitis grupė
    // Invalid codes
    strict_1.default.equal((0, index_1.validateCompanyCode)("123456788"), false);
    strict_1.default.equal((0, index_1.validateCompanyCode)("abcdefghi"), false);
    strict_1.default.equal((0, index_1.validateCompanyCode)("12345"), false);
});
(0, node_test_1.default)("Lithuanian VAT (PVM) validation", () => {
    strict_1.default.equal((0, index_1.validateVatCode)("LT230335113"), true);
    strict_1.default.equal((0, index_1.validateVatCode)("LT212154314"), true);
    strict_1.default.equal((0, index_1.validateVatCode)("230335113"), true);
    // Invalid VAT
    strict_1.default.equal((0, index_1.validateVatCode)("LT123456789"), false);
    strict_1.default.equal((0, index_1.validateVatCode)("LV123456789"), false);
});
(0, node_test_1.default)("Lithuanian IBAN validation & bank identification", () => {
    // Test Swedbank LT IBAN format
    const validSwedbank = "LT127300010112345678"; // valid Mod-97 format
    // Generate valid checksum for test
    strict_1.default.equal((0, index_1.validateIban)("LT607044060001000000"), true);
    strict_1.default.equal((0, index_1.getBankFromIban)("LT607044060001000000"), "SEB Bankas");
    strict_1.default.equal((0, index_1.getBankFromIban)("LT127300000000000000"), "Swedbank");
    strict_1.default.equal((0, index_1.validateIban)("LT000000000000000000"), false);
});
(0, node_test_1.default)("VAT formatting", () => {
    strict_1.default.equal((0, index_1.formatVatCode)("230335113"), "LT230335113");
    strict_1.default.equal((0, index_1.formatVatCode)("lt 230335113"), "LT230335113");
});
