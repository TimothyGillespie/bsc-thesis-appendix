import {forEach} from "lodash";

const isTopLevelFunctionPriority = (expression: string): boolean => {
  const processedExpression = expression.trim();
  if(!processedExpression.startsWith("(") || !processedExpression.endsWith(")"))
    return false

  let level = 1

  // Skipping first parenthesis to avoid triggering the next condition on the first iteration
  for(const c of processedExpression.substr(1)) {
    if(level === 0)
      return false;

    if(c === '(') {
      level++;
    } else if(c === ')') {
      level--;
    }

    if(level < 0) {
      return false;
    }
  }

  return level === 0
}

export default isTopLevelFunctionPriority;
