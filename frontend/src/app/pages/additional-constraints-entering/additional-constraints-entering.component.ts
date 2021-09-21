import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ApiQueryService} from "../../services/api-query/api-query.service";

@Component({
  selector: 'app-additional-constraints-entering',
  templateUrl: './additional-constraints-entering.component.html',
  styleUrls: ['./additional-constraints-entering.component.scss']
})
export class AdditionalConstraintsEnteringComponent implements OnInit {

  formGroup: FormGroup;

  typeDropdownOptions = [];

  constructor(
    private fb: FormBuilder,
    private requestData: RequestDataService,
    private router: Router,
    private api: ApiQueryService,
    ) { }

  ngOnInit(): void {
    this.api.getTypes().subscribe((options) => {
      this.typeDropdownOptions = options;
    });

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

  onFinish() {
    this.requestData.additionalConstraints.next(this.getAdditionalConstraints().value.map(x => {
      return {
        inputVariables: AdditionalConstraintsEnteringComponent.mappify(x.inputVariables),
        constraint: getFunctionTree(x.constraint)
      };
    }));

    this.router.navigate(['finish']);
  }

  private static objectify(input: any[]): {[variable: string]: string} {
    const result = {};
    for(let entry of input) {
      result[entry.variable] = entry.type;
    }

    return result;
  }

  private static mappify(input: any[]): Map<string, string> {
    const result = new Map();
    for(let entry of input) {
      result.set(entry.variable, entry.type);
    }

    return result;
  }
}
