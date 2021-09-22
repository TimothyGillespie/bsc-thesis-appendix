package eu.gillespie.bscthesis.model

class ProveStatementRequest (
    var constructorDefinitions: List<ConstructorDefinition> = listOf(),
    var statementTree: StatementTreeVertex,
    var functionDefinitions: List<FunctionDefinition>,
    val additionalConstraints: List<AdditionalConstraint> = listOf()
)