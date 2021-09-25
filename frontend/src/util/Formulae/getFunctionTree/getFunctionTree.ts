import { FunctionTreeNode, InfixOperator, PrefixOperatorInstance } from '../formula';
import standardInfixOperators from '../standardInfixOperator';
import isTopLevelFunctionInfix from '../TopLevelFunctions/isTopLevelFunctionInfix/isTopLevelFunctionInfix';
import isTopLevelFunctionPrefix from '../TopLevelFunctions/isTopLevelFunctionPrefix/isTopLevelFunctionPrefix';
import getTopLevelPrefixFunction from '../TopLevelFunctions/getTopLevelPrefixFunction/getTopLevelPrefixFunction';
import getTopLevelInfixFunction from '../TopLevelFunctions/getTopLevelInfixFunction/getTopLevelInfixFunction';
import isTopLevelFunctionPriority from "../TopLevelFunctions/isTopLevelFunctionPriority/isTopLevelFunctionPriority";
import getTopLevelPriorityContent from "../TopLevelFunctions/getTopLevelPriorityContent/getTopLevelPriorityContent";
import ParsingException from "../../../exceptions/ParsingException";

export function getFunctionTree(
	expression: string,
	infixOperators: InfixOperator[] = standardInfixOperators,
): FunctionTreeNode {
	let topLevelOperatorInstance: PrefixOperatorInstance;

  if (isTopLevelFunctionPriority(expression)) {
    return getFunctionTree(getTopLevelPriorityContent(expression))
  } else if (isTopLevelFunctionInfix(expression, infixOperators)) {
		const intermediateInfix = getTopLevelInfixFunction(expression, infixOperators)!;
		topLevelOperatorInstance = {
			symbol: intermediateInfix.operator.symbol,
			parameters: [intermediateInfix.left, intermediateInfix.right],
		};
	} else if (isTopLevelFunctionPrefix(expression)) {
		topLevelOperatorInstance = getTopLevelPrefixFunction(expression)!;
  } else {
    const trimmedExpression = expression.trim()
    if(trimmedExpression.includes(' '))
      throw new ParsingException();
		topLevelOperatorInstance = { symbol: expression.trim(), parameters: [] };
	}

	return {
		symbol: topLevelOperatorInstance.symbol,
		parameters: topLevelOperatorInstance.parameters.map(singleParameter => getFunctionTree(singleParameter)),
	};
}
