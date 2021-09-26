import {getFunctionTree} from "../Formulae/getFunctionTree/getFunctionTree";

import {FormArray, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {ConstructorFunctionDefinition} from "../../app/models/ConstructorDefinition";

const isTreeableStatement = (): ValidatorFn => {
  return (control) => {
    if(control instanceof FormControl) {
      const statement = control.value;
      if(statement == null || statement.trim() === '') {
        return {
          treeableStatement: {
            message: 'Please enter a formula.',
          }
        };
      }

      let countOpen = 0
      let countClosed = 0
      for(const c of statement) {
        if(c === '(')
          countOpen++;

        if(c === ')')
          countClosed++;
      }

      if(countOpen != countClosed) {
        return {
          treeableStatement: {
            message: `Please check your parenthesis. The amount of opening parenthesis (${countOpen}) does not match the number of closing parenthesis (${countClosed})`
          }
        };
      }


      try {
        getFunctionTree(statement);
      } catch (e) {
        return {
          treeableStatement: {
            message: 'The statement could not be parsed, please check if it looks correct.'
          }
        }
      }

    }

    return null
  }
}

export default isTreeableStatement;

