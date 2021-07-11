package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest

data class ConstructorInstantiation(
    val constructor: String,
    val parameters: List<String>,
    val type: String,
)

fun generateConstructorInstantiation(request: ProveStatementRequest): Map<String, ConstructorInstantiation> {
    val result = HashMap<String, ConstructorInstantiation>()

    request.constructors.forEach {
        val constructor = "%${it.symbol}/${it.arity}"
        val parameters = (1..it.arity).map { count -> "%${constructor}_x${count}" }

        result[it.symbol] = ConstructorInstantiation(constructor, parameters, it.type)
    }

    return result
}