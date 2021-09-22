import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FunctionDefinition, ValueDefinition} from "../../models/FunctionDefinition";
import {FunctionIdentifier, FunctionTreeNode} from "../../../util/Formulae/formula";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {Form, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import getTypeOfFunctionByTerm from "../../../util/Formulae/getTypeOfFunctionByTerm";
import getTermOfFunction from "../../../util/Formulae/getTermOfFunction";
import getIdentifiersFromFunctionTree
  from "../../../util/Formulae/getIdentifiersFromFunctionTree/getIdentifiersFromFunctionTree";
import standardInfixOperators, {getInfixFunction} from "../../../util/Formulae/standardInfixOperator";
import {Footer, MenuItem} from "primeng/api";
import {environment} from "../../../environments/environment";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {ApiQueryService} from "../../services/api-query/api-query.service";
import functionTreeNodeToString from "../../../util/Formulae/functionTreeNodeToString";

@Component({
  selector: 'app-function-definitions',
  templateUrl: './function-definitions.component.html',
  styleUrls: ['./function-definitions.component.scss']
})
export class FunctionDefinitionsComponent implements OnInit, OnDestroy {

  statementTree!: FunctionTreeNode;
  constructorDefinitions: ConstructorDefinition[];

  typeDropdownOptions = [];
  allowedValuesForFormulae = environment.allowedFormulaInput;

  formGroup?: FormGroup;

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

    this.requestData.statementString.pipe(first()).subscribe((initialValue) => {
      if(initialValue === undefined)
        this.router.navigate(['statement']);

      this.statementTree = getFunctionTree(initialValue ?? '');
    })

    this.requestData.constructorDefinitions.pipe(first()).subscribe((initialValue) => {
      if(initialValue === undefined)
        this.router.navigate(['constructor-definitions']);

      this.constructorDefinitions = initialValue;
    });

    this.formGroup = this.fb.group({
      functionDefinitions: this.fb.array([])
    });

    const functionIdentifiers = getIdentifiersFromFunctionTree(this.statementTree).filter(identifier => {
      return this.constructorDefinitions?.find(cons => cons.term === identifier.symbol) === undefined &&
        getInfixFunction(identifier.symbol) === undefined
    })

    functionIdentifiers.push(...this.requestData.additionalFunctions.value)


    functionIdentifiers
      .forEach((x) => {
        const existingDefinition = this.requestData.functionDefinitions.value.find((definition) => definition.name === x.symbol);
        this.addFunctionDefinition(x, existingDefinition)
      });

  }

  ngOnDestroy() {
    this.requestData.functionDefinitions.next(this.getFunctionDefinitions().value.map(x => {
        return {
          ...x,
          definition: x.definition.map(y => {
            return {
              ...y,
              conditional: y.conditional.map(z => {
                return {
                  condition: getFunctionTree(z.condition),
                  then: getFunctionTree(z.then),
                }
              }),
              otherwise: getFunctionTree(y.otherwise)
            }
          }),
        };
      }
    ));

    this.requestData.persist();
  }

  onFinish() {
    this.router.navigate(['additional-constraints'])
  }




  /*
   * Form Management Functions
   */

  getFunctionDefinitions(): FormArray {
    return this.formGroup.get('functionDefinitions') as FormArray;
  }

  addFunctionDefinition(identifier: FunctionIdentifier, givenValues: FunctionDefinition | null = null): void {
    let inputTypeByTerm: string | null = null;
    let definition: FormGroup[] = [];
    const term = getTermOfFunction(this.statementTree, this.constructorDefinitions, identifier.symbol);
    if(identifier.arity === 1 && term != null) {
      const term = getTermOfFunction(this.statementTree, this.constructorDefinitions, identifier.symbol);
      const constructor  = this.constructorDefinitions.find(cons => cons.term === term);
      inputTypeByTerm = constructor.type;
      definition = constructor.functions.map((consFunc) => {
        const alreadyDefinedDefinition = givenValues.definition.find((givenDefinition) =>
          givenDefinition.inputConstructor
          && parseInt(givenDefinition.inputConstructor.arity, 10) === consFunc.arity
          && givenDefinition.inputConstructor.name
        );
        if(alreadyDefinedDefinition == null) {
          return this.fb.group({
            inputConstructor: this.fb.group({
              name: this.fb.control(consFunc.symbol),
              arity: this.fb.control(consFunc.arity),
              boundVariables: this.fb.array(Array.from({length: consFunc.arity}, (_, i) => 'x' + (i + 1))),
            }),
            conditional: this.fb.array([]),
            otherwise: this.fb.control(null),
          })
        } else {
          return this.fb.group({
            inputConstructor: this.fb.group({
              name: this.fb.control(alreadyDefinedDefinition.inputConstructor.name),
              arity: this.fb.control(alreadyDefinedDefinition.inputConstructor.arity),
              boundVariables: this.fb.array(alreadyDefinedDefinition.inputConstructor.boundVariables),
            }),
            conditional: this.fb.array(alreadyDefinedDefinition.conditional.map((conditional) => this.fb.group({
              condition: this.fb.control(functionTreeNodeToString(conditional.condition)),
              then: this.fb.control(functionTreeNodeToString(conditional.then)),
            }))),
            otherwise: functionTreeNodeToString(alreadyDefinedDefinition.otherwise)
          })
        }
      })
    }

    if(term == null) {
      const alreadyDefinedInputVariableDefinition = givenValues.definition.find((maybe) => maybe.inputVariable != null)
      if(alreadyDefinedInputVariableDefinition == null) {
        definition = [
          this.fb.group({
            inputVariable: this.fb.array(Array.from({length: identifier.arity}, (_, i) => 'x' + (i + 1))),
            conditional: this.fb.array([]),
            otherwise: this.fb.control(null),
          })
        ];
      } else {
        definition = [
          this.fb.group({
            inputVariable: this.fb.array(alreadyDefinedInputVariableDefinition.inputVariable),
            conditional: this.fb.array(alreadyDefinedInputVariableDefinition.conditional.map((conditional) => this.fb.group({
              condition: this.fb.control(functionTreeNodeToString(conditional.condition)),
              then: this.fb.control(functionTreeNodeToString(conditional.then)),
            }))),
            otherwise: functionTreeNodeToString(alreadyDefinedInputVariableDefinition.otherwise),
          })
        ]
      }
    }

    if(givenValues == null)
      this.getFunctionDefinitions().push(this.fb.group({
        name: this.fb.control(identifier.symbol),
        arity: this.fb.control(identifier.arity),
        inputTypes: this.fb.array(inputTypeByTerm != null ? [inputTypeByTerm] : Array(identifier.arity).fill(null)),
        outputType: this.fb.control(null),
        definition: this.fb.array(definition),
      }));
    else
      this.getFunctionDefinitions().push(this.fb.group({
        name: this.fb.control(identifier.symbol),
        arity: this.fb.control(identifier.arity),
        inputTypes: this.fb.array(givenValues.inputTypes),
        outputType: this.fb.control(givenValues.outputType),
        definition: this.fb.array(definition),
      }));
  }

  getSingleFunctionDefinition(index: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${index}`) as FormGroup;
  }

  getValueDefinitions(index: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${index}.definition`) as FormArray;
  }

  addValueDefinition(index: number, type: InputVariant, arity?: number, inputConstructorName?: string) {

    const group = {
      conditional: this.fb.array([]),
      otherwise: this.fb.control(null),
    }

    if(type === 'inputConstructor' && arity && inputConstructorName)
      group['inputConstructor'] = this.fb.group({
        name: this.fb.control(inputConstructorName),
        arity: this.fb.control(arity),
        boundVariables: this.fb.control(Array.from({length: arity}, (_, i) => 'x' + (i + 1) ))
      });

    if(type === 'inputVariable' && arity)
      group['inputVariable'] = this.fb.array(Array.from({length: arity}, (_, i) => 'x' + (i + 1)));

    this.getValueDefinitions(index).push(this.fb.group(group));
    console.log(this.formGroup.value)
  }

  getInputTypes(index: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${index}.inputTypes`) as FormArray;
  }

  getConditional(fd: number, vd: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${fd}.definition.${vd}.conditional`) as FormArray;
  }

  getFunctionName(fd: number): string {
    return this.formGroup.get(`functionDefinitions.${fd}.name`).value
  }

  getValueDefinition(fd: number, vd: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${fd}.definition.${vd}`) as FormGroup;
  }

  getInputVariant(fd: number, vd: number): InputVariant {
    const controls = this.getValueDefinition(fd, vd).controls;
    if(controls['inputConstructor'] != undefined) {
      return 'inputConstructor';
    }

    if(controls['inputVariable'] != undefined) {
      return 'inputVariable';
    }

    return 'none';
  }

  getInputConstructor(fd: number, vd: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${fd}.definition.${vd}.inputConstructor`) as FormGroup;
  }

  getInputConstructorName(fd: number, vd: number): string {
    return this.getInputConstructor(fd, vd).get('name').value;
  }

  getInputConstructorBoundVariables(fd: number, vd: number): FormArray {
    return this.getInputConstructor(fd, vd).get('boundVariables') as FormArray;
  }

  getInputVariable(fd: number, vd: number): FormArray {
    return (this.getValueDefinition(fd, vd).get('inputVariable') as FormArray)
  }

  addConditionalDefinition(fd: number, vd: number) {
    this.getConditional(fd, vd).push(this.fb.group({
      condition: this.fb.control(null),
      then: this.fb.control(null),
    }))
  }

  removeConditionalDefinition(fd: number, vd: number, c: number) {
    this.getConditional(fd, vd).removeAt(c);
  }
}


type InputVariant = 'inputConstructor' | 'inputVariable' | 'none';
