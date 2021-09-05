import { getFunctionTree } from '../getFunctionTree/getFunctionTree';
import standardInfixOperators from '../standardInfixOperator';
import getIdentifiersFromFunctionTree from './getIdentifiersFromFunctionTree';

describe('getIdentifiersFromFunctionTree()', () => {
	const testCases = [
		[
			'3 + 2',
			[
				{ symbol: '+', arity: 2 },
				{ symbol: '2', arity: 0 },
				{ symbol: '3', arity: 0 },
			],
		],
		[
			'mul(c(3 + 2))',
			[
				{ symbol: '+', arity: 2 },
				{ symbol: '2', arity: 0 },
				{ symbol: '3', arity: 0 },
				{ symbol: 'c', arity: 1 },
				{ symbol: 'mul', arity: 1 },
			],
		],
		[
			'depth(x,e,u,e,size(e,x,c(e,i)))',
			[
				{ symbol: 'c', arity: 2 },
				{ symbol: 'depth', arity: 5 },
				{ symbol: 'e', arity: 0 },
				{ symbol: 'i', arity: 0 },
				{ symbol: 'size', arity: 3 },
				{ symbol: 'u', arity: 0 },
				{ symbol: 'x', arity: 0 },
			],
		],
		[
			'size(c(x,y)) = 1 + edgeCount(c(x,y))',
			[
				{ symbol: '+', arity: 2 },
				{ symbol: '=', arity: 2 },
				{ symbol: '1', arity: 0 },
				{ symbol: 'c', arity: 2 },
				{ symbol: 'edgeCount', arity: 1 },
				{ symbol: 'size', arity: 1 },
				{ symbol: 'x', arity: 0 },
				{ symbol: 'y', arity: 0 },
			],
		],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			const tree = getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators);
			// @ts-ignore
      expect(getIdentifiersFromFunctionTree(tree)).toEqual(expectation);
		});
	});
});
