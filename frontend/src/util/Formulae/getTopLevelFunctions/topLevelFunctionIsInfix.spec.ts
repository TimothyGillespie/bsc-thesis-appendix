import { standardInfixOperators, topLevelFunctionIsInfix } from './getTopLevelFunctions';

describe('topLevelFunctionIsInfix()', () => {
	const testCases = [
		['3 + 2', true],
		['depth(e,x) + size(e,x)', true],
		['mul(c(3 + 2))', false],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${expectation} for ${input}`, () => {
			expect(topLevelFunctionIsInfix(typeof input === 'string' ? input : '', standardInfixOperators)).toBe(
				expectation,
			);
		});
	});
});
