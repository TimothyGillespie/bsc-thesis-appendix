import { FunctionTreeNode, InfixOperator, PrefixOperatorInstance } from '../formula';
import standardInfixOperators from '../standardInfixOperator';
import isTopLevelFunctionInfix from '../TopLevelFunctions/isTopLevelFunctionInfix/isTopLevelFunctionInfix';
import isTopLevelFunctionPrefix from '../TopLevelFunctions/isTopLevelFunctionPrefix/isTopLevelFunctionPrefix';
import getTopLevelPrefixFunction from '../TopLevelFunctions/getTopLevelPrefixFunction/getTopLevelPrefixFunction';
import getTopLevelInfixFunction from '../TopLevelFunctions/getTopLevelInfixFunction/getTopLevelInfixFunction';
import isTopLevelFunctionPriority from "../TopLevelFunctions/isTopLevelFunctionPriority/isTopLevelFunctionPriority";
import getTopLevelPriorityContent from "../TopLevelFunctions/getTopLevelPriorityContent/getTopLevelPriorityContent";

// Infix functions are not constrained by this
export const legalSymbolRegex = /^[A-Za-z0-9_]+$/

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
    if(!topLevelOperatorInstance.symbol.match(legalSymbolRegex))
      throw new SyntaxError();

  } else {
    const trimmedExpression = expression.trim()

    if(!trimmedExpression.match(legalSymbolRegex))
      throw new SyntaxError();

		topLevelOperatorInstance = { symbol: trimmedExpression, parameters: [] };
	}

	return {
		symbol: topLevelOperatorInstance.symbol,
		parameters: topLevelOperatorInstance.parameters.map(singleParameter => getFunctionTree(singleParameter)),
	};
}
