import { standardFunctionIdentifierComparator } from './FunctionIdentifier';

describe('FunctionIdentifier', () => {
	describe('standardFunctionIdentifierComparator()', function() {
		it('sorts by symbol', () => {
			const input = [
				{ symbol: 'b', parameterCount: 1 },
				{ symbol: 'a', parameterCount: 1 },
				{ symbol: 'c', parameterCount: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', parameterCount: 1 },
				{ symbol: 'b', parameterCount: 1 },
				{ symbol: 'c', parameterCount: 1 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});

		it('ignores parameter count when symbol is different', () => {
			const input = [
				{ symbol: 'b', parameterCount: 3 },
				{ symbol: 'a', parameterCount: 2 },
				{ symbol: 'c', parameterCount: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', parameterCount: 2 },
				{ symbol: 'b', parameterCount: 3 },
				{ symbol: 'c', parameterCount: 1 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});

		it('sort by parameter count for same symbol', () => {
			const input = [
				{ symbol: 'a', parameterCount: 3 },
				{ symbol: 'a', parameterCount: 2 },
				{ symbol: 'a', parameterCount: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', parameterCount: 1 },
				{ symbol: 'a', parameterCount: 2 },
				{ symbol: 'a', parameterCount: 3 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});
	});
});
