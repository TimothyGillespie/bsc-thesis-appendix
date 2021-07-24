import { getFunctionTree } from '../../Formulae/getFunctionTree/getFunctionTree';
import FunctionGraph, { FunctionNode } from '../FunctionGraph';
import createGraphFromFunctionTree from './createGraphFromFunctionTree';

describe('createGraphFromFunctionTree()', () => {
	const simpleExample = '3 + 2';
	it(`Simple example: "${simpleExample}"`, () => {
		const tree = getFunctionTree(simpleExample);

		const expectedGraph = new FunctionGraph();

		const plus = new FunctionNode('+', 2);
		const three = new FunctionNode('3', 0);
		const two = new FunctionNode('2', 0);

		expectedGraph.addNode(plus);
		expectedGraph.addNode(three);
		expectedGraph.addNode(two);

		expectedGraph.addEdge(plus, three, 0);
		expectedGraph.addEdge(plus, two, 1);

		expect(createGraphFromFunctionTree(tree)).toEqual(expectedGraph);
	});

	const thesisExample = 'size(c(x,y)) = 1 + edgeCount(c(y, a))';
	it(`Complex example: ${thesisExample}`, () => {
		const tree = getFunctionTree(thesisExample);

		const expectedGraph = new FunctionGraph();

		const size = new FunctionNode('size', 1);
		const edgeCount = new FunctionNode('edgeCount', 1);
		const c = new FunctionNode('c', 2);
		const plus = new FunctionNode('+', 2);
		const equal = new FunctionNode('=', 2);
		const x = new FunctionNode('x', 0);
		const y = new FunctionNode('y', 0);
		const a = new FunctionNode('a', 0);
		const one = new FunctionNode('1', 0);

		expectedGraph.addNode(equal);
		expectedGraph.addNode(size);
		expectedGraph.addNode(c);
		expectedGraph.addNode(x);
		expectedGraph.addNode(y);
		expectedGraph.addNode(plus);
		expectedGraph.addNode(one);
		expectedGraph.addNode(edgeCount);
		expectedGraph.addNode(a);

		expectedGraph.addEdge(equal, size, 0);
		expectedGraph.addEdge(equal, plus, 1);

		expectedGraph.addEdge(size, c, 0);

		expectedGraph.addEdge(c, x, 0);
		expectedGraph.addEdge(c, y, 1);

		expectedGraph.addEdge(plus, one, 0);
		expectedGraph.addEdge(plus, edgeCount, 1);

		expectedGraph.addEdge(edgeCount, c, 0);

		// y is duplicate but with different parameter index here
		expectedGraph.addEdge(c, y, 0);
		expectedGraph.addEdge(c, a, 1);

		expect(createGraphFromFunctionTree(tree)).toEqual(expectedGraph);
	});
});
