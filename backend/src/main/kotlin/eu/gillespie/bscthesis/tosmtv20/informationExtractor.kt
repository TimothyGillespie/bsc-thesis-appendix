package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ConstructorFunction
import eu.gillespie.bscthesis.request.FunctionDefinition
import eu.gillespie.bscthesis.request.ProveStatementRequest
import java.lang.RuntimeException

val predefinedTypes = setOf("Int", "Real", "Bool")

fun extractAllTypes(request: ProveStatementRequest): Set<String> {
    val result = HashSet<String>()
    result.addAll(request.constructors.map { it.type })

    request.functionDefinitions.forEach {
        result.addAll(it.inputTypes)
        result.add(it.outputType)
    }

    return result
}

fun extractAllCustomTypes(request: ProveStatementRequest)
    = extractAllTypes(request).filter { !predefinedTypes.contains(it) }


fun getInputConstructor(functionDefinition: FunctionDefinition, request: ProveStatementRequest): ConstructorFunction? {
    if(functionDefinition.definition == null)
        return null

    if(functionDefinition.definition!!.inputConstructor == null)
        return null

    val result = request.constructors.find {
        functionDefinition.definition!!.inputConstructor?.name  == it.symbol
        && functionDefinition.definition!!.inputConstructor?.arity  == it.arity
        && functionDefinition.inputTypes.first() == it.type
    }

    if(result == null)
        throw RuntimeException("The constructor ${functionDefinition.definition!!.inputConstructor?.name}/${functionDefinition.definition!!.inputConstructor?.arity} of type ${functionDefinition.inputTypes.first()} is not defined")

    return result
}