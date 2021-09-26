import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {ProveRequest} from "../api-query/api-query.service";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionIdentifier} from "../../../util/Formulae/formula";

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  constructorDefinitions = new BehaviorSubject<ConstructorDefinition[] | undefined>(undefined);
  statementString = new BehaviorSubject<string | undefined>(undefined);
  additionalFunctions = new BehaviorSubject<FunctionIdentifier[] | undefined>(undefined)
  functionDefinitions = new BehaviorSubject<FunctionDefinition[] | undefined>(undefined);
  additionalConstraints = new BehaviorSubject<AdditionalConstraint[] | undefined>(undefined);

  constructor() {
    this.loadFromLocalStorage();
  }

  obtainRequest(): ProveRequest | undefined {
    if(
      this.constructorDefinitions.value === undefined
      || this.statementString.value === undefined
      || this.functionDefinitions.value === undefined
    )
      return undefined;

    return {
      constructorDefinitions: this.constructorDefinitions.value,
      statementTree: getFunctionTree(this.statementString.value),
      functionDefinitions: this.functionDefinitions.value,
      additionalConstraints: this.additionalConstraints.value,
    }
  }

  isPristine(): boolean {
    return this.constructorDefinitions.value === undefined
      && this.statementString.value === undefined
      && this.functionDefinitions.value === undefined
      && this.additionalConstraints.value === undefined;
  }

  reset() {

    const subjects = [
      this.constructorDefinitions,
      this.statementString,
      this.additionalFunctions,
      this.functionDefinitions,
      this.additionalConstraints,
    ];

    subjects.forEach((singleSubject) => {
      singleSubject.observers.forEach((observer) => observer.complete);
      singleSubject.next(undefined);
    })

    localStorage.removeItem('constructorDefinitions')
    localStorage.removeItem('statementString')
    localStorage.removeItem('additionalFunctions')
    localStorage.removeItem('functionDefinitions')
    localStorage.removeItem('additionalConstraints')

  }

  persist() {
    if(this.constructorDefinitions.value)
      localStorage.setItem('constructorDefinitions', JSON.stringify(this.constructorDefinitions.value))

    if(this.statementString.value)
      localStorage.setItem('statementString', this.statementString.value)

    if(this.additionalFunctions.value)
      localStorage.setItem('additionalFunctions', JSON.stringify(this.additionalFunctions.value))

    if(this.functionDefinitions.value)
      localStorage.setItem('functionDefinitions', JSON.stringify(this.functionDefinitions.value))

    if(this.additionalConstraints.value)
      localStorage.setItem('additionalConstraints', JSON.stringify(this.additionalConstraints.value))
  }

  loadFromLocalStorage() {

    const constructorDefinitions = JSON.parse(localStorage.getItem('constructorDefinitions'))
    if (constructorDefinitions)
      this.constructorDefinitions.next(constructorDefinitions);


    const statementString = localStorage.getItem('statementString')
    if (statementString && statementString !== "undefined" && statementString !== "null")
      this.statementString.next(statementString);

    const additionalFunctions = JSON.parse(localStorage.getItem('additionalFunctions'))
    if (additionalFunctions)
      this.additionalFunctions.next(additionalFunctions);

    const functionDefinitions = JSON.parse(localStorage.getItem('functionDefinitions'))
    if (functionDefinitions)
      this.functionDefinitions.next(functionDefinitions);

    const additionalConstraints = JSON.parse(localStorage.getItem('additionalConstraints'))
    if (additionalConstraints)
      this.additionalConstraints.next(additionalConstraints)
  }


}
