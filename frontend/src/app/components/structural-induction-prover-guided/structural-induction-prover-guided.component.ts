import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {FunctionDefinition} from "../../models/FunctionDefinition";

@Component({
  selector: 'app-structural-induction-prover-guided',
  templateUrl: './structural-induction-prover-guided.component.html',
  styleUrls: ['./structural-induction-prover-guided.component.scss']
})
export class StructuralInductionProverGuidedComponent implements OnInit {
  constructor() { }

  loading = false;

  phase: 'constructorDefinitions' | 'statement' | 'functionDefinitions' | 'additionalConstraints';

  constructorDefinitions?: ConstructorDefinition[];
  statement?: string;
  statementTree?: FunctionTreeNode;
  functionDefinitions?: FunctionDefinition[];

  ngOnInit(): void {
    // this.phase = 'constructorDefinitions';
    this.phase = 'functionDefinitions';
    this.statementTree = getFunctionTree("depth(t) <= size(t)");
    this.constructorDefinitions = [
      {term: 't', type: 'NAryTree', functions: [
          {symbol: 'cBase', arity: 0},
          {symbol: 'c1', arity: 1},
          {symbol: 'c2', arity: 2},
          {symbol: 'c3', arity: 3},
          {symbol: 'c4', arity: 4},
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
}
