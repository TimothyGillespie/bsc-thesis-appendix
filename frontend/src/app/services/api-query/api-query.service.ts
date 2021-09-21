import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {environment} from "../../../environments/environment";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";
import {map} from "rxjs/operators";
import convertKeysToCamelCase from "../../../util/convertKeysToCamelCase";

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor(
    private http: HttpClient,
  ) { }

  async prove(request: ProveRequest): Promise<ProveResponse> {
     return this.http
       .post<ProveResponse>(environment.baseUrl + '/statement/prove/result', convertKeysToSnakeCase(request))
       .pipe(map((response) => convertKeysToCamelCase(response)))
       .toPromise();
  }

}

export type ProveRequest = {
  constructorDefinitions: ConstructorDefinition[],
  statementTree: FunctionTreeNode,
  functionDefinitions: FunctionDefinition[],
  additionalConstraints: AdditionalConstraint[]
}

export type ProveResponse = {
  satisfiability: {
    functionDefinitions: boolean,
    inductiveHypothesis?: boolean,
    additionalConstraints?: boolean,
    inductiveBasis?: boolean,
    inductiveStep?: boolean
  },
  counterModel?: {
    parsed: {
      aliases: {
        systemSymbol: string,
        humanReadableSymbol: string,
        type: string,
        index: number,
        instantiation: string
      }[],
      values: {
        [functionName: string]: {
          valueMapping: { [systemSymbol: string]: string},
          elseValue: string,
          inputType: string,
        }
      }

    },
    humanReadable: {
      typing: string,
      constantDefinitions: string,
      functionDefinitions: string[],
    },
    raw: string,
  }
};

