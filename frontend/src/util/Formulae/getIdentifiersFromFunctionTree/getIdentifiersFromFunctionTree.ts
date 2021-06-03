import { FunctionIdentifier, FunctionTreeNode } from '../formula';
import mapPreOrder from '../map/mapPreOrder/mapPreOrder';
import { standardFunctionIdentifierComparator } from '../../Comparators/Functions/FunctionIdentifier/FunctionIdentifier';
import _ from 'lodash';

function getIdentifiersFromFunctionTree(tree: FunctionTreeNode): FunctionIdentifier[] {
	let result = mapPreOrder(tree, node => {
		return {
			symbol: node.symbol,
			parameterCount: node.parameters.length,
		};
	});

	result = _.uniqWith(result, _.isEqual);
	result.sort(standardFunctionIdentifierComparator);

	return result;
}

export default getIdentifiersFromFunctionTree;
