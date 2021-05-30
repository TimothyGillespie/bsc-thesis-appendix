import { PrefixOperatorInstance } from '../../formula';
import enumerate from '../../../enumerate';

function getTopLevelPrefixFunction(expression: string): PrefixOperatorInstance | null {
	let level = 0;
	let functionContentStarted = false;
	const trimmedExpression = expression.trim();
	let symbol = '';
	let currentParameter: string = '';
	const parameters: string[] = [];

	for (const [index, character] of enumerate(trimmedExpression)) {
		if (character.match(/[A-Za-z0-9]/) && !functionContentStarted) {
			symbol += character;
			continue;
		}

		if (level === 1 && character === ',') {
			parameters.push(currentParameter);
			currentParameter = '';
			continue;
		}

		if (character === '(') {
			level++;
			functionContentStarted = true;
		}

		if (character === ')') {
			level--;
		}

		if (level === 0 && functionContentStarted) {
			if (currentParameter !== '') parameters.push(currentParameter);

			return {
				symbol,
				parameters,
			};
		}

		if (((character !== ')' || level >= 1) && character !== '(') || level > 1) {
			currentParameter += character;
		}
	}

	return null;
}

export default getTopLevelPrefixFunction;
