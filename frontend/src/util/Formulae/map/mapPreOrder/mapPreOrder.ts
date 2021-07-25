import { FunctionTreeNode } from '../../formula';

function mapPreOrder<T>(tree: FunctionTreeNode, mappingFunction: (node: FunctionTreeNode) => T): T[] {
	const resultList: T[] = [];

	resultList.push(mappingFunction(tree));
	for (const singleParameter of tree.parameters) {
		resultList.push(...mapPreOrder(singleParameter, mappingFunction));
	}

	return resultList;
}

export default mapPreOrder;
