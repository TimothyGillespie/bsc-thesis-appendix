import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-structural-induction-prover',
	templateUrl: './structural-induction-prover.component.html',
	styleUrls: ['./structural-induction-prover.component.scss'],
})
export class StructuralInductionProverComponent implements OnInit {
	formGroup?: FormGroup;

	constructor(private readonly fb: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.fb.group({});
	}
}
