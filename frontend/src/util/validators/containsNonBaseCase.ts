import {FormArray, FormGroup, ValidatorFn} from "@angular/forms";
import {ConstructorFunctionDefinition} from "../../app/models/ConstructorDefinition";

const containsNonBaseCase = (): ValidatorFn => {
  return (control) => {
    if(control instanceof FormArray) {
      const nonBaseCase = control.value.find((consFunction: ConstructorFunctionDefinition) => consFunction.arity !== 0)
      if(nonBaseCase == null)
        return {noNonBaseCase: {
            message: 'Non base case is missing (arity > 0)',
          }}
    }

    return null
  }
}

export default containsNonBaseCase;
