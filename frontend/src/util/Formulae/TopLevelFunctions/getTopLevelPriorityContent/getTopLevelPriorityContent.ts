import isTopLevelFunctionPriority from "../isTopLevelFunctionPriority/isTopLevelFunctionPriority";

const getTopLevelPriorityContent = (expression: string): string | null => {
  if(!isTopLevelFunctionPriority(expression))
    return null;

  return expression.trim()
    // Cut off first and last parenthesis
    .substr(1, expression.length - 2)
    .trim()
}


export default getTopLevelPriorityContent;
