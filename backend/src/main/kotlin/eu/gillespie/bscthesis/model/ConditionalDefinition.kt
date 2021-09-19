package eu.gillespie.bscthesis.model

data class ConditionalDefinition(
    var condition: StatementTreeVertex,
    var then: StatementTreeVertex
)
