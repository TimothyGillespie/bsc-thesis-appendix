export const standardInfixOperators: InfixOperator[] = [
	{ symbol: '+', priority: 1 },
	{ symbol: '-', priority: 1 },
	{ symbol: '*', priority: 1 },
	{ symbol: '/', priority: 1 },

	{ symbol: '=', priority: 1 },
	{ symbol: '>', priority: 1 },
	{ symbol: '<', priority: 1 },
	{ symbol: '>=', priority: 1 },
	{ symbol: '=<', priority: 1 },

	{ symbol: 'and', priority: 2 },
	{ symbol: 'or', priority: 2 },
	{ symbol: 'xor', priority: 2 },
	{ symbol: '=>', priority: 2 },
	{ symbol: '<=', priority: 2 },
	{ symbol: '<=>', priority: 2 },
];

export function topLevelFunctionIsInfix(
	expression: string,
	operators: InfixOperator[] = standardInfixOperators,
): boolean {
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

export function getTopLevelInfixOperator(expression: string, operators: InfixOperator[]): InfixOperatorInstance | null {
	let level = 0;
	const foundOperators: OperatorFound[] = [];

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
				if (expression.substr(index, possibleOperator.symbol.length) === possibleOperator.symbol) {
					foundOperators.push({
						operator: possibleOperator,
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

export function topLevelFunctionIsPrefix(expression: string): boolean {
	let level = 0;
	let functionContentStarted = false;
	let functionNameContained = false;
	const trimmedExpression = expression.trim();

	for (const [index, character] of enumerate(trimmedExpression)) {
		if (!functionContentStarted && !functionNameContained) functionNameContained = character.match(/[A-Za-z0-9]/);

		if (character === '(') {
			level++;
			functionContentStarted = true;
			continue;
		}

		if (!functionContentStarted) {
			continue;
		}

		if (character === ')') {
			level--;
		}

		if (level === 0) {
			return index === trimmedExpression.length - 1;
		}
	}

	return false;
}

export function getTopLevelPrefixOperator(): PrefixOperatorInstance | null {
	return null;
}

export function getOperator(symbol: string): InfixOperator | undefined {
	return standardInfixOperators.find(item => item.symbol === symbol);
}

type InfixOperator = {
	symbol: string;
	priority: number;
};

type PrefixOperatorInstance = {
	symbol: string;
	parameters: string[];
};

type InfixOperatorInstance = {
	operator: InfixOperator;
	left: string;
	right: string;
};

type OperatorFound = {
	operator: InfixOperator;
	startIndex: number;
	endIndex: number;
};

function* enumerate(iterable: Iterable<any>) {
	let i = 0;

	for (const x of iterable) {
		yield [i, x];
		i++;
	}
}
