import { standardFunctionIdentifierComparator } from './FunctionIdentifier';

describe('FunctionIdentifier', () => {
	describe('standardFunctionIdentifierComparator()', function() {
		it('sorts by symbol', () => {
			const input = [
				{ symbol: 'b', arity: 1 },
				{ symbol: 'a', arity: 1 },
				{ symbol: 'c', arity: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', arity: 1 },
				{ symbol: 'b', arity: 1 },
				{ symbol: 'c', arity: 1 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});

		it('ignores parameter count when symbol is different', () => {
			const input = [
				{ symbol: 'b', arity: 3 },
				{ symbol: 'a', arity: 2 },
				{ symbol: 'c', arity: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', arity: 2 },
				{ symbol: 'b', arity: 3 },
				{ symbol: 'c', arity: 1 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});

		it('sort by parameter count for same symbol', () => {
			const input = [
				{ symbol: 'a', arity: 3 },
				{ symbol: 'a', arity: 2 },
				{ symbol: 'a', arity: 1 },
			];

			const expectedOutput = [
				{ symbol: 'a', arity: 1 },
				{ symbol: 'a', arity: 2 },
				{ symbol: 'a', arity: 3 },
			];

			input.sort(standardFunctionIdentifierComparator);

			expect(input).toEqual(expectedOutput);
		});
	});
});
