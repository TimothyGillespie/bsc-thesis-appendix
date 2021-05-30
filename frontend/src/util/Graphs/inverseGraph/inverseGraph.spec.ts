import _ from 'lodash';
import inverseGraph from './inverseGraph';
import { FunctionGraph, FunctionNode } from '../graph';

describe('inverseGraph()', () => {
	it('Inverses simple graph with two nodes correctly', () => {
		const a: FunctionNode = { symbol: 'a', parameterCount: 0 };
		const b: FunctionNode = { symbol: 'b', parameterCount: 0 };

		const inputGraph: FunctionGraph = {
			nodeList: [a, b],
			adjacencyList: [{ parentNode: a, childNode: b, parameterIndex: undefined }],
		};

		const expectedGraph: FunctionGraph = {
			nodeList: [a, b],
			adjacencyList: [{ parentNode: b, childNode: a, parameterIndex: undefined }],
		};

		expect(inverseGraph(inputGraph)).toEqual(expectedGraph);
	});
});
