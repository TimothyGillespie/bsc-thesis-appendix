import standardInfixOperators, { getInfixFunction } from '../../standardInfixOperator';
import getTopLevelInfixFunction from './getTopLevelInfixFunction';

describe('getTopLevelInfixFunction()', () => {
	const testCases = [
		['3 + 2', { operator: getInfixFunction('+'), left: '3 ', right: ' 2' }],
		['depth(e,x) + size(e,x)', { operator: getInfixFunction('+'), left: 'depth(e,x) ', right: ' size(e,x)' }],
		['mul(c(3 + 2))', null],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(
				getTopLevelInfixFunction(typeof input === 'string' ? input : '', standardInfixOperators),
			).toStrictEqual(expectation);
		});
	});
});