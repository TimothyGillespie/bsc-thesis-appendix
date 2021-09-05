import getTopLevelPrefixFunction from './getTopLevelPrefixFunction';

describe('getTopLevelPrefixFunction()', () => {
	const testCases = [
		['3 + 2', null],
		['mul(c(3 + 2))', { symbol: 'mul', parameters: ['c(3 + 2)'] }],
		['depth(x,e,u,e,size(e,x,c(e,i)))', { symbol: 'depth', parameters: ['x', 'e', 'u', 'e', 'size(e,x,c(e,i))'] }],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
      // @ts-ignore
			expect(getTopLevelPrefixFunction(typeof input === 'string' ? input : '')).toEqual(expectation);
		});
	});
});
