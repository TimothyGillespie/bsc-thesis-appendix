import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import getIdentifiersFromFunctionTree
  from "../../../util/Formulae/getIdentifiersFromFunctionTree/getIdentifiersFromFunctionTree";

@Component({
  selector: 'app-statement-entering',
  templateUrl: './statement-entering.component.html',
  styleUrls: ['./statement-entering.component.scss']
})
export class StatementEnteringComponent implements OnInit {

  allowedValuesForFormulae = /^[A-Za-z0-9\\(\\),\\*\\+-= ]+$/;
  statementTree: FunctionTreeNode = null;
  functions = null;

  statement?: string = null;
  @Output() onFinish: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFinishHandler() {
    this.onFinish.emit(this.statement);
  }

  changeHandler() {
    // debugging
    this.statementTree = getFunctionTree(this.statement);
    this.functions = getIdentifiersFromFunctionTree(this.statementTree);
  }
}
