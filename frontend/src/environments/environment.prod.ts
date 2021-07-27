const constructedTypeOptions = [
  {label: 'n-ary tree', value: 'NAryTree'},
  {label: 'formula of propositional logic', value: 'PLFormula'}
]
export const environment = {
  production: true,
  constructedTypeOptions,
  typeOptions: [
    {label: 'Integer', value: 'Int'},
    ...constructedTypeOptions
  ],
  allowedFormulaInput: /^[A-Za-z0-9\\(\\),\\*\\+-=>< ]+$/,
};
