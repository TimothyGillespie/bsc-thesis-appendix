package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ConstructorDefinition
import eu.gillespie.bscthesis.model.ProveStatementRequest
import java.lang.RuntimeException

fun validateRequest(request: ProveStatementRequest) {
    request.constructorDefinitions.forEach { validateSingleConstructorDefinition(it, request) }

    validateFunctionAndConstructorDefinitionsAreUnique(request)

    getListOfAllDefinitionsWithDetails(request).forEach { validateSingleFunctionDefinition(it, request) }
    validateOnlyInputConstructorOrInputVariablesIsDefined(request)
}

fun validateSingleConstructorDefinition(constructorDefinition: ConstructorDefinition, request: ProveStatementRequest) {
    // no conditions yet
}

fun validateFunctionAndConstructorDefinitionsAreUnique(request: ProveStatementRequest) {
    val set = request.functionDefinitions.map { it.name }.toMutableSet()
    val constructorFunctions = getListOfConstructorFunctionsWithDetails(request)
    set.addAll(constructorFunctions.map { it.symbol })

    if(set.size != request.functionDefinitions.size + constructorFunctions.size)
        throw RuntimeException("Function and/or constructor definitions are duplicated! (There may only be one function of each name)")
}

fun validateSingleFunctionDefinition(definition: DefinitionWithDetails, request: ProveStatementRequest) {
    validateFunctionsWithConstructorInputAreFlat(definition)
    validateInputConstructorIsDefined(definition, request)
    validateArityOfInputTypesAndInputVariablesIsEqual(definition)
}

fun validateFunctionsWithConstructorInputAreFlat(definition: DefinitionWithDetails) {
    if(definition !is InputConstructorDefinitionWithDetails)
        return

    if(definition.details.inputTypes.size != 1)
        throw RuntimeException("The defined function ${definition.details.name}/${definition.details.arity} must have arity 1, because it uses an input constructor")

}

fun validateInputConstructorIsDefined(definition: DefinitionWithDetails, request: ProveStatementRequest) {
    if(definition !is InputConstructorDefinitionWithDetails)
        return

    val found = getInputConstructor(definition, request)

    if(found == null)
        throw RuntimeException("The constructor ${definition.inputConstructor.name}/${definition.inputConstructor.arity} of type ${definition.details.inputTypes.first()} is not defined")
}

fun validateArityOfInputTypesAndInputVariablesIsEqual(definition: DefinitionWithDetails) {
    if(definition !is InputVariablesDefinitionWithDetails)
        return

    if(definition.inputVariables.size != definition.details.inputTypes.size)
        throw RuntimeException("The defined function ${definition.details.name}/${definition.details.arity} has a different arity than it's input variables (arity ${definition.inputVariables.size})")
}

fun validateOnlyInputConstructorOrInputVariablesIsDefined(request: ProveStatementRequest) {
    request.functionDefinitions.forEach { functionDefinition ->
        functionDefinition.definition.forEachIndexed { index, definition ->
            if (definition.inputConstructor != null && definition.inputVariable != null)
               throw RuntimeException("The ${index + 1}. definition for ${functionDefinition.name}/${functionDefinition.arity} contains both input_constructor and input_variables. It may use at most one.")
        }
    }
}