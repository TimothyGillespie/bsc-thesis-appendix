import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ConstructorDefinition, ConstructorFunctionDefinition} from "../../models/ConstructorDefinition";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {Router} from "@angular/router";
import {ApiQueryService} from "../../services/api-query/api-query.service";
import containsBaseCase from "../../../util/validators/containsBaseCase";
import containsNonBaseCase from "../../../util/validators/containsNonBaseCase";
import {ValidationHintService} from "../../services/validation-hint/validation-hint.service";

@Component({
  selector: 'app-constructor-entering',
  templateUrl: './constructor-entering.component.html',
  styleUrls: ['./constructor-entering.component.scss']
})
export class ConstructorEnteringComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;

  typeOptions = [];

  constructor(
    private fb: FormBuilder,
    private requestData: RequestDataService,
    private router: Router,
    private api: ApiQueryService,
    private validationHint: ValidationHintService,
  ) { }

  ngOnInit(): void {

    this.api.getTypes().subscribe((options) => {
      this.typeOptions = options.filter((entry) => !entry.smtNative)
    });

    this.requestData.constructorDefinitions.pipe(first()).subscribe((initialValue) => {
      let initialStateConstructorDefinitions = [];
      if(initialValue !== undefined)
        initialStateConstructorDefinitions = initialValue.map((x) => this.generateFormGroupFromConstructorDefinitions(x))

      this.formGroup = this.fb.group({
        constructorDefinitions: this.fb.array(initialStateConstructorDefinitions),
      });

    });

  }

  ngOnDestroy() {
    this.requestData.constructorDefinitions.next(this.getConstructorDefinitions().value);
    this.requestData.persist();
  }

  generateFromGroupFromFunctionDefinition(funcDef: ConstructorFunctionDefinition): FormGroup {
      return this.fb.group({
        symbol: this.fb.control(funcDef.symbol,
          {validators: Validators.required, updateOn: "blur"}
        ),
        arity: this.fb.control(
          funcDef.arity,
          {validators: Validators.required, updateOn: "blur"}
        ),
      });
  }

  generateFormGroupFromConstructorDefinitions(constructorDef: ConstructorDefinition): FormGroup {
    return this.fb.group({
      term: this.fb.control(
        constructorDef.term,
        {validators: [Validators.required], updateOn: 'blur'}
      ),
      type: this.fb.control(
        constructorDef.type,
        {validators: [Validators.required], updateOn: 'blur'}
      ),
      functions: this.fb.array(
        constructorDef.functions.map((x) => this.generateFromGroupFromFunctionDefinition(x)),
        {validators: [containsBaseCase(), containsNonBaseCase()], updateOn: 'blur'}
      ),
    })
  }

  isFormValid(): boolean {
    return this.formGroup.valid
  }

  onFinish() {
    if(this.isFormValid())
      this.router.navigate(['statement']);
    else
      this.validationHint.sendGeneralHint()
  }

  /*
   * Form Management Functions
   */

  createNewConstructorDefinitions(): void {
    this.getConstructorDefinitions().push(
      this.fb.group({
        term: this.fb.control(
          null,
          {validators: [Validators.required], updateOn: 'blur'}
        ),
        type: this.fb.control(
          null,
          {validators: [Validators.required], updateOn: 'blur'}
        ),
        functions: this.fb.array(
          [],
          {validators: [containsBaseCase(), containsNonBaseCase()], updateOn: 'blur'}
        ),
      })
    );
  }

  createNewConstructorFunction(constructorDefIndex: number) {
    this.getFunctions(constructorDefIndex).push(
      this.fb.group({
        symbol: this.fb.control(
          null,
          {validators: [Validators.required], updateOn: 'blur'}
        ),
        arity: this.fb.control(
          0,
          {validators: [Validators.required], updateOn: 'blur'}
        ),
      })
    );
  }

  getConstructorDefinitions(): FormArray {
    return this.formGroup.get('constructorDefinitions') as FormArray;
  }

  getConstructorTerm(d: number): FormControl {
    return this.getConstructorDefinitions().get(`${d}.term`) as FormControl;
  }

  getConstructorType(d: number): FormControl {
    return this.getConstructorDefinitions().get(`${d}.type`) as FormControl;
  }

  getFunctions(constructorDefIndex: number): FormArray {
    return this.getConstructorDefinitions().get(`${constructorDefIndex}.functions`) as FormArray;
  }

  removeConstructorFunction(c: number, f: number) {
    this.getFunctions(c).removeAt(f);
  }

  getSingleFunction(d: number, f: number) {
    return this.getFunctions(d).get(`${f}`) as FormGroup;
  }
}
