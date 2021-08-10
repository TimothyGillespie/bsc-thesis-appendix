import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {getFunctionTree} from "../../../util/Formulae/getFunctionTree/getFunctionTree";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import getIdentifiersFromFunctionTree
  from "../../../util/Formulae/getIdentifiersFromFunctionTree/getIdentifiersFromFunctionTree";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {RequestDataService} from "../../services/request-data-service/request-data.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-statement-entering',
  templateUrl: './statement-entering.component.html',
  styleUrls: ['./statement-entering.component.scss']
})
export class StatementEnteringComponent implements OnInit {

  allowedValuesForFormulae = environment.allowedFormulaInput;
  statementTree: FunctionTreeNode = null;
  functions = null;

  statement?: string = null;

  constructor(private router: Router, private requestData: RequestDataService) { }

  ngOnInit(): void {
    this.requestData.statementString.pipe(first()).subscribe((initialValue) => {
      if(initialValue !== undefined)
        this.statement = initialValue;
    })
  }

  onFinish() {
    this.requestData.statementString.next(this.statement);
    this.router.navigate(['function-definitions']);
    // this.onFinish.emit(this.statement);
  }

  onBack() {
    this.requestData.statementString.next(this.statement);
    this.router.navigate(['constructor-definitions'])
  }

  changeHandler() {
    // debugging
    this.statementTree = getFunctionTree(this.statement);
    this.functions = getIdentifiersFromFunctionTree(this.statementTree);
  }
}
