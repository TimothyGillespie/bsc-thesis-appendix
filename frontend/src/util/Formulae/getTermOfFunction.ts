import {FunctionTreeNode} from "./formula";
import {ConstructorDefinition} from "../../app/models/ConstructorDefinition";

function getTermOfFunction(tree: FunctionTreeNode, constructorDefinitions: ConstructorDefinition[], functionName: string): string | null {
  if(tree.parameters.length === 0)
    return null;

  if(tree.symbol !== functionName) {
    for(const nextTree of tree.parameters) {
      const subResult = getTermOfFunction(nextTree, constructorDefinitions, functionName);
      if(subResult !== null)
        return subResult;
    }
  } else {
    if(tree.parameters.length === 1)
      return constructorDefinitions.find(cons => cons.term === tree.parameters[0].symbol)?.term;
  }

  return null;
}

export default getTermOfFunction;
