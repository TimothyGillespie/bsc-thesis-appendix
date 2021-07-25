import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FunctionDefinition} from "../../models/FunctionDefinition";
import {FunctionTreeNode} from "../../../util/Formulae/formula";
import {ConstructorDefinition} from "../../models/ConstructorDefinition";

@Component({
  selector: 'app-function-definitions',
  templateUrl: './function-definitions.component.html',
  styleUrls: ['./function-definitions.component.scss']
})
export class FunctionDefinitionsComponent implements OnInit {

  @Input() statementTree!: FunctionTreeNode;
  @Input() constructorDefinitions: ConstructorDefinition[];
  @Output() onFinish: EventEmitter<FunctionDefinition[]> = new EventEmitter();

  functionDefinitions: FunctionDefinition[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent() {
    this.onFinish.emit(this.functionDefinitions);
  }

}
