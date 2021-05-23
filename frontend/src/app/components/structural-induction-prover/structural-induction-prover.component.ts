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
	typeDropdownOptions = [
		{ label: 'Integer', value: 'Int' },
		{ label: 'Binary Tree', value: 'BTree' },
		{ label: 'Non-Empty Binary Tree', value: 'NEBTree' },
	];

	constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

	ngOnInit(): void {}
}

export type FullFunctionDescription = {
	name: string;
	parameterCount: number;
	parameterTypes: Array<string | null>;
	returnType: string | null;
};
