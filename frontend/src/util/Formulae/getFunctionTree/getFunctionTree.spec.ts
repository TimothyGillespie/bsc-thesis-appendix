import standardInfixOperators from '../standardInfixOperator';
import { getFunctionTree } from './getFunctionTree';

describe('getFunctionTree()', () => {
	const testCases = [
		[
			'3 + 2',
			{
				symbol: '+',
				parameters: [
					{ symbol: '3', parameters: [] },
					{ symbol: '2', parameters: [] },
				],
			},
		],
		[
			'mul(c(3 + 2))',
			{
				symbol: 'mul',
				parameters: [
					{
						symbol: 'c',
						parameters: [
							{
								symbol: '+',
								parameters: [
									{ symbol: '3', parameters: [] },
									{ symbol: '2', parameters: [] },
								],
							},
						],
					},
				],
			},
		],
		[
			'depth(x,e,u,e,size(e,x,c(e,i)))',
			{
				symbol: 'depth',
				parameters: [
					{ symbol: 'x', parameters: [] },
					{ symbol: 'e', parameters: [] },
					{ symbol: 'u', parameters: [] },
					{ symbol: 'e', parameters: [] },
					{
						symbol: 'size',
						parameters: [
							{ symbol: 'e', parameters: [] },
							{ symbol: 'x', parameters: [] },
							{
								symbol: 'c',
								parameters: [
									{ symbol: 'e', parameters: [] },
									{ symbol: 'i', parameters: [] },
								],
							},
						],
					},
				],
			},
		],
		[
			'size(c(x,y)) = 1 + edgeCount(c(x,y))',
			{
				symbol: '=',
				parameters: [
					{
						symbol: 'size',
						parameters: [
							{
								symbol: 'c',
								parameters: [
									{ symbol: 'x', parameters: [] },
									{ symbol: 'y', parameters: [] },
								],
							},
						],
					},
					{
						symbol: '+',
						parameters: [
							{ symbol: '1', parameters: [] },
							{
								symbol: 'edgeCount',
								parameters: [
									{
										symbol: 'c',
										parameters: [
											{ symbol: 'x', parameters: [] },
											{ symbol: 'y', parameters: [] },
										],
									},
								],
							},
						],
					},
				],
			},
		],
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators)).toStrictEqual(
				expectation,
			);
		});
	});
});
