import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationHintService} from "../../services/validation-hint/validation-hint.service";
import {StepDisplayService} from "../../services/step-display/step-display.service";

@Component({
  selector: 'app-statement-entering',
  templateUrl: './statement-entering.component.html',
  styleUrls: ['./statement-entering.component.scss']
})
export class StatementEnteringComponent implements OnInit, OnDestroy {

  allowedValuesForFormulae = environment.allowedFormulaInput;
  wordKeyFilter = /^[a-zA-Z]$/


  formGroup: FormGroup;
  // This is separate from the formGroup due to the development steps
  statement?: string = "";

  constructor(
    public router: Router,
    public requestData: RequestDataService,
    private fb: FormBuilder,
    private validationHint: ValidationHintService,
    private stepDisplay: StepDisplayService,
  ) {
    this.stepDisplay.showSteps = true;
    this.stepDisplay.activeIndex = 1;
  }

  ngOnInit(): void {
    console.log(this.requestData.constructorDefinitions.value);

    this.requestData.additionalFunctions.subscribe((fs) => {
      let additionalFunctions: FormGroup[]
      additionalFunctions = [];

      if(fs !== undefined) {
       additionalFunctions = fs.map(f => this.fb.group({
          symbol: this.fb.control(
            f.symbol,
        {validators: Validators.required, updateOn: 'blur'}
          ),
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

  checkStatement(sendHint: boolean = false): boolean {
    if(this.statement == null || this.statement.trim() === '') {
      if (sendHint) this.validationHint.sendHint('Please enter a statement.')
      return false;
    }

    let countOpen = 0
    let countClosed = 0
    for(const c of this.statement) {
      if(c === '(')
        countOpen++;

      if(c === ')')
        countClosed++;
    }

    if(countOpen != countClosed) {
      if (sendHint) this.validationHint.sendHint(`Please check your parenthesis. The amount of opening parenthesis (${countOpen}) does not match the number of closing parenthesis (${countClosed})`)
      return false;
    }


    try {
      getFunctionTree(this.statement);
    } catch (e) {
      if(sendHint) this.validationHint.sendHint('The statement could not be parsed, please check if it looks correct.')
      return false
    }

    return true
  }


  checkForm(sendHint: boolean) {
    if(this.checkStatement(sendHint)) {
      if(this.formGroup.invalid) {
        if(sendHint) this.validationHint.sendHint('Please either delete unused additional functions or fill the symbol field.')
        return false;
      }
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.requestData.statementString.next(this.statement);
    this.requestData.additionalFunctions.next(this.getFunctions().value)
    this.requestData.persist()
  }

  onFinish() {
    if(this.checkForm(true))
      this.router.navigate(['function-definitions']);
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
        symbol: this.fb.control(null,
          {validators: Validators.required, updateOn: 'blur'}
        ),
        arity: this.fb.control(0),
      })
    );
  }

  getFunctions(): FormArray {
    return this.formGroup.get('additionalFunctions') as FormArray;
  }

  getSymbol(f: number): FormControl {
    return this.getFunctions().get(`${f}.symbol`) as FormControl
  }

  removeAdditionalFunction(f: number) {
    this.getFunctions().removeAt(f);
  }
}
