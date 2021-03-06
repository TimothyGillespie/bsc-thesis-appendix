package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.ProveStatementRequest

data class ConstructorInstantiation(
    val constructor: String,
    val parameters: List<String>,
    val type: AvailableTypes,
)

fun generateConstructorInstantiation(request: ProveStatementRequest): Map<String, ConstructorInstantiation> {
    val result = HashMap<String, ConstructorInstantiation>()

    request.constructorDefinitions.forEach { constructorDefinition ->
        constructorDefinition.functions.forEach {
            val constructor = "%${it.symbol}/${it.arity}"
            val parameters = (1..it.arity).map { count -> "%${constructor}_x${count}" }

            result[it.symbol] = ConstructorInstantiation(constructor, parameters, constructorDefinition.type)
        }
    }

    return result
}