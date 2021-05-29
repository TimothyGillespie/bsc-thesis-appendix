import {
	getOperator,
	getTopLevelInfixOperator,
	getTopLevelPrefixOperator,
	standardInfixOperators,
} from './getTopLevelFunctions';

describe('getTopLevelPrefixOperator()', () => {
	const testCases = [
		['3 + 2', null],
		['depth(e,x) + size(e,x)', null],
		['mul(c(3 + 2))', { symbol: 'mul', parameters: ['c(3 + 2)'] }],
		['depth(x,e,u,e,size(e,x,c(e,i)))', { symbol: 'depth', parameters: ['x', 'e', 'u', 'e', 'size(e,x,c(e,i))'] }],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(getTopLevelPrefixOperator(typeof input === 'string' ? input : '')).toStrictEqual(expectation);
		});
	});
});
