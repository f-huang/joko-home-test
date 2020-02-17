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
        element = str.match(/[A-Z]{1}([a-z]{1})?/g)[0];
        number = getNumberOfMolecules(str, element.length === 2 ? 2 : 1);
    }
    return { 'name': element, 'number': number };
}

export function getNumberOfMolecules(str, index) {
    let ret = parseInt(str.substr(index), 10);
    return isNaN(ret) ? 1 : ret;
}

function multiplyMolecules(molecules, multiplyBy) {
    multiplyBy.forEach(factor => {
        molecules.map(numberOfMolecules => numberOfMolecules * factor)
    })
    return molecules;
}

function addElement(ret, element) {
    if (element.name in ret) {
        ret[element.name] += element.number;
    }
    else
        ret[element.name] = element.number;
    return ret;
}

function parseElement(input, multiplyBy = []) {
    var ret = {};
    var i = 0;
    var indexBracket = 0;

    while (input[i]) {
        if (isBracket(input[i])) {
            indexBracket = getClosingBracketIndex(input) + i;
            numberOfMolecules = getNumberOfMolecules(input, indexBracket + 1);
            molecules = parseElement(input.substr(i, indexBracket - i), [...multiplyBy, numberOfMolecules]);
            ret = multiplyMolecules(molecules, multiplyBy)
            i = indexBracket;
        }
        else if (isElement(input[i])) {
            var element = getElement(input.substr(i));
            console.log(element);
            ret = addElement(ret, element);
        }
        i++;
    }
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
    let ret = parseElement(input);
    return ret;
}
