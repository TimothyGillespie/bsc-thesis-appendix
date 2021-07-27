import { FunctionIdentifier } from '../../../Formulae/formula';

export function standardFunctionIdentifierComparator(a: FunctionIdentifier, b: FunctionIdentifier): number {
	const compareSymbol = a.symbol.localeCompare(b.symbol);
	if (compareSymbol !== 0) return compareSymbol;

	return a.arity - b.arity;
}
