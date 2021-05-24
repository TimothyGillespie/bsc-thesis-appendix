import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import FormulaAnalyzer, { FunctionDescription } from '../../../util/FormulaAnalyzer/FormulaAnalyzer';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-structural-induction-prover',
	templateUrl: './structural-induction-prover.component.html',
	styleUrls: ['./structural-induction-prover.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructuralInductionProverComponent implements OnInit, OnDestroy {
	typeDropdownOptions = [
		{ label: 'Please select a type', value: null },
		{ label: 'Integer', value: 'Int' },
		{ label: 'Binary Tree', value: 'BTree' },
		{ label: 'Non-Empty Binary Tree', value: 'NEBTree' },
	];

	allowedValuesForFormulae = /^[A-Za-z0-9\\(\\),\\*\\+-]+$/;

	subscriptions: Subscription[] = [];

	functionTabsMenuItems: MenuItem[] = [
		{ label: 'Typing', command: () => (this.funcDefShow = 'typing') },
		{ label: 'Value', command: () => (this.funcDefShow = 'value') },
	];
	funcDefShow = 'typing';

	formGroup = this.fb.group({
		statement: this.fb.control(''),
	});

	funcDefs = this.fb.array([]);

	savedFunctionDefinitions: FullFunctionDescription[] = [];

	constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

	ngOnInit(): void {
		let subscriptionToAdd = this.formGroup
			.get('statement')
			?.valueChanges.pipe(
				map(input => new FormulaAnalyzer(input).getFunctions()),
				distinctUntilChanged((previous, current) => _.isEqual(previous, current)),
				map(functionDefinitionsToLoad =>
					functionDefinitionsToLoad.map(definition => this.createFunctionDefinitionFormGroup(definition)),
				),
			)
			.subscribe(newFunctionDefForm => {
				this.updateFuncDefs(newFunctionDefForm);
			});

		if (subscriptionToAdd !== undefined) this.subscriptions.push(subscriptionToAdd);

		subscriptionToAdd = this.funcDefs.valueChanges
			.pipe(filter(element => !(element === null && element === undefined)))
			.subscribe(values => {
				this.savedFunctionDefinitions.unshift(...values);
				const alreadyContained: FullFunctionDescription[] = [];

				this.savedFunctionDefinitions = this.savedFunctionDefinitions.filter(saved => {
					const found = alreadyContained.find(
						maybeFound =>
							maybeFound.name === saved.name && maybeFound.parameterCount === saved.parameterCount,
					);

					alreadyContained.push(saved);
					return found === undefined;
				});
			});

		if (subscriptionToAdd !== undefined) this.subscriptions.push(subscriptionToAdd);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(singleSubscription => singleSubscription.unsubscribe());
	}

	updateFuncDefs(newFuncDefs: FormGroup[]): void {
		this.funcDefs.clear();
		newFuncDefs.forEach(formGroup => {
			this.funcDefs.push(formGroup);
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
			parameterCount: this.fb.control(fullDescription.parameterCount),
			parameterTypes: this.fb.array(fullDescription.parameterTypes),
			returnType: this.fb.control(fullDescription.returnType),
		});
	}

	findSavedFunctionDefinition(functionDescription: FunctionDescription): FullFunctionDescription | null {
		const maybeFound = this.savedFunctionDefinitions.find(item => {
			return item.name === functionDescription.name && item.parameterCount === functionDescription.parameterCount;
		});

		return maybeFound ? maybeFound : null;
	}

	getFunctionDefHeader(functionDef: FullFunctionDescription): string {
		return `${functionDef.name}: ${this.getFunctionParameterString(functionDef)} ⟼ ${functionDef.returnType ??
			'?'}`;
	}

	getFunctionParameterString(functionDef: FullFunctionDescription): string {
		if (functionDef.parameterTypes.length === 1) {
			return functionDef.parameterTypes[0] ?? '?';
		}

		return <string>functionDef.parameterTypes.reduce((prev, curr) => (prev ?? '?') + ' x ' + (curr ?? '?'));
	}
}

export type FullFunctionDescription = {
	name: string;
	parameterCount: number;
	parameterTypes: Array<string | null>;
	returnType: string | null;
};
