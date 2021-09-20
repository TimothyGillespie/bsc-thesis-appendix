package eu.gillespie.bscthesis.model

import eu.gillespie.bscthesis.information.AvailableTypes

data class AdditionalConstraint(
    val constraint: StatementTreeVertex,
    val input_variables: Map<String, AvailableTypes> = mapOf()
)
