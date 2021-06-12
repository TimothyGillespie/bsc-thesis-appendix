import _ from 'lodash';

class FunctionGraph {
	nodeList: FunctionNode[] = [];
	adjacencyList: DirectedEdge[] = [];

	getNode(symbol: string, parameterCount: number | undefined = undefined): FunctionNode | undefined {
		return this.nodeList.find(
			singleNode => singleNode.symbol === symbol && singleNode.parameterCount === parameterCount,
		);
	}

	getParentsOfNode(node: FunctionNode): FunctionNode[] {
		const result: FunctionNode[] = [];
		this.adjacencyList.forEach(singleEdge => {
			if (_.isEqual(singleEdge.childNode, node)) {
				result.push(singleEdge.parentNode);
			}
		});

		return result;
	}

	getChildrenOfNode(node: FunctionNode): FunctionNode[] {
		const result: FunctionNode[] = [];
		this.adjacencyList.forEach(singleEdge => {
			if (_.isEqual(singleEdge.parentNode, node)) {
				result.push(singleEdge.childNode);
			}
		});

		return result;
	}

	getAdjacentNodes(node: FunctionNode): FunctionNode[] {
		return _.unionWith(this.getChildrenOfNode(node), this.getParentsOfNode(node), _.isEqual);
	}

	getNodes(): FunctionNode[] {
		const result: FunctionNode[] = [];
		this.adjacencyList.forEach(edge => {
			result.push(edge.childNode);
			result.push(edge.parentNode);
		});

		return _.uniqWith(result, _.isEqual);
	}

	addNode(node: FunctionNode) {
		const found = this.nodeList.find(singleNode => _.isEqual(singleNode, node));

		if (found === undefined) {
			this.nodeList.push(node);
			this.orderNodeList();
		}
	}

	addEdge(parentNode: FunctionNode, childNode: FunctionNode, parameterIndex: number | undefined = undefined) {
		const found = this.adjacencyList.find(
			singleEdge =>
				_.isEqual(singleEdge.parentNode, parentNode) &&
				_.isEqual(singleEdge.childNode, childNode) &&
				singleEdge.parameterIndex === parameterIndex,
		);

		const foundParent = this.nodeList.find(singleNode => _.isEqual(singleNode, parentNode));
		const foundChild = this.nodeList.find(singleNode => _.isEqual(singleNode, childNode));

		if (foundChild === undefined || foundParent === undefined) {
			throw Error('Child or Parent Node not found in node list.');
		}

		if (found === undefined) {
			this.adjacencyList.push(new DirectedEdge(parentNode, childNode, parameterIndex));
			this.orderAdjacencyList();
		}
	}

	clone(): FunctionGraph {
		return _.cloneDeep(this);
	}

	protected orderNodeList() {
		this.nodeList.sort(sortFunctionNode);
	}

	protected orderAdjacencyList() {
		this.adjacencyList.sort((a, b) => {
			const comparisonParentNodes = sortFunctionNode(a.parentNode, b.parentNode);
			if (comparisonParentNodes !== 0) {
				return comparisonParentNodes;
			}

			const comparisionChildNode = sortFunctionNode(a.childNode, b.childNode);
			if (comparisionChildNode !== 0) {
				return comparisionChildNode;
			}

			return (a.parameterIndex ?? -1) - (b.parameterIndex ?? -1);
		});
	}
}

export class FunctionNode {
	symbol: string;
	parameterCount: number;

	constructor(symbol: string, parameterCount: number) {
		this.symbol = symbol;
		this.parameterCount = parameterCount;
	}
}

export class DirectedEdge {
	parentNode: FunctionNode;
	childNode: FunctionNode;
	parameterIndex: number | undefined;

	constructor(parentNode: FunctionNode, childNode: FunctionNode, parameterIndex: number | undefined = undefined) {
		this.parentNode = parentNode;
		this.childNode = childNode;
		this.parameterIndex = parameterIndex;
	}
}

function sortFunctionNode(a: FunctionNode, b: FunctionNode) {
	if (a !== b) return a.symbol.localeCompare(b.symbol);

	return a.parameterCount - b.parameterCount;
}

export default FunctionGraph;
