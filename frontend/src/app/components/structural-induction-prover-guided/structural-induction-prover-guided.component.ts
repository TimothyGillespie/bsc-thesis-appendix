import { Component, OnInit } from '@angular/core';
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {AdditionalConstraint} from "../../models/AdditionalConstraint";
import convertKeysToSnakeCase from "../../../util/convertKeysToSnakeCase";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-structural-induction-prover-guided',
  templateUrl: './structural-induction-prover-guided.component.html',
  styleUrls: ['./structural-induction-prover-guided.component.scss']
})
export class StructuralInductionProverGuidedComponent implements OnInit {
  constructor(private http: HttpClient) { }

  loading = false;

  phase: 'constructorDefinitions' | 'statement' | 'functionDefinitions' | 'additionalConstraints' | 'result';

  constructorDefinitions?: ConstructorDefinition[];
  statement?: string;
  statementTree?: FunctionTreeNode;
  functionDefinitions?: FunctionDefinition[];
  additionalConstraints?: AdditionalConstraint[];

  ngOnInit(): void {
    // this.phase = 'constructorDefinitions';
    this.phase = 'functionDefinitions';
    this.statementTree = getFunctionTree("depth(t) <= size(t)");
    this.constructorDefinitions = [
      {term: 't', type: 'NAryTree', functions: [
          {symbol: 'cBase', arity: 0},
          // {symbol: 'c1', arity: 1},
          {symbol: 'c2', arity: 2},
          // {symbol: 'c3', arity: 3},
          // {symbol: 'c4', arity: 4},
        ]
      }
    ]
  }

  finishConstructorDefinition(constructorDefinitions: ConstructorDefinition[]): void {
    this.loading = true;
    this.constructorDefinitions = constructorDefinitions;
    this.loading = false;
    this.phase = 'statement';
  }

  finishStatementEntering(statement: string) {
    this.loading = true;
    this.statement = statement;
    this.statementTree = getFunctionTree(statement);
    this.loading = false;
    this.phase = 'functionDefinitions';
  }

  finishFunctionDefinition(functionDefinitions: FunctionDefinition[]) {
    this.loading = true;
    this.functionDefinitions = functionDefinitions;
    this.loading = false;
    this.phase = 'additionalConstraints';
  }

  finishAdditionalConstraintEntering(additionalConstraintEntering: AdditionalConstraint[]) {
    this.loading = true;
    this.additionalConstraints = additionalConstraintEntering;
    const request = convertKeysToSnakeCase({
      constructorDefinitions: this.constructorDefinitions,
      statementTree: this.statementTree,
      functionDefinitions: this.functionDefinitions,
      additionalConstraints: this.additionalConstraints,
    });

    this.http.post(environment.baseUrl + '/api/v1/statement/prove/result', request).subscribe((x) => console.log(x));

    this.phase = 'result';
  }
}
