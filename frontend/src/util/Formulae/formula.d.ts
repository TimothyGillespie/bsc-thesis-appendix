import Graph from "@tgillespie/graph/lib/models/Graph/Graph";
import FunctionGraphNode from "./FunctionGraphNode";
import FunctionGraphEdge from "./FunctionGraphEdge";

export type InfixOperator = {
	symbol: string;
	priority: number;
  // for example or should not be recognize to be the (w or ld) where or is the logical or so it needs whitespace around them
  // this value set to false signifies that while hello-world should be the same as hello - world
  // (we forbid - for function names, so set minus (-) to true)
  recognizeWithoutWhitespace: boolean,
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
