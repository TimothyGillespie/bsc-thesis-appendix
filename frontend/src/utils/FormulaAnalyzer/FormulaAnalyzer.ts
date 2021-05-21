class FormulaAnalyzer {

    formula: string;

    constructor(formula: string) {
        this.formula = formula.replace(' ','');
    }

    getFunctions(): {[key: string]: FunctionDescription} {

        return getFunctions(this.formula);

    }



}

export function getFunctions(input: string): {[key: string]: FunctionDescription} {


    const intermediatResult = getTopLevelFunctionSections(input);
    let result: {[key: string]: FunctionDescription} = {};

    for(const [name, parts] of Object.entries(intermediatResult)) {
        result[name] = {
            parameterCount: (parts.inside.replace(/\(.*\)/g, '').match(/,/g)?.length ?? 0) + 1,
        };

        result = {
            ...result,
            ...getFunctions(parts.inside),
        };
    }

    return result;
}

export function getTopLevelFunctionSections(input: string): FunctionParts {

    const result: FunctionParts = {};

    let currentFunctionName = '';
    let level = 0;
    let currentInside = '';

    for(const nextCharacter of input) {

        if(nextCharacter === ',' && level === 0) {
            currentFunctionName = '';
            continue;
        }

        if(nextCharacter === '(') {
            level++;

            if(level === 1)
                continue
        }

        if(nextCharacter === ')') {
            level--;

            if(level === 0) {
                result[currentFunctionName] = {inside: currentInside};
                currentFunctionName = '';
                currentInside = '';
                continue;
            }

        }

        if(level === 0 && nextCharacter.match('\\w')) {
            currentFunctionName += nextCharacter;
        }

        if(level > 0 && nextCharacter.match('[\\w,\\(\\)]')) {
            currentInside += nextCharacter;
        }

    }

    return result;
}

export interface FunctionDescription {
    parameterCount: number;
}

interface FunctionParts {
    [key: string]: {inside: string}
}

export interface ParameterDescription {
    name: string;
    type: string;
}

export default FormulaAnalyzer;