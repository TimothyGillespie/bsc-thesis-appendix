import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {environment} from "../../../environments/environment";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";
import {first, map, timeout} from "rxjs/operators";
import convertKeysToCamelCase from "../../../util/convertKeysToCamelCase";
import {snakeCase} from "lodash";
import {Observable} from "rxjs";
import TypeLabelValue from "../../models/LabelValue";
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  async prove(request: ProveRequest): Promise<ProveResponse> {
     return this.http
       .post<ProveResponse>(this.config.obtainedConfig.apiUrl + '/statement/prove/result', convertKeysToSnakeCase(request))
       .pipe(
         timeout(10000),
         map((response) => convertKeysToCamelCase(response))
       )
       .toPromise();
  }

  getTypes(): Observable<TypeLabelValue[]> {
    return this.http.get(this.config.obtainedConfig.apiUrl + "/statement/types")
      .pipe(
        timeout(10000),
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
  additionalConstraints: {
    inputVariables: { [variable: string]: string };
    constraint: FunctionTreeNode;
  }[]
}

export type ProveResponse = {
  satisfiability: {
    functionDefinitions: string,
    inductiveHypothesis?: string,
    additionalConstraints?: string,
    inductiveBasis?: string,
    inductiveStep?: string,
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
