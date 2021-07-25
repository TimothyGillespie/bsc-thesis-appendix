import { getFunctionTree } from '../getFunctionTree/getFunctionTree';
import standardInfixOperators from '../standardInfixOperator';
import getIdentifiersFromFunctionTree from './getIdentifiersFromFunctionTree';

describe('getIdentifiersFromFunctionTree()', () => {
	const testCases = [
		[
			'3 + 2',
			[
				{ symbol: '+', parameterCount: 2 },
				{ symbol: '2', parameterCount: 0 },
				{ symbol: '3', parameterCount: 0 },
			],
		],
		[
			'mul(c(3 + 2))',
			[
				{ symbol: '+', parameterCount: 2 },
				{ symbol: '2', parameterCount: 0 },
				{ symbol: '3', parameterCount: 0 },
				{ symbol: 'c', parameterCount: 1 },
				{ symbol: 'mul', parameterCount: 1 },
			],
		],
		[
			'depth(x,e,u,e,size(e,x,c(e,i)))',
			[
				{ symbol: 'c', parameterCount: 2 },
				{ symbol: 'depth', parameterCount: 5 },
				{ symbol: 'e', parameterCount: 0 },
				{ symbol: 'i', parameterCount: 0 },
				{ symbol: 'size', parameterCount: 3 },
				{ symbol: 'u', parameterCount: 0 },
				{ symbol: 'x', parameterCount: 0 },
			],
		],
		[
			'size(c(x,y)) = 1 + edgeCount(c(x,y))',
			[
				{ symbol: '+', parameterCount: 2 },
				{ symbol: '=', parameterCount: 2 },
				{ symbol: '1', parameterCount: 0 },
				{ symbol: 'c', parameterCount: 2 },
				{ symbol: 'edgeCount', parameterCount: 1 },
				{ symbol: 'size', parameterCount: 1 },
				{ symbol: 'x', parameterCount: 0 },
				{ symbol: 'y', parameterCount: 0 },
			],
		],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			const tree = getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators);
			expect(getIdentifiersFromFunctionTree(tree)).toStrictEqual(expectation);
		});
	});
});
