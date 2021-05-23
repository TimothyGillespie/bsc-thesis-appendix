import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import FormulaAnalyzer, { FunctionDescription } from '../../../util/FormulaAnalyzer/FormulaAnalyzer';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
	selector: 'app-structural-induction-prover',
	templateUrl: './structural-induction-prover.component.html',
	styleUrls: ['./structural-induction-prover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructuralInductionProverComponent implements OnInit {
	formGroup: FormGroup;
	statement: FormControl;
	functionDefinitions: FormArray;
	variableDefinitions: FormArray;

	savedFunctionDefinitions: FullFunctionDescription[] = [];

	typeDropdownOptions = [
		{ label: 'Integer', value: 'Int' },
		{ label: 'Binary Tree', value: 'BTree' },
		{ label: 'Non-Empty Binary Tree', value: 'NEBTree' },
	];

	constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
		this.statement = this.fb.control('');
		this.functionDefinitions = this.fb.array([]);
		this.variableDefinitions = this.fb.array([]);

		this.formGroup = this.fb.group({
			statement: this.statement,
			functionDefinitions: this.functionDefinitions,
			variableDefinitions: this.functionDefinitions,
		});
	}

	ngOnInit(): void {
		this.formGroup
			.get('statement')
			?.valueChanges.pipe(
				map(input => new FormulaAnalyzer(input).getFunctions()),
				distinctUntilChanged((previous, current) => _.isEqual(previous, current)),
				map(functionDefinitionsToLoad =>
					functionDefinitionsToLoad.map(definition => this.createFunctionDefinitionFormGroup(definition)),
				),
			)
			.subscribe(newFunctionDefForm => {
				this.functionDefinitions = this.fb.array(newFunctionDefForm);
				this.formGroup.setControl('functionDefinitions', this.functionDefinitions);
				this.cd.markForCheck();
				this.cd.detectChanges();
			});
	}

	createFunctionDefinitionFormGroup(functionDescription: FunctionDescription): FormGroup {
		let fullDescription = this.findSavedFunctionDefinition(functionDescription);
		if (fullDescription === null) {
			fullDescription = {
				name: functionDescription.name,
				parameterCount: functionDescription.parameterCount,
				parameterTypes: new Array(functionDescription.parameterCount).fill(null),
				returnType: null,
			};
			this.savedFunctionDefinitions.push(fullDescription);
		}

		return this.fb.group({
			name: this.fb.control(fullDescription.name),
			parameterTypes: this.fb.array(fullDescription.parameterTypes),
			returnType: null,
		});
	}

	findSavedFunctionDefinition(functionDescription: FunctionDescription): FullFunctionDescription | null {
		const maybeFound = this.savedFunctionDefinitions.find(
			item =>
				item.name === functionDescription.name && item.parameterCount === functionDescription.parameterCount,
		);

		return maybeFound ? maybeFound : null;
	}

	getFunctionDefHeader(functionDef: FullFunctionDescription): string {
		return `${functionDef.name}: ${this.getFunctionParameterString(functionDef)} ⟼ ${functionDef.returnType ??
			'?'}`;
	}

	getFunctionParameterString(functionDef: FullFunctionDescription): string {
		return <string>functionDef.parameterTypes.reduce((prev, curr) => (prev ?? '?') + ' x ' + (curr ?? '?'));
	}

	getFunctionDefinitions(): FormArray {
		return this.formGroup.get('functionDefinitions') as FormArray;
	}

	getFunctionDefinitionControls(): FormControl[] {
		return this.getFunctionDefinitions().controls as FormControl[];
	}

	getParameterTypes(formGroup: AbstractControl) {
		console.log(((formGroup as unknown) as FormGroup).get('parameterTypes')?.value);
		return ((formGroup as unknown) as FormGroup).get('parameterTypes')?.value;
	}
}

export type FullFunctionDescription = {
	name: string;
	parameterCount: number;
	parameterTypes: Array<string | null>;
	returnType: string | null;
};
