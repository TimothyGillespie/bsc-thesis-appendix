import { InfixOperator, InfixOperatorInstance, OperatorFound } from '../../formula';
import enumerate from '../../../enumerate';

function getTopLevelInfixFunction(expression: string, operators: InfixOperator[]): InfixOperatorInstance | null {
	let level = 0;
	const foundOperators: OperatorFound[] = [];
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
				if (expression.substr(index, possibleOperator.symbol.length) === possibleOperator.symbol) {
					foundOperators.push({
						operator: {...possibleOperator, symbol: possibleOperator.symbol.trim()},
						startIndex: index,
						// - 1 because the startIndex is inclusive
						endIndex: index + possibleOperator.symbol.length - 1,
					});
				}
			}
		}
	}

	if (foundOperators.length === 0) return null;

	const highestPriority = Math.max(...foundOperators.map(item => item.operator.priority));

	// The elements should already be sorted, but this assures correctness
	foundOperators.sort((a, b) => a.startIndex - b.startIndex);

	const foundTopLevelOperator = foundOperators.find(item => item.operator.priority === highestPriority);

	if (foundTopLevelOperator === undefined) {
		throw new Error(
			'Unexpected State occurred: The calculated highest priority was not found in the found infix operators',
		);
	}

	return {
		operator: foundTopLevelOperator.operator,
		left: expression.substring(0, foundTopLevelOperator.startIndex),
		right: expression.substring(foundTopLevelOperator.endIndex + 1, expression.length),
	};
}

export default getTopLevelInfixFunction;
