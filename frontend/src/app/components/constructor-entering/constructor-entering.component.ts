import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";

@Component({
  selector: 'app-constructor-entering',
  templateUrl: './constructor-entering.component.html',
  styleUrls: ['./constructor-entering.component.scss']
})
export class ConstructorEnteringComponent implements OnInit {
  formGroup!: FormGroup;

  typeOptions = environment.constructedTypeOptions;

  @Output() onFinish: EventEmitter<ConstructorDefinition[]> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      constructorDefinitions: this.fb.array([]),
    })

  }

  createNewConstructorDefinitions(): void {
    this.getConstructorDefinitions().push(
			this.fb.group({
				term: this.fb.control(null),
				type: this.fb.control(null),
				functions: this.fb.array([]),
			})
		);
  }

  createNewConstructorFunction(constructorDefIndex: number) {
    this.getFunctions(constructorDefIndex).push(
      this.fb.group({
        symbol: this.fb.control(null),
        arity: this.fb.control(0),
      })
    );
  }

  getConstructorDefinitions(): FormArray {
    return this.formGroup.get('constructorDefinitions') as FormArray;
  }

  getFunctions(constructorDefIndex: number): FormArray {
    return this.getConstructorDefinitions().get(`${constructorDefIndex}.functions`) as FormArray;
  }

  emitFinishEvent() {
    this.onFinish.emit(this.getConstructorDefinitions().value);
  }

}
