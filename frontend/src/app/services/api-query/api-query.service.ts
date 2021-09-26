import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {environment} from "../../../environments/environment";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";
import {first, map} from "rxjs/operators";
import convertKeysToCamelCase from "../../../util/convertKeysToCamelCase";
import {snakeCase} from "lodash";
import {Observable} from "rxjs";
import TypeLabelValue from "../../models/LabelValue";

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

  getTypes(): Observable<TypeLabelValue[]> {
    return this.http.get(environment.baseUrl + "/statement/types")
      .pipe(
        first(),
        map((value) => convertKeysToCamelCase(value)),
        map((values: TypeResponse[]) => values.map((entry) => ({
          label: entry.displayName,
          value: entry.smtName,
          smtNative: entry.smtNative,
        }))),
      )

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

type TypeResponse = {
  smtName: string,
  displayName: string,
  smtNative: boolean,
}
