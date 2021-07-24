import enumerate from '../../../enumerate';

function isTopLevelFunctionPrefix(expression: string): boolean {
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

export default isTopLevelFunctionPrefix;
