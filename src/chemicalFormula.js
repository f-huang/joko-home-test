let brackets = {
    '[': ']',
    '(': ')',
    '{': '}',
};

function isElement(str) {
    return str.match(/[A-Z]/);
}

export function isBracket(c) {
    return c === '[' || c === '(' || c === '{';
}

export function getClosingBracketIndex(str) {
    if (!str)
        return null;
    let openingBracket = str[0];
    let closingBracket = brackets[str[0]];
    var depth = 0;
    var i = 0;
    while (str[i]) {
        if (str[i] === openingBracket)
            depth++;
        else if (str[i] === closingBracket)
            depth--;
        if (depth === 0)
            return i;
        i++;
    }
    return -1;
}

export function getElement(str) {
    var number = 1;
    var element = '';
    if (str.length == 1)
        element = str[0];
    else {
        let isTwoLetters = str[1].match(/a-z/);
        element = str.substr(0, isTwoLetters ? 2 : 1);
        number = getNumberOfMolecules(str, isTwoLetters ? 2 : 1);
    }
    return { [element]: number };
}

export function getNumberOfMolecules(str, index) {
    let ret = parseInt(str.substr(index), 10);
    return isNaN(ret) ? 1 : ret;
}


function parseElement(input, multiplyBy = []) {
    var ret = {};
    var i = 0;
    var indexBracket = 0;

    // while (input[i]) {
    //     if (isBracket(input[i])) {
    //         indexBracket = getClosingBracketIndex(input) + i;
    //         numberOfMolecules = getNumberOfMolecules(input, indexBracket + 1);
    //         ret = parseElement(input.substr(i, indexBracket - i), [...multiplyBy, numberOfMolecules]);
    //         i = indexBracket;
    //     }
    //     else if (isElement(input[i])) {
    //         element = input.substr(i, input[i + 1].match(/[a-z]/) ? 1 : 2);
    //         console.log(element);

    //     }
    //     i++;
    // }
    return ret
}



/**
 * 
 * @param {String} input 
 * 
 * @returns {Dict} elementName: number
 */
export function parseChemicalFormula(input) {
    if (input === null || input.trim() === "")
        return null;

    // isFormulaValid()
    ret = {};

    console.log(parseElement(input));

    return null;
    
}
