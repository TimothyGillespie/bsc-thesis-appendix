import { FunctionTreeNode } from '../../Formulae/formula';
import FunctionGraph, { FunctionNode } from '../FunctionGraph';
import enumerate from '../../enumerate';

function createGraphFromFunctionTree(tree: FunctionTreeNode): FunctionGraph {
	const graph = new FunctionGraph();

	_createGraphFromFunctionTree(tree, graph);

	return graph;
}

function _createGraphFromFunctionTree(
	tree: FunctionTreeNode,
	graph: FunctionGraph,
	parameterIndex: number = -1,
	parentNode: FunctionNode | undefined = undefined,
): void {
	const newNode = new FunctionNode(tree.symbol, tree.parameters.length);
	graph.addNode(newNode);

	if (parentNode !== undefined) {
		graph.addEdge(parentNode, newNode, parameterIndex);
	}

	for (const [index, childNode] of enumerate(tree.parameters)) {
		_createGraphFromFunctionTree(childNode, graph, index, newNode);
	}
}

export default createGraphFromFunctionTree;
