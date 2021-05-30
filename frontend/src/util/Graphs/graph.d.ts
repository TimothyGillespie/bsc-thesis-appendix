export type FunctionGraph = {
	nodeList: FunctionNode[];
	adjacencyList: DirectedEdge[];
};

export type FunctionNode = {
	symbol: string;
	parameterCount: number;
};

export type DirectedEdge = {
	parentNode: FunctionNode;
	childNode: FunctionNode;
	parameterIndex: number | undefined;
};
