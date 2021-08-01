import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";

@Component({
  selector: 'app-additional-constraints-entering',
  templateUrl: './additional-constraints-entering.component.html',
  styleUrls: ['./additional-constraints-entering.component.scss']
})
export class AdditionalConstraintsEnteringComponent implements OnInit {

  formGroup: FormGroup;

  @Output() onFinish: EventEmitter<AdditionalConstraint[]> = new EventEmitter();
  typeDropdownOptions = environment.typeOptions;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      additionalConstraints: this.fb.array([]),
    });
  }

  getAdditionalConstraints(): FormArray {
    return this.formGroup.get('additionalConstraints') as FormArray;
  }

  getInputVariables(ac: number): FormArray {
    return this.formGroup.get(`additionalConstraints.${ac}.inputVariables`) as FormArray;
  }

  getSingleInputVariables(ac: number, iv: number): FormGroup {
    return this.formGroup.get(`additionalConstraints.${ac}.inputVariables.${iv}`) as FormGroup;
  }

  addConstraintEntry() {
    this.getAdditionalConstraints().push(this.fb.group({
      inputVariables: this.fb.array([]),
      constraint: this.fb.control(null),
    }));
  }

  addInputVariable(ac: number) {
    this.getInputVariables(ac).push(this.fb.group({
      variable: this.fb.control(null),
      type: this.fb.control(null),
    }));
  }

  deleteInputVariable(ac: number, iv: number) {
    this.getInputVariables(ac).removeAt(iv);
  }

  onFinishHandler() {
    this.onFinish.emit(this.getAdditionalConstraints().value.map(x => {
      return {
        inputVariables: AdditionalConstraintsEnteringComponent.objectify(x.inputVariables),
        constraint: getFunctionTree(x.constraint)
      };
    }));
  }

  private static objectify(input: any[]): {[variable: string]: string} {
    const result = {};
    for(let entry of input) {
      result[entry.variable] = entry.type;
    }

    return result;
  }

}
