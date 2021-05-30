import _ from 'lodash';
import { FunctionGraph } from '../graph';

function inverseGraph(graph: FunctionGraph): FunctionGraph {
	const resultGraph = _.cloneDeep(graph);

	resultGraph.adjacencyList = resultGraph.adjacencyList.map(singleEdge => {
		const parentNode = singleEdge.childNode;
		const childNode = singleEdge.parentNode;
		// parameterIndex is not convertible in being consistent with the logic
		return { parentNode, childNode, parameterIndex: undefined };
	});

	resultGraph.adjacencyList = _.uniqWith(resultGraph.adjacencyList, (a, b) => _.isEqual(a, b));

	return resultGraph;
}

export default inverseGraph;
