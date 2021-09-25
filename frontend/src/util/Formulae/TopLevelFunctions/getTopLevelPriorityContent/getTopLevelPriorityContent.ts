import isTopLevelFunctionPriority from "../isTopLevelFunctionPriority/isTopLevelFunctionPriority";

const getTopLevelPriorityContent = (expression: string): string | null => {
  if(!isTopLevelFunctionPriority(expression))
    return null;

  const trimmedExpression = expression.trim()

  return trimmedExpression
    // Cut off first and last parenthesis
    .substr(1, trimmedExpression.length - 2)
    .trim()
}


export default getTopLevelPriorityContent;
