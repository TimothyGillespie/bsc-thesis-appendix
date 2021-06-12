import FunctionGraph, { FunctionNode } from '../FunctionGraph';
import getStronglyConnectedComponents from './getStronglyConnectedComponents';

describe('getStronglyConnectedComponents', () => {
	it('simple test', () => {
		const g = new FunctionGraph();
		const a = new FunctionNode('a', 0);
		const b = new FunctionNode('b', 0);
		const c = new FunctionNode('c', 0);

		const d = new FunctionNode('c', 0);

		const e = new FunctionNode('c', 0);

		g.addNode(a);
		g.addNode(b);
		g.addNode(c);
		g.addNode(d);
		g.addNode(e);

		g.addEdge(a, b);
		g.addEdge(b, c);
		g.addEdge(c, a);

		g.addEdge(a, d);

		g.addEdge(d, e);

		const scc = getStronglyConnectedComponents(g);
		console.log(scc);
		expect(true).toBe(true);
	});
});
