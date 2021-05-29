export const standardInfixOperators = ['=', '>', '<', '+', '-', '*', '^', '/', '>=', '<=', 'and', 'or', 'xor'];

export const topLevelFunctionIsInfix: (expression: string, operators: string[]) => boolean = (
	expression: string,
	operators = standardInfixOperators,
) => {
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
				if (expression.substr(index, possibleOperator.length) === possibleOperator) return true;
			}
		}
	}

	return false;
};

function* enumerate(iterable: Iterable<any>) {
	let i = 0;

	for (const x of iterable) {
		yield [i, x];
		i++;
	}
}
