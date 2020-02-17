let brackets = {
    '[': ']',
    '(': ')',
    '{': '}',
};

function isElement(str) {
    return str.match(/[A-Z]/);
}

export function isBracket(c) {
    return Object.keys(brackets).includes(c);
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
    return { [element]: number };
}

export function getNumberOfMolecules(str, index) {
    let ret = parseInt(str.substr(index), 10);
    return isNaN(ret) ? 1 : ret;
}

function multiplyMolecules(molecules, multiplyBy) {
    if (molecules === {} || multiplyBy === [])
        return molecules;
    multiplyBy.forEach(factor => {
        for (let [key, value] of Object.entries(molecules)) {
            molecules[key] = value * factor;
        }
    })
    return molecules;
}

function mergeElements(oldElements, newElements, multiplyBy = []) {
    newElements = multiplyMolecules(newElements, multiplyBy);
    let ret = {};
    Object.keys(oldElements).forEach(key => {
        if (newElements.hasOwnProperty(key)) {
            ret[key] = oldElements[key] + newElements[key]
            delete oldElements[key];
            delete newElements[key];
        }
      })
    return {...ret, ...oldElements, ...newElements};
}

function parseElement(input, multiplyBy = []) {
    var ret = {};
    var i = 0;
    while (input[i]) {
        if (isBracket(input[i])) {
            let indexBracket = getClosingBracketIndex(input.substr(i)) + i;
            let numberOfMolecules = getNumberOfMolecules(input, indexBracket + 1);
            let molecules = parseElement(input.substr(i + 1, indexBracket - i), [...multiplyBy, numberOfMolecules]);
            ret = mergeElements(ret, molecules);
            i = indexBracket + 1;
        }
        else if (isElement(input[i])) {
            var element = getElement(input.substr(i));
            ret = mergeElements(ret, element, multiplyBy);
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
