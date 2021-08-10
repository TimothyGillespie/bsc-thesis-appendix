import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import {environment} from "../../../environments/environment";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor(
    private http: HttpClient,
  ) { }

  async prove(request: ProveRequest): Promise<ProveResponse> {
    const response = await this.http.post<any>(environment.baseUrl + '/statement/prove/result', convertKeysToSnakeCase(request)).toPromise();
    return {
      functionDefinitionsSat: response.sat[0],
      inductivePropertiesSat: response.sat[1],
      additionalConstraintSat: response.sat[2],
      inductiveBasisSat: response.sat[3],
      statementProven: !response.sat[4],
    }
  }

}

export type ProveRequest = {
  constructorDefinitions: ConstructorDefinition[],
  statementTree: FunctionTreeNode,
  functionDefinitions: FunctionDefinition[],
  additionalConstraints: AdditionalConstraint[]
}

export type ProveResponse = {
  functionDefinitionsSat: boolean,
  inductivePropertiesSat: boolean,
  additionalConstraintSat: boolean,
  inductiveBasisSat: boolean,
  statementProven: boolean,
};
