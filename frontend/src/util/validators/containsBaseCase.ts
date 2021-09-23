import {FormArray, FormGroup, ValidatorFn} from "@angular/forms";
import {ConstructorFunctionDefinition} from "../../app/models/ConstructorDefinition";

const containsBaseCase = (): ValidatorFn => {
  return (control) => {
    if(control instanceof FormArray) {
      const baseCase = control.value.find((consFunction: ConstructorFunctionDefinition) => consFunction.arity === 0)
      console.log(baseCase)
      if(baseCase == null)
        return { noBaseCase: {
          message: 'Base case is missing (arity = 0)',
        }
      }
    }

    console.log(control)
    return null
  }
}

export default containsBaseCase;
