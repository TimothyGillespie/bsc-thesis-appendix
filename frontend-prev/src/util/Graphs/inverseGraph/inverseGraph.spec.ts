import _ from 'lodash';
import inverseGraph from './inverseGraph';
import FunctionGraph, { FunctionNode } from '../FunctionGraph';

describe('inverseGraph()', () => {
	it('Inverses simple graph with two nodes correctly', () => {
		const graph = new FunctionGraph();
		const a = new FunctionNode('a', 0);
		const b = new FunctionNode('b', 0);

		graph.addNode(a);
		graph.addNode(b);

		const expectedGraph = graph.clone();

		graph.addEdge(a, b, undefined);
		expectedGraph.addEdge(b, a, undefined);

		expect(inverseGraph(graph)).toEqual(expectedGraph);
	});
});
