import { InfixOperator } from '../../formula-types';
import standardInfixOperators from '../../standardInfixOperator';
import enumerate from '../../../enumerate';

function isTopLevelFunctionInfix(expression: string, operators: InfixOperator[] = standardInfixOperators): boolean {
	let level = 0;

	for (const [index, character] of enumerate(expression)) {
		if (character === '(') {
			level++;
			continue;
		}

		if (character === ')') {
			level--;
			continue;
		}

		if (level === 0) {
			for (const possibleOperator of operators) {
				if (expression.substr(index, possibleOperator.symbol.length) === possibleOperator.symbol) return true;
			}
		}
	}

	return false;
}

export default isTopLevelFunctionInfix;
