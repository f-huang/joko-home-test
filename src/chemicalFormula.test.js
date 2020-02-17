import { parseChemicalFormula } from './chemicalFormula'

describe("Parse a Chemical Formula function", () => {
    test("Empty string", () => {
        const inputs = ["", "            ", " \t\t   "];
        inputs.forEach(input => {
            expect(parseChemicalFormula(input)).toEqual(null)
        })
    })
})