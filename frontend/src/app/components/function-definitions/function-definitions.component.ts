import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

@Component({
  selector: 'app-function-definitions',
  templateUrl: './function-definitions.component.html',
  styleUrls: ['./function-definitions.component.scss']
})
export class FunctionDefinitionsComponent implements OnInit {

  @Input() statementTree!: FunctionTreeNode;
  @Input() constructorDefinitions: ConstructorDefinition[];
  @Output() onFinish: EventEmitter<FunctionDefinition[]> = new EventEmitter();

  typeDropdownOptions = environment.typeOptions;
  allowedValuesForFormulae = environment.allowedFormulaInput;

  formGroup?: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      functionDefinitions: this.fb.array([])
    });

    getIdentifiersFromFunctionTree(this.statementTree).filter(identifier => {
      return this.constructorDefinitions.find(cons => cons.term === identifier.symbol) === undefined &&
        getInfixFunction(identifier.symbol) === undefined
    }).forEach(x => this.addFunctionDefinition(x));
    console.log(this.formGroup.value);
  }

  emitEvent() {
    this.onFinish.emit(this.getFunctionDefinitions().value);
  }

  getFunctionDefinitions(): FormArray {
    return this.formGroup.get('functionDefinitions') as FormArray;
  }

  addFunctionDefinition(identifier: FunctionIdentifier): void {
    let inputTypeByTerm: string | null = null;
    let definitions: FormGroup[] = [];
    if(identifier.arity === 1) {
      const term = getTermOfFunction(this.statementTree, this.constructorDefinitions, identifier.symbol);
      const constructor  = this.constructorDefinitions.find(cons => cons.term === term);
      inputTypeByTerm = constructor.type;
      definitions = constructor.functions.map((consFunc) => this.fb.group({
        inputConstructor: this.fb.group({
          name: this.fb.control(consFunc.symbol),
          arity: this.fb.control(consFunc.arity),
          boundVariables: this.fb.array(Array.from({length: consFunc.arity}, (_, i) => 'x' + (i + 1))),
        }),
        conditional: this.fb.array([]),
        otherwise: this.fb.control(null),
      }))
    }

    this.getFunctionDefinitions().push(this.fb.group({
      name: this.fb.control(identifier.symbol),
      arity: this.fb.control(identifier.arity),
      inputTypes: this.fb.array(inputTypeByTerm != null ? [inputTypeByTerm] : Array(identifier.arity).fill(null)),
      outputType: this.fb.control(inputTypeByTerm),
      definitions: this.fb.array(definitions),
      otherwise: this.fb.control(null),
    }));
  }

  getSingleFunctionDefinition(index: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${index}`) as FormGroup;
  }

  getValueDefinitions(index: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${index}.definitions`) as FormArray;
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

    if(type === 'inputVariables' && arity)
      group['inputVariables'] = this.fb.array(Array.from({length: arity}, (_, i) => 'x' + (i + 1)));

    return this.getValueDefinitions(index).push(this.fb.group(group));
  }

  getInputTypes(index: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${index}.inputTypes`) as FormArray;
  }

  getConditional(fd: number, vd: number): FormArray {
    return this.formGroup.get(`functionDefinitions.${fd}.definitions.${vd}.conditional`) as FormArray;
  }

  getFunctionName(fd: number): string {
    return this.formGroup.get(`functionDefinitions.${fd}.name`).value
  }

  getValueDefinition(fd: number, vd: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${fd}.definitions.${vd}`) as FormGroup;
  }

  getInputVariant(fd: number, vd: number): InputVariant {
    const controls = this.getValueDefinition(fd, vd).controls;
    if(controls['inputConstructor'] != undefined) {
      return 'inputConstructor';
    }

    if(controls['inputVariables'] != undefined) {
      return 'inputVariables';
    }

    return 'none';
  }

  getInputConstructor(fd: number, vd: number): FormGroup {
    return this.formGroup.get(`functionDefinitions.${fd}.definitions.${vd}.inputConstructor`) as FormGroup;
  }

  getInputConstructorName(fd: number, vd: number): string {
    return this.getInputConstructor(fd, vd).get('name').value;
  }

  getInputConstructorBoundVariables(fd: number, vd: number): FormArray {
    return this.getInputConstructor(fd, vd).get('boundVariables') as FormArray;
  }

  addConditionalDefinition(fd: number, vd: number) {
    this.getConditional(fd, vd).push(this.fb.group({
      if: this.fb.control(null),
      then: this.fb.control(null),
    }))
  }

  removeConditionalDefinition(fd: number, vd: number, c: number) {
    this.getConditional(fd, vd).removeAt(c);
  }
}


type InputVariant = 'inputConstructor' | 'inputVariables' | 'none';
