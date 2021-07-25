export interface ConstructorDefinition {
  term: string;
  type: string;
  functions: ConstructorFunctionDefinition[];
}

export interface ConstructorFunctionDefinition {
  symbol: string;
  arity: number;
}
