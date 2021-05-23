import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FullFunctionDescription } from '../structural-induction-prover/structural-induction-prover.component';

@Component({
	selector: 'app-function-definition',
	templateUrl: './function-definition.component.html',
	styleUrls: ['./function-definition.component.scss'],
})
export class FunctionDefinitionComponent implements OnInit {
	@Input('formGroup') formGroup!: FormGroup;

	constructor() {}

	ngOnInit(): void {}
}
