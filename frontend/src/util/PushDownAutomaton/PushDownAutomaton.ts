import _ from 'lodash';
import Rule from './Rule';

class PushDownAutomaton {
	protected states: Set<string> = new Set();

	// For the alphabets null shall mean all inputs are allowed
	protected inputAlphabet: Set<string> | null = null;
	protected stackAlphabet: Set<string> | null = null;

	protected startState: string | undefined = undefined;

	protected startStackSymbol: string | null = null;
	protected acceptingStates: Set<string> = new Set();

	protected rules: Set<string> = new Set();

	protected constructor() {}

	/*
	 * Getter
	 */

	getStates(): Set<string> {
		return this.states;
	}

	getInputAlphabet(): Set<string> | null {
		return this.inputAlphabet;
	}

	getStackAlphabet(): Set<string> | null {
		return this.stackAlphabet;
	}

	getStartStackSymbol(): string | null {
		return this.startStackSymbol;
	}

	getAcceptingStates(): Set<string> {
		return this.acceptingStates;
	}

	/*
	 * Setter, Adder and Remover
	 */

	addState(stateName: string): void {
		this.states.add(stateName);
	}

	addInputAlphabetSymbol(symbol: string): void {
		if (this.inputAlphabet === null) this.inputAlphabet = new Set();
		this.inputAlphabet.add(symbol);
	}

	addStackAlphabetSymbol(symbol: string): void {
		if (this.stackAlphabet === null) this.stackAlphabet = new Set();
		this.stackAlphabet.add(symbol);
	}

	setStartState(state: string): void {
		this.validateStateIsContained(state);
		this.startState = state;
	}

	setStartStackSymbol(symbol: string | null) {
		this.validateSymbolContainedInStackAlphabet(symbol);
		this.startStackSymbol = symbol;
	}

	addAcceptingStates(state: string) {
		this.validateStateIsContained(state);
		this.acceptingStates.add(state);
	}

	addRule(rule: Rule) {}

	/*
	 * Validation Methods (returning boolean)
	 */

	isStateContained(state: string): boolean {
		return this.getStates().has(state);
	}

	isSymbolContainedInStackAlphabet(symbol: string | null): boolean {
		const stackAlphabet = this.getStackAlphabet();
		return symbol !== null && stackAlphabet !== null && !stackAlphabet.has(symbol);
	}

	/*
	 * Validation Methods (throwing error)
	 */
	validateSymbolContainedInStackAlphabet(symbol: string | null): void {
		if (this.isSymbolContainedInStackAlphabet(symbol))
			throw new Error(`The symbol ${symbol} is not contained in the set of stack alphabet.`);
	}

	validateStateIsContained(state: string): void {
		if (!this.isStateContained(state)) throw Error(`The state ${state} is not contained in the set of states.`);
	}

	/*
	 * Misc
	 */

	clone(): PushDownAutomaton {
		return _.clone(this);
	}
}

export default PushDownAutomaton;
