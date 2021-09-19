package eu.gillespie.bscthesis.model

data class AdditionalConstraint(
    val constraint: StatementTreeVertex,
    val input_variables: Map<String, String> = mapOf()
)
