import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {ConstructorDefinition, ConstructorFunctionDefinition} from "../../models/ConstructorDefinition";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {Router} from "@angular/router";
import {ApiQueryService} from "../../services/api-query/api-query.service";

@Component({
  selector: 'app-constructor-entering',
  templateUrl: './constructor-entering.component.html',
  styleUrls: ['./constructor-entering.component.scss']
})
export class ConstructorEnteringComponent implements OnInit {
  formGroup!: FormGroup;

  typeOptions = [];

  constructor(
    private fb: FormBuilder,
    private requestData: RequestDataService,
    private router: Router,
    private api: ApiQueryService,
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

  generateFromGroupFromFunctionDefinition(funcDef: ConstructorFunctionDefinition): FormGroup {
      return this.fb.group({
        symbol: funcDef.symbol,
        arity: funcDef.arity,
      });
  }

  generateFormGroupFromConstructorDefinitions(constructorDef: ConstructorDefinition): FormGroup {
    return this.fb.group({
      term: constructorDef.term,
      type: constructorDef.type,
      functions: this.fb.array(constructorDef.functions.map((x) => this.generateFromGroupFromFunctionDefinition(x))),
    })
  }

  onFinish() {
    this.requestData.constructorDefinitions.next(this.getConstructorDefinitions().value);
    this.router.navigate(['statement']);
  }

  /*
   * Form Management Functions
   */

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

}
