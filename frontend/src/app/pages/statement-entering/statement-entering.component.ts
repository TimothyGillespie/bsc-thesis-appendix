import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import getIdentifiersFromFunctionTree
  from "../../../util/Formulae/getIdentifiersFromFunctionTree/getIdentifiersFromFunctionTree";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";
import {ConstructorDefinition, ConstructorFunctionDefinition} from "../../models/ConstructorDefinition";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-statement-entering',
  templateUrl: './statement-entering.component.html',
  styleUrls: ['./statement-entering.component.scss']
})
export class StatementEnteringComponent implements OnInit, OnDestroy {

  allowedValuesForFormulae = environment.allowedFormulaInput;

  formGroup: FormGroup;
  // This is separate from the formGroup due to the development steps
  statement?: string = "";

  constructor(
    private router: Router,
    private requestData: RequestDataService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.requestData.additionalFunctions.subscribe((fs) => {
      let additionalFunctions: FormGroup[]
      additionalFunctions = [];

      if(fs !== undefined) {
       additionalFunctions = fs.map(f => this.fb.group({
          symbol: f.symbol,
          arity: f.arity
        }))
      }

      this.formGroup = this.fb.group({
        additionalFunctions: this.fb.array(additionalFunctions),
      })
    })



    this.requestData.statementString.pipe(first()).subscribe((initialValue) => {
      if(initialValue !== undefined)
        this.statement = initialValue;
    })
  }

  ngOnDestroy() {
    this.requestData.statementString.next(this.statement);
    this.requestData.additionalFunctions.next(this.getFunctions().value)
    this.requestData.persist()
  }

  onFinish() {

    this.router.navigate(['function-definitions']);
    // this.onFinish.emit(this.statement);
  }

  onBack() {
    this.router.navigate(['constructor-definitions'])
  }

  /*
   * Form Management Functions
   */

  createNewFunction() {
    (this.formGroup.get('additionalFunctions') as FormArray).push(
      this.fb.group({
        symbol: this.fb.control(null),
        arity: this.fb.control(0),
      })
    );
  }

  getFunctions(): FormArray {
    return this.formGroup.get('additionalFunctions') as FormArray;
  }

  removeAdditionalFunction(f: number) {
    this.getFunctions().removeAt(f);
  }
}
