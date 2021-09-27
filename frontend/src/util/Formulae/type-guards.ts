import {FunctionTreeNode} from "./formula";
import {ConstructorDefinition, ConstructorFunctionDefinition} from "../../app/models/ConstructorDefinition";

export function isFunctionTreeNode(maybe: any): maybe is FunctionTreeNode {
  const node = maybe as FunctionTreeNode;
  return typeof node.symbol === 'string'
    && typeof node.parameters === 'object'
    && node.parameters.every((child) => isFunctionTreeNode(child));

}

export function isConstructorDefinition(maybe: any): maybe is ConstructorDefinition {
  const def = maybe as ConstructorDefinition;
  return typeof def.term === 'string' &&
    typeof def.type === 'string' &&
    def.functions.every(isConstructorFunctionDefinition)
}

export function isConstructorFunctionDefinition(maybe: any): maybe is ConstructorFunctionDefinition {
  const def = maybe as ConstructorFunctionDefinition;
  return typeof def.symbol === 'string'
    && typeof def.arity === 'number';
}
