import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {ProveRequest} from "../api-query/api-query.service";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  constructorDefinitions = new BehaviorSubject<ConstructorDefinition[] | undefined>(undefined);
  statementString = new BehaviorSubject<string | undefined>(undefined);
  functionDefinitions = new BehaviorSubject<FunctionDefinition[] | undefined>(undefined);
  additionalConstraints = new BehaviorSubject<AdditionalConstraint[] | undefined>(undefined);

  constructor() { }

  obtainRequest(): ProveRequest | undefined {

    if(
      this.constructorDefinitions.value === undefined
      || this.statementString.value === undefined
      || this.functionDefinitions.value === undefined
      || this.additionalConstraints.value === undefined
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
      this.functionDefinitions,
      this.additionalConstraints,
    ];

    subjects.forEach((singleSubject) => {
      singleSubject.observers.forEach((observer) => observer.complete);
      singleSubject.next(undefined);
    })

  }
}
