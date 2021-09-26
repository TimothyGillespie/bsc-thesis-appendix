import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {Router} from "@angular/router";
import {ApiQueryService} from "../../services/api-query/api-query.service";
import functionTreeNodeToString from "../../../util/Formulae/functionTreeNodeToString";
import isTreeableStatement from "../../../util/validators/isTreeableStatement";
import {ValidationHintService} from "../../services/validation-hint/validation-hint.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-additional-constraints-entering',
  templateUrl: './additional-constraints-entering.component.html',
  styleUrls: ['./additional-constraints-entering.component.scss']
})
export class AdditionalConstraintsEnteringComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  typeDropdownOptions = [];
  allowedVariableCharacters = /^[a-z0-9]*$/g;
  allowedValuesForFormulae = environment.allowedFormulaInput;

  constructor(
    private fb: FormBuilder,
    private requestData: RequestDataService,
    private router: Router,
    private api: ApiQueryService,
    private validationHint: ValidationHintService,
    ) { }

  ngOnInit(): void {
    this.api.getTypes().subscribe((options) => {
      this.typeDropdownOptions = options;
    });



    this.formGroup = this.fb.group({
      additionalConstraints: this.fb.array((this.requestData.additionalConstraints.value ?? []).map((initialValue) => {
        const inputVariablesInit = []
        for(const variable in initialValue.inputVariables) {
          inputVariablesInit.push(this.fb.group({
            variable: this.fb.control(variable, {validators: Validators.required, updateOn: 'blur'}),
            type: this.fb.control(initialValue.inputVariables[variable], {validators: Validators.required, updateOn: 'blur'}),
          }))
        }

        return this.fb.group({
          inputVariables: this.fb.array(inputVariablesInit),
          constraint: this.fb.control(initialValue.constraint, {validators: [Validators.required, isTreeableStatement], updateOn: "blur"})
        })
      })),
    });
  }

  ngOnDestroy(): void {
    this.requestData.additionalConstraints.next(this.getAdditionalConstraints().value.map(x => {
      return {
        inputVariables: AdditionalConstraintsEnteringComponent.objectify(x.inputVariables),
        constraint: x.constraint
      };
    }));

    this.requestData.persist();
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

  getVariableSymbol(ac: number, iv: number): FormControl {
    return this.getSingleInputVariables(ac, iv).get('variable') as FormControl;
  }

  getVariableType(ac: number, iv: number): FormControl {
    return this.getSingleInputVariables(ac, iv).get('type') as FormControl;
  }

  getConstraint(ac: number): FormControl {
    return this.formGroup.get(`additionalConstraints.${ac}.constraint`) as FormControl;
  }


  addConstraintEntry() {
    this.getAdditionalConstraints().push(this.fb.group({
      inputVariables: this.fb.array([]),
      constraint: this.fb.control(
        null,
        {validators: [Validators.required, isTreeableStatement], updateOn: 'blur'}
      ),
    }));
  }

  addInputVariable(ac: number) {
    this.getInputVariables(ac).push(this.fb.group({
      variable: this.fb.control(
        null,
        {validators: Validators.required, updateOn: 'blur'}
        ),
      type: this.fb.control(
        null,
        {validators: Validators.required, updateOn: 'blur'}
      ),
    }));
  }

  deleteInputVariable(ac: number, iv: number) {
    this.getInputVariables(ac).removeAt(iv);
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }

  onFinish() {
    if(this.isFormValid()) {
      this.router.navigate(['finish']);
    } else {
      this.validationHint.sendGeneralHint();
    }
  }

  onBack() {
    this.router.navigate(['function-definitions'])
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

  deleteConstraint(ac: number) {
    (this.formGroup.get('additionalConstraints') as FormArray).removeAt(ac);
  }

  public extractStatementError(control: FormControl): string {
    return control.getError('treeableStatement');
  }
}
