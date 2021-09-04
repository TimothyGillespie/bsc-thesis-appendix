package eu.gillespie.bscthesis.request

data class AdditionalConstraint(
    val constraint: StatementTreeVertex,
    val input_variables: Map<String, String> = mapOf()
)
