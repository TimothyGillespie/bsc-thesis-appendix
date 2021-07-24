import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-constructor-entering',
  templateUrl: './constructor-entering.component.html',
  styleUrls: ['./constructor-entering.component.scss']
})
export class ConstructorEnteringComponent implements OnInit {
	@Input('formGroup') formGroup!: FormGroup;
	constructorDefinitions!: FormArray
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
		this.constructorDefinitions = this.formGroup.get('constructorDefinitions') as FormArray;
  }

  createNewConstructorDefinitions(): void {
		this.constructorDefinitions.push(
			this.fb.group({
				term: this.fb.control(null),
				type: this.fb.control(null),
				functions: this.fb.array([]),
			})
		);
  }

}
