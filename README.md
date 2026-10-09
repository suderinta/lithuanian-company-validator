# Lithuanian Company & VAT Validator (`@suderinta/lithuanian-company-validator`)

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Suderinta](https://img.shields.io/badge/Maintained%20by-Suderinta.lt-0ea5e9.svg)](https://www.suderinta.lt)

Greita, patikima ir pilnai tipizuota TypeScript/JavaScript biblioteka Lietuvos juridinių asmenų kodų (**Įmonės kodo** pagal Modulus 11 algoritmą), **PVM mokėtojo kodų** ir lietuviškų **IBAN banko sąskaitų** validavimui bei banko nustatymui.

Sukurta ir prižiūrima **[Suderinta.lt](https://www.suderinta.lt)** – verslo valdymo sistemų (VVS/ERP), CRM ir procesų automatizavimo inžinierių.

---

## ⚡ Galimybės (Features)

*   ✅ **Įmonės kodo validavimas:** oficialus VMI ir Registrų Centro Modulus-11 algoritmas (7 ir 9 skaitmenų kodai).
*   ✅ **PVM kodo validavimas:** 9 skaitmenų (standartinis) ir 12 skaitmenų (filialų) kontrolinių skaitmenų apskaičiavimas.
*   ✅ **IBAN sąskaitų tikrinimas:** pilnas MOD-97 algoritmas bei automatinis banko nustatymas (Swedbank, SEB, Luminor, Šiaulių bankas, Revolut Bank, Paysera ir kt.).
*   ✅ **PVM formatavimas:** automatinis priešdėlio `LT` sutvarkymas.
*   ✅ **Nulinės priklausomybės (Zero Dependencies):** veikia Node.js, Bun, Deno ir naršyklėje.

---

## 📦 Diegimas (Installation)

```bash
npm install @suderinta/lithuanian-company-validator
```
arba su yarn / pnpm:
```bash
pnpm add @suderinta/lithuanian-company-validator
```

---

## 🚀 Naudojimas (Usage)

### 1. Įmonės kodo validavimas (Modulus 11)
```typescript
import { validateCompanyCode } from "@suderinta/lithuanian-company-validator";

// Tikri Lietuvos įmonių kodai
validateCompanyCode("123033512"); // true (UAB Maxima LT)
validateCompanyCode("121215434"); // true (Telia Lietuva, AB)
validateCompanyCode("301844044"); // true (Ignitis grupė, AB)

// Neteisingi kodai
validateCompanyCode("123456788"); // false (kontrolinis skaitmuo nesutampa)
```

### 2. PVM mokėtojo kodo validavimas
```typescript
import { validateVatCode, formatVatCode } from "@suderinta/lithuanian-company-validator";

validateVatCode("LT230335113"); // true
validateVatCode("230335113");   // true (be prefikso)
validateVatCode("LT123456789"); // false

// Formatavimas
formatVatCode("230335113");     // "LT230335113"
```

### 3. Banko IBAN sąskaitos tikrinimas ir banko nustatymas
```typescript
import { validateIban, getBankFromIban } from "@suderinta/lithuanian-company-validator";

const iban = "LT747044060001000000";

if (validateIban(iban)) {
  console.log(getBankFromIban(iban)); // "SEB Bankas"
}
```

---

## 🧮 Nemokami interaktyvūs įrankiai

Ieškote paruoštų skaičiuoklių verslui ir buhalterijai? Išbandykite mūsų oficialius interaktyvius įrankius:
*   **[PVM Skaičiuoklė 2026](https://www.suderinta.lt/skaiciuokles/pvm-skaiciuokle)** – standartinis 21%, lengvatiniai tarifai ir atvirkštinis PVM su PDF ataskaitomis.
*   **[Atostoginių Skaičiuoklė 2026](https://www.suderinta.lt/skaiciuokles/atostoginiu-skaiciuokle)** – VDU ir nepanaudotų atostogų kompensacijos skaičiavimas.
*   **[CRM ir VVS Integracijos](https://www.suderinta.lt/blog/crm-integracija-su-rivile-ir-imas)** – Rivilė, Pragma, Finvalda ir i.MAS integracijų gidai.

---

## 🏢 Apie Suderinta.lt

**[Suderinta.lt](https://www.suderinta.lt)** kuria individualius programinės įrangos sprendimus, klientų savitarnos portalus ir automatizuoja verslo procesus Lietuvos įmonėms.

*   Svetainė: [https://www.suderinta.lt](https://www.suderinta.lt)
*   Sprendimai: [Klientų savitarnos portalai](https://www.suderinta.lt/sprendimai/klientu-savitarnos-portalai) | [CRM Sistemos](https://www.suderinta.lt/lp/crm-sistema)
*   Kontaktai: labas@suderinta.lt

---

## 📄 Licencija

MIT © [Suderinta.lt](https://www.suderinta.lt)
