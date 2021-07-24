import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-structural-induction-prover-guided',
  templateUrl: './structural-induction-prover-guided.component.html',
  styleUrls: ['./structural-induction-prover-guided.component.scss']
})
export class StructuralInductionProverGuidedComponent implements OnInit {

	formGroup?: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  	this.formGroup = this.fb.group({
		constructorDefinitions: this.fb.array([]),
		statement: this.fb.control(''),
		functionDefinitions: this.fb.array([]),
		additionalConstraints: this.fb.array([]),
	});
  }

}
