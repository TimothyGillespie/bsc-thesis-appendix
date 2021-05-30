import isTopLevelFunctionPrefix from './isTopLevelFunctionPrefix';

describe('isTopLevelFunctionPrefix()', () => {
	const testCases = [
		['3 + 2', false],
		['depth(e,x) + size(e,x)', false],
		['mul(c(3 + 2))', true],
		['depth(c(e,v,e,u) + d(e,i,x))', true],
		['depth(c(e,v,e,u) + d(e,i,x)', false],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${expectation} for ${input}`, () => {
			expect(isTopLevelFunctionPrefix(typeof input === 'string' ? input : '')).toEqual(expectation);
		});
	});
});
