import getIdentifiersFromFunctionTree from '../getIdentifiersFromFunctionTree/getIdentifiersFromFunctionTree';
import { getFunctionTree } from '../getFunctionTree/getFunctionTree';

const getIdentifiersFromExpressionString = (expression: string) =>
	getIdentifiersFromFunctionTree(getFunctionTree(expression));

export default getIdentifiersFromExpressionString;
