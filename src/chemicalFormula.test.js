import { parseChemicalFormula, getClosingBracketIndex, getNumberOfMolecules, getElement } from './chemicalFormula'

describe("Get the index of the closing bracket", () => {
    test("Simple test", () => {
        const input = "(test)"
        expect(getClosingBracketIndex(input)).toEqual(5);
    });
    
    test("Nested test", () => {
        const input = "( [ 2 ])"
        expect(getClosingBracketIndex(input)).toEqual(7);
        expect(getClosingBracketIndex(input.substr(2))).toEqual(6 - 2);
    });

    test("Nested with same brackets", () => {
        const input = "[[ 2 ]]"
        expect(getClosingBracketIndex(input)).toEqual(6);
        expect(getClosingBracketIndex(input.substr(1))).toEqual(5 - 1);
    });
    
})


describe("Get number given a string index", () => {
    test("Single number", () => {
        const input = "(test)2"
        expect(getNumberOfMolecules(input, 6)).toEqual(2);
    });
    test("No number", () => {
        const input = "(test)"
        expect(getNumberOfMolecules(input, 5)).toEqual(1);
    });
    test("Two digits number", () => {
        const input = "(test)12"
        expect(getNumberOfMolecules(input, 6)).toEqual(12);
    });

});

describe("Get Element in a string", () => {
    test("Simple", () => {
        expect(getElement("H2O")).toEqual({name: 'H', number: 2});
    })
    test("Simple", () => {
        expect(getElement("O")).toEqual({name: 'O', number: 1});
    })
    test("Two digits elements", () => {
        expect(getElement("Mg12")).toEqual({name: 'Mg', number: 12});
    })
    test("Tricky", () => {
        expect(getElement("HO")).toEqual({name: 'H', number: 1});
    })
});


describe("Parse a Chemical Formula function", () => {
    test("Empty string", () => {
        const inputs = ["", "            ", " \t\t   "];
        inputs.forEach(input => {
            expect(parseChemicalFormula(input)).toEqual(null);
        })
    })

    test("H20", () => {
        expect(parseChemicalFormula("H2O")).toEqual({H: 2, O: 1});
    })

    test("Mg", () => {
        expect(parseChemicalFormula("Mg")).toEqual({Mg: 1});
    })
    // test("Mg(O)2", () => {
    //     expect(parseChemicalFormula("Mg(O)2")).toEqual({Mg: 1, O: 2});
    // })
})