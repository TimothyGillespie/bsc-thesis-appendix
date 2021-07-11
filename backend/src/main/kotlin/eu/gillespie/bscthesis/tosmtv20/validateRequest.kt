package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ConstructorFunction
import eu.gillespie.bscthesis.request.FunctionDefinition
import eu.gillespie.bscthesis.request.ProveStatementRequest
import java.lang.RuntimeException

fun validateRequest(request: ProveStatementRequest) {
    // This is the current scope; constructors are still defined as List as we might want to allow multiple later
    validateExactlyOneConstructorDefinitionsExists(request)
    request.constructors.forEach { validateSingleConstructorDefinition(it, request) }

    validateFunctionAndConstructorDefinitionsAreUnique(request)
    request.functionDefinitions.forEach { validateSingleFunctionDefinition(it, request) }
}

fun validateExactlyOneConstructorDefinitionsExists(request: ProveStatementRequest) {
    if(request.constructors.size != 1)
        throw RuntimeException("Only the case for exactly one defined constructor is supported!")
}

fun validateSingleConstructorDefinition(constructorDefinition: ConstructorFunction, request: ProveStatementRequest) {
    // no conditions yet
}

fun validateFunctionAndConstructorDefinitionsAreUnique(request: ProveStatementRequest) {
    val set = request.functionDefinitions.map { it.name }.toMutableSet()
    set.addAll(request.constructors.map { it.symbol })

    if(set.size != request.functionDefinitions.size + request.constructors.size)
        throw RuntimeException("Function and/or constructor definitions are duplicated! (There may only be one function of each name)")
}

fun validateSingleFunctionDefinition(functionDefinition: FunctionDefinition, request: ProveStatementRequest) {
    validateFunctionsWithConstructorInputAreFlat(functionDefinition)
    validateInputConstructorIsDefined(functionDefinition, request)
    validateArityOfInputTypesAndInputVariablesIsEqual(functionDefinition)
    validateOnlyInputConstructorOrInputVariablesIsDefined(functionDefinition)
}

fun validateFunctionsWithConstructorInputAreFlat(functionDefinition: FunctionDefinition) {
    if(!hasInputConstructor(functionDefinition))
        return

    if(functionDefinition.inputTypes.size != 1)
        throw RuntimeException("The defined function ${functionDefinition.name}/${functionDefinition.arity} must have arity 1, because it uses an input constructor")

}

fun validateInputConstructorIsDefined(functionDefinition: FunctionDefinition, request: ProveStatementRequest) {
    if(!hasInputConstructor(functionDefinition))
        return

    val inputConstructor = functionDefinition.definition!!.inputConstructor

    val found = request.constructors.find {
        inputConstructor?.name == it.symbol
                && inputConstructor.arity == it.arity
                && functionDefinition.inputTypes.first() == it.type
    }

    if(found == null)
        throw RuntimeException("The constructor ${inputConstructor?.name}/${inputConstructor?.arity} of type ${functionDefinition.inputTypes.first()} is not defined")
}

fun validateArityOfInputTypesAndInputVariablesIsEqual(functionDefinition: FunctionDefinition) {
    if(!hasInputVariables(functionDefinition))
        return

    if(functionDefinition.definition!!.inputVariable!!.size != functionDefinition.inputTypes.size)
        throw RuntimeException("The defined function ${functionDefinition.name}/${functionDefinition.arity} has a different arity than it's input variables (arity ${functionDefinition.definition!!.inputVariable!!.size})")
}

fun validateOnlyInputConstructorOrInputVariablesIsDefined(functionDefinition: FunctionDefinition) {
    if(hasInputVariables(functionDefinition) && hasInputConstructor(functionDefinition))
        throw RuntimeException("Function definition for ${functionDefinition.name}/${functionDefinition.arity} contains both input_constructor and input_variables. It may use at most one.")
}