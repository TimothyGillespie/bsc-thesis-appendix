import {FunctionTreeNode} from "../../util/Formulae/formula";

export interface FunctionDefinition {
  name: string;
  arity: number;
  inputTypes: string[];
  outputType: string;
  definition: ValueDefinition[];
}

export interface ValueDefinition {
  inputConstructor?: InputConstructor;
  inputVariable?: string[];
  conditional?: ConditionalDefinition[];
  otherwise: FunctionTreeNode;
}

export interface InputConstructor {
  name: string;
  arity: string;
  boundVariables: string[];
}

interface ConditionalDefinition {
  condition: FunctionTreeNode;
  then: FunctionTreeNode;
}
