package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.ProveStatementRequest
import java.lang.RuntimeException

fun extractAllTypes(request: ProveStatementRequest): Set<AvailableTypes> {
    val result = HashSet<AvailableTypes>()
    result.addAll(request.constructorDefinitions.map { it.type })

    request.functionDefinitions.forEach {
        result.addAll(it.inputTypes)
        result.add(it.outputType)
    }

    return result
}

fun extractAllCustomTypes(request: ProveStatementRequest)
    = extractAllTypes(request).filter { !it.smtNative }


fun getInputConstructor(definition: DefinitionWithDetails, request: ProveStatementRequest): ConstructorFunctionWithDetails? {
    if(definition !is InputConstructorDefinitionWithDetails)
        return null

    val result = getListOfConstructorFunctionsWithDetails(request).find {
        definition.inputConstructor.name  == it.symbol
        && definition.inputConstructor.arity  == it.arity
        && definition.details.inputTypes.first() == it.type
    }

    if(result == null)
        throw RuntimeException("The constructor ${definition.inputConstructor.name}/${definition.inputConstructor.arity} of type ${definition.details.inputTypes.first()} is not defined")

    return result
}