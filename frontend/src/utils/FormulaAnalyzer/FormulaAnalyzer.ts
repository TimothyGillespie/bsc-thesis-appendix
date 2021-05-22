import * as _ from 'lodash';

class FormulaAnalyzer {

    formula: string;

    constructor(formula: string) {
        this.formula = formula.replace(' ','');
    }

    getFunctions(): FunctionDescription[] {

        return getFunctions(this.formula);

    }

}

export function getFunctions(input: string): FunctionDescription[] {


    const intermediateResult = getTopLevelFunctionSections(input);
    let result: FunctionDescription[] = [];

    for(const [name, parts] of Object.entries(intermediateResult)) {
        for(const singleInside of parts.inside) {
            result.push({
                name,
                parameterCount: (singleInside.replace(/\(.*\)/g, '').match(/,/g)?.length ?? 0) + 1,
            });

            result = [
                ...result,
                ...getFunctions(singleInside),
            ];
        }
    }

    const alreadyContained: FunctionDescription[] = [];

    return result.filter((maybeNewElement) => {
        const isContained = alreadyContained.some((alreadyContainedElement) => _.isEqual(maybeNewElement, alreadyContainedElement));
        if(!isContained)
            alreadyContained.push(maybeNewElement);

        return !isContained;
    }).sort((element, otherElement) => {
        if(element.name !== otherElement.name)
            return element.name.localeCompare(otherElement.name);

        return element.parameterCount - otherElement.parameterCount;
    });
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
                if(result[currentFunctionName])
                    result[currentFunctionName].inside.push(currentInside)
                else
                    result[currentFunctionName] = {inside: [currentInside]};

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

export type FunctionDescription = {
    name: string;
    parameterCount: number;
}

interface FunctionParts {
    [key: string]: {inside: string[]}
}

export interface ParameterDescription {
    name: string;
    type: string;
}

export default FormulaAnalyzer;
