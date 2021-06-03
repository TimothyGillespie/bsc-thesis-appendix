import { getFunctionTree } from '../../getFunctionTree/getFunctionTree';
import standardInfixOperators from '../../standardInfixOperator';
import { FunctionTreeNode } from '../../formula';
import mapPreOrder from './mapPreOrder';

function testMappingFunction(node: FunctionTreeNode): string {
	return `${node.symbol}/${node.parameters.length}`;
}

describe('mapPreOrder()', () => {
	const testCases = [
		['3 + 2', ['+/2', '3/0', '2/0']],
		['mul(c(3 + 2))', ['mul/1', 'c/1', '+/2', '3/0', '2/0']],
		[
			'depth(x,e,u,e,size(e,x,c(e,i)))',
			['depth/5', 'x/0', 'e/0', 'u/0', 'e/0', 'size/3', 'e/0', 'x/0', 'c/2', 'e/0', 'i/0'],
		],
		[
			'size(c(x,y)) = 1 + edgeCount(c(x,y))',
			['=/2', 'size/1', 'c/2', 'x/0', 'y/0', '+/2', '1/0', 'edgeCount/1', 'c/2', 'x/0', 'y/0'],
		],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			const tree = getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators);
			expect(mapPreOrder(tree, testMappingFunction)).toStrictEqual(expectation);
		});
	});
});
