import {FunctionTreeNode} from "../../util/Formulae/formula";

export interface AdditionalConstraint {
  inputVariables: Map<string, string>;
  constraint: FunctionTreeNode;
}
