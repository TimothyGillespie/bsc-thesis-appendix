import standardInfixOperators from '../../standardInfixOperator';
import isTopLevelFunctionInfix from './isTopLevelFunctionInfix';

describe('isTopLevelFunctionInfix()', () => {
	const testCases = [
		['3 + 2', true],
		['depth(e,x) + size(e,x)', true],
		['mul(c(3 + 2))', false],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${expectation} for ${input}`, () => {
			expect(isTopLevelFunctionInfix(typeof input === 'string' ? input : '', standardInfixOperators)).toBe(
				expectation,
			);
		});
	});
});
