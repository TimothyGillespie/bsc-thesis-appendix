import { InfixOperator } from '../../formula';
import standardInfixOperators from '../../standardInfixOperator';
import enumerate from '../../../enumerate';

function isTopLevelFunctionInfix(expression: string, operators: InfixOperator[] = standardInfixOperators): boolean {
	let level = 0;
  const whitespaceAdjustedOps = operators
    .map((op) => op.recognizeWithoutWhitespace ? op : {...op, symbol: ` ${op.symbol} `} )

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
			for (const possibleOperator of whitespaceAdjustedOps) {
				if (expression.substr(index, possibleOperator.symbol.length) === possibleOperator.symbol) return true;
			}
		}
	}

	return false;
}

export default isTopLevelFunctionInfix;
