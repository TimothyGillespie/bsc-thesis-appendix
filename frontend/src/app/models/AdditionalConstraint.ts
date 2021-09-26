import {FunctionTreeNode} from "../../util/Formulae/formula";

export interface AdditionalConstraint {
  inputVariables: { [variable: string]: string };
  constraint: string;
}
