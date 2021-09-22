import {FunctionTreeNode} from "./formula";
import standardInfixOperators, {getInfixFunction} from "./standardInfixOperator";

const functionTreeNodeToString = (functionTreeNode: FunctionTreeNode): string => {
  if(getInfixFunction(functionTreeNode.symbol) == null) {
    if (functionTreeNode.parameters.length === 0)
      return functionTreeNode.symbol;
    else
      return `${functionTreeNode.symbol}(${functionTreeNode.parameters.map(functionTreeNodeToString).join(", ")})`;
  } else {
    if(functionTreeNode.parameters.length == 0)
      return functionTreeNode.symbol
    else if (functionTreeNode.parameters.length == 1)
      return `${functionTreeNode.symbol}(${functionTreeNodeToString(functionTreeNode.parameters[0])})`
    else
      return functionTreeNode.parameters.map(functionTreeNodeToString).join(` ${functionTreeNode.symbol} `)
  }
}

export default functionTreeNodeToString;
