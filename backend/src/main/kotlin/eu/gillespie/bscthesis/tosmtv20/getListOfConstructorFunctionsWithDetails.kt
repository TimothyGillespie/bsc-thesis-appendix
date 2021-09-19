package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.ConstructorDefinition
import eu.gillespie.bscthesis.model.ProveStatementRequest

fun getListOfConstructorFunctionsWithDetails(request: ProveStatementRequest): List<ConstructorFunctionWithDetails> {
    return request.constructorDefinitions.map { convertConstructorDefinitionToConstructorFunctionWithDetails(it) }.flatten();
}

fun convertConstructorDefinitionToConstructorFunctionWithDetails(definition: ConstructorDefinition): List<ConstructorFunctionWithDetails> {
    return definition.functions.map { ConstructorFunctionWithDetails(it.symbol, it.arity, definition.term, definition.type) }
}

data class ConstructorFunctionWithDetails(
    val symbol: String,
    val arity: Int,
    val term: String,
    val type: String
)