import Graph from "@tgillespie/graph/lib/models/Graph/Graph";
import FunctionGraphNode from "./FunctionGraphNode";
import FunctionGraphEdge from "./FunctionGraphEdge";

export type InfixOperator = {
	symbol: string;
	priority: number;
};

export type PrefixOperatorInstance = {
	symbol: string;
	parameters: string[];
};

export type InfixOperatorInstance = {
	operator: InfixOperator;
	left: string;
	right: string;
};

export type OperatorFound = {
	operator: InfixOperator;
	startIndex: number;
	endIndex: number;
};

export type FunctionTreeNode = {
	symbol: string;
	parameters: FunctionTreeNode[];
};

export type FunctionIdentifier = {
	symbol: string;
	arity: number;
};




export type FunctionGraph = Graph<FunctionGraphNode, FunctionGraphEdge<FunctionGraphNode>>;
