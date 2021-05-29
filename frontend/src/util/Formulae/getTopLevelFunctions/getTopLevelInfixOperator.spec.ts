import { getOperator, getTopLevelInfixOperator, standardInfixOperators } from './getTopLevelFunctions';

describe('getTopLevelInfixOperator()', () => {
	const testCases = [
		['3 + 2', { operator: getOperator('+'), left: '3 ', right: ' 2' }],
		['depth(e,x) + size(e,x)', { operator: getOperator('+'), left: 'depth(e,x) ', right: ' size(e,x)' }],
		['mul(c(3 + 2))', null],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(
				getTopLevelInfixOperator(typeof input === 'string' ? input : '', standardInfixOperators),
			).toStrictEqual(expectation);
		});
	});
});
