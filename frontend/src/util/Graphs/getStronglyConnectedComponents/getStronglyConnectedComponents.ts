import FunctionGraph, { FunctionNode } from '../FunctionGraph';
import _ from 'lodash';
import inverseGraph from '../inverseGraph/inverseGraph';

function getStronglyConnectedComponents(graph: FunctionGraph) {
	const stack: FunctionNode[] = [];
	const visited: Map<FunctionNode, boolean> = new Map();
	for (const currentNode of graph.getNodes()) {
		if (visited.get(currentNode) === false) {
			fillOrder(currentNode, visited, stack, graph);
		}
	}

	const inverseGraph: FunctionGraph = inverseGraph(graph);
	for (const currentNode of inverseGraph.getNodes()) {
		visited.set(currentNode, false);
	}

	const result: FunctionNode[][] = [];
	while (stack.length > 0) {
		const currentNode = stack.pop();
		if (currentNode === undefined) break;

		if (!visited.get(currentNode)) {
			result.push(_DfsEnumerationRecursion(node, visited, [], graph));
		}
	}
}

function fillOrder(
	node: FunctionNode,
	visited: Map<FunctionNode, boolean>,
	stack: FunctionNode[],
	graph: FunctionGraph,
) {
	visited.set(node, true);
	graph.getAdjacentNodes(node).forEach(adjNode => {
		if (!visited.get(adjNode)) fillOrder(adjNode, visited, stack, graph);
	});
	stack.push(node);
}

function _DfsEnumerationRecursion(
	node: FunctionNode,
	visited: Map<FunctionNode, boolean>,
	result: FunctionNode[],
	graph: FunctionGraph,
): FunctionNode[] {
	visited.set(node, true);
	result.push(node);
	for (const currentNode of graph.getAdjacentNodes(node)) {
		if (!visited.get(currentNode)) {
			_DfsEnumerationRecursion(currentNode, visited, result, graph);
		}
	}

	return result;
}
