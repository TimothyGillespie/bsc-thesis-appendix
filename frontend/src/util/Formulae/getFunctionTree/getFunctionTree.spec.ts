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
    ],
    [
      '2 + 3 * 4',
      {
        symbol: '+',
        parameters: [
          {symbol: '2', parameters: []},
          {
            symbol: '*',
            parameters: [
              {symbol: '3', parameters: []},
              {symbol: '4', parameters: []},
            ]
          }
        ]
      }
    ],
    [
      '(2 + 3) * 4',
      {
        symbol: '*',
        parameters: [
          {
            symbol: '+',
            parameters: [
              {symbol: '2', parameters: []},
              {symbol: '3', parameters: []},
            ]
          },
          {symbol: '4', parameters: []},
        ]
      }
    ],
    [
      '(depth_with_condition(c(x,y)) <= size(c(x,y))) and (depth_with_max(c(x,y)) = depth_with_condition(c(x,y)))',
      {
        symbol: 'and',
        parameters: [
          {
            symbol: '<=',
            parameters: [
              {
                symbol: 'depth_with_condition',
                parameters: [
                  {
                    symbol: 'c',
                    parameters: [
                      {symbol: 'x', parameters: []},
                      {symbol: 'y', parameters: []},
                    ]
                  }
                ]
              },
              {
                symbol: 'size',
                parameters: [
                  {
                    symbol: 'c',
                    parameters: [
                      {symbol: 'x', parameters: []},
                      {symbol: 'y', parameters: []},
                    ]
                  }
                ]
              }
            ]
          },
          {
            symbol: '=',
            parameters: [
              {
                symbol: 'depth_with_max',
                parameters: [
                  {
                    symbol: 'c',
                    parameters: [
                      {symbol: 'x', parameters: []},
                      {symbol: 'y', parameters: []},
                    ]
                  }
                ]
              },
              {
                symbol: 'depth_with_condition',
                parameters: [
                  {
                    symbol: 'c',
                    parameters: [
                      {symbol: 'x', parameters: []},
                      {symbol: 'y', parameters: []},
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      'depth_with_condition(c(x,y)) <= size(c(x,y))',
      {
        symbol: '<=',
        parameters: [
          {
            symbol: 'depth_with_condition',
            parameters: [
              {
                symbol: 'c',
                parameters: [
                  {symbol: 'x', parameters: []},
                  {symbol: 'y', parameters: []},
                ]
              }
            ]
          },
          {
            symbol: 'size',
            parameters: [
              {
                symbol: 'c',
                parameters: [
                  {symbol: 'x', parameters: []},
                  {symbol: 'y', parameters: []},
                ]
              }
            ]
          }
        ]
      },
    ],
    // This is tricky because the or in world could be seen as an or while the - should be recognized as the infix function
    [
      'println(hello-world)',
      {
        symbol: 'println',
        parameters: [
          {
            symbol: '-',
            parameters: [
              {symbol: 'hello', parameters: []},
              {symbol: 'world', parameters: []},
            ]
          }
        ]
      }
    ]
	];

	testCases.forEach(value => {
		const [input, expectation] = value;
		it(`Returns ${JSON.stringify(expectation)} for ${input}`, () => {
			expect(getFunctionTree(typeof input === 'string' ? input : '', standardInfixOperators)).toEqual(
        // @ts-ignore
				expectation,
			);
		});
	});


  // @ts-ignore
  it.each([
    'println(hello world)',
    'println(\'hello world\')'
    ]
  )('Throws an error for %s', (input) => {
    expect(() => getFunctionTree(input)).toThrow()
  })
});
