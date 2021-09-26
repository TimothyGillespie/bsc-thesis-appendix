import standardInfixOperators, { getInfixFunction } from '../../standardInfixOperator';
import getTopLevelInfixFunction from './getTopLevelInfixFunction';

describe('getTopLevelInfixFunction()', () => {
	const testCases = [
		['3 + 2', { operator: getInfixFunction('+'), left: '3 ', right: ' 2' }],
		['depth(e,x) + size(e,x)', { operator: getInfixFunction('+'), left: 'depth(e,x) ', right: ' size(e,x)' }],
		['mul(c(3 + 2))', null],
    ['(size(nt) <= depth(nt)) and (number <= depth(nt))', {operator: getInfixFunction("and"), left: '(size(nt) <= depth(nt))', right: '(number <= depth(nt))'}],
    ['world', null],
    ['w or ld', {operator: getInfixFunction('or'), left: 'w', right: 'ld'}],
    ['hello-world', {operator: getInfixFunction('-'), left: 'hello', right: 'world'}],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
      expect(
				getTopLevelInfixFunction(typeof input === 'string' ? input : '', standardInfixOperators),
        // @ts-ignore
			).toEqual(expectation);
		});
	});
});
