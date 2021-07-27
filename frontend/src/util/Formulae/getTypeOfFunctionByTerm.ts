import {FunctionTreeNode} from "./formula";
import {ConstructorDefinition} from "../../app/models/ConstructorDefinition";
import getTermOfFunction from "./getTermOfFunction";

function getTypeOfFunctionByTerm(tree: FunctionTreeNode, constructorDefinitions: ConstructorDefinition[], functionName: string): string | null {
  const term = getTermOfFunction(tree, constructorDefinitions, functionName)
  if(term === null)
    return null;

  return constructorDefinitions.find(cons => cons.term === term).type ?? null;
}

export default getTypeOfFunctionByTerm;
