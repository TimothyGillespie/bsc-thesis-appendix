package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ProveStatementRequest
import java.lang.RuntimeException

val predefinedTypes = setOf("Int", "Real", "Bool")

fun extractAllTypes(request: ProveStatementRequest): Set<String> {
    val result = HashSet<String>()
    result.addAll(request.constructorDefinitions.map { it.type })

    request.functionDefinitions.forEach {
        result.addAll(it.inputTypes)
        result.add(it.outputType)
    }

    return result
}

fun extractAllCustomTypes(request: ProveStatementRequest)
    = extractAllTypes(request).filter { !predefinedTypes.contains(it) }


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