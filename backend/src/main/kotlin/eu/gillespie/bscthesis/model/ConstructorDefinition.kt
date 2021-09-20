package eu.gillespie.bscthesis.model

import eu.gillespie.bscthesis.information.AvailableTypes

data class ConstructorDefinition (
    val term: String,
    val type: AvailableTypes,
    val functions: List<ConstructorFunction>
)
