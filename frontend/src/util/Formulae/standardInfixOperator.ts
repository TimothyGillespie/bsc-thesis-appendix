import { InfixOperator } from './formula';


// Commented out functions are not supported by SMT-LIB
const standardInfixOperators: InfixOperator[] = [
	{ symbol: '+', priority: 1, recognizeWithoutWhitespace: true },
	{ symbol: '-', priority: 1, recognizeWithoutWhitespace: true },

  { symbol: '*', priority: 0, recognizeWithoutWhitespace: true },
	// { symbol: '/', priority: 0, recognizeWithoutWhitespace: true },

  // Must be placed first because of "="
  { symbol: '=>', priority: 3, recognizeWithoutWhitespace: true },
  { symbol: '<=', priority: 2, recognizeWithoutWhitespace: true },

  { symbol: '=', priority: 2, recognizeWithoutWhitespace: true },
  { symbol: '>', priority: 2, recognizeWithoutWhitespace: true },
  // { symbol: '>=', priority: 2, recognizeWithoutWhitespace: true },
	// { symbol: '=<', priority: 2, recognizeWithoutWhitespace: true },
	{ symbol: '<', priority: 2, recognizeWithoutWhitespace: true },


	// { symbol: '<=', priority: 3, recognizeWithoutWhitespace: true },
	// { symbol: '<=>', priority: 3, recognizeWithoutWhitespace: true },

  { symbol: 'and', priority: 3, recognizeWithoutWhitespace: false},
  { symbol: 'or', priority: 3, recognizeWithoutWhitespace: false },
  { symbol: 'xor', priority: 3, recognizeWithoutWhitespace: false },
];

export function getInfixFunction(symbol: string): InfixOperator | undefined {
	return standardInfixOperators.find(item => item.symbol === symbol);
}

export default standardInfixOperators;
