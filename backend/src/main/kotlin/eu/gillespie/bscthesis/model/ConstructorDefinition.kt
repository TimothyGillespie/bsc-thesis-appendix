package eu.gillespie.bscthesis.model

data class ConstructorDefinition (
    val term: String,
    val type: String,
    val functions: List<ConstructorFunction>
)
