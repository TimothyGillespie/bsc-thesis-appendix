import { InfixOperator } from './formula';

const standardInfixOperators: InfixOperator[] = [
	{ symbol: '+', priority: 0 },
	{ symbol: '-', priority: 0 },

  { symbol: '*', priority: 1 },
	{ symbol: '/', priority: 1 },

	{ symbol: '=', priority: 2 },
	{ symbol: '>', priority: 2 },
	{ symbol: '<', priority: 2 },
	{ symbol: '>=', priority: 2 },
	{ symbol: '=<', priority: 2 },

	{ symbol: '=>', priority: 3 },
	{ symbol: '<=', priority: 3 },
	{ symbol: '<=>', priority: 3 },

  { symbol: 'and', priority: 3 },
  { symbol: 'or', priority: 3 },
  { symbol: 'xor', priority: 3 },
];

export function getInfixFunction(symbol: string): InfixOperator | undefined {
	return standardInfixOperators.find(item => item.symbol === symbol);
}

export default standardInfixOperators;
