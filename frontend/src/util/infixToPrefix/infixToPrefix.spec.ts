describe('infixToPrefix()', () => {
	const tests: TestCase[] = [
		{
			name: 'Arithmetic with Infix Input',
			input: '3 + 4',
			expectation: '+(3,4)',
		},
		{
			name: 'Arithmetic with Mixed-fix Input',
			input: '3 + *(4,2)',
			expectation: '+(3,*(4,2))',
		},
		{
			name: 'Arithmetic with Mixed-fix Input (Reversed fix notation)',
			input: '',
			expectation: '+(3,*(4,2))',
		},
		{
			name: 'Priority Sensitive Example with Infix Input',
			input: '+(3, 4 * 2)',
			expectation: '+(3,*(4,2))',
		},
		{
			name: 'Priority Sensitive Example with Infix Input (Different Order)',
			input: '3 * 4 + 2',
			expectation: '+(*(3,4),2)',
		},
	];
});

type TestCase = {
	name: string;
	input: string;
	expectation: string;
};
