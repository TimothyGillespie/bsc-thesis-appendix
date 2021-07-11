package eu.gillespie.bscthesis.request

data class ConditionalDefinition(
    var condition: StatementTreeVertex,
    var then: StatementTreeVertex
)
