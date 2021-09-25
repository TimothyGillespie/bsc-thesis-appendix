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
    [
      'a + b = c and a + d = e and a + f = g',
      {
        symbol: 'and',
        parameters: [
          {
            symbol: '=',
            parameters: [
              {
                symbol: '+',
                parameters: [
                  {symbol: 'a', parameters: []},
                  {symbol: 'b', parameters: []},
                ]
              },
              {symbol: 'c', parameters: []},
            ]
          },
          {
            symbol: 'and',
            parameters: [
              {
                symbol: '=',
                parameters: [
                  {
                    symbol: '+',
                    parameters: [
                      {symbol: 'a', parameters: []},
                      {symbol: 'd', parameters: []},
                    ]
                  },
                  {symbol: 'e', parameters: []},
                ]
              },
              {
                symbol: '=',
                parameters: [
                  {
                    symbol: '+',
                    parameters: [
                      {symbol: 'a', parameters: []},
                      {symbol: 'f', parameters: []},
                    ]
                  },
                  {symbol: 'g', parameters: []},
                ]
              }
            ]
          }
        ]
      }
    ]
	];

	it('bug1', () => {
		// bug
		console.log(JSON.stringify(getFunctionTree('(depth_with_condition(c(x,y)) <= size(c(x,y))) and (depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))')));
	})

	it('bug2', () => {
		// bug
		console.log(JSON.stringify(getFunctionTree('depth_with_condition(c(x,y)) <= size(c(x,y))')));
	})

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators)).toEqual(
        // @ts-ignore
				expectation,
			);
		});
	});
});
