package eu.gillespie.bscthesis.request

import eu.gillespie.bscthesis.model.ConstructorDefinition

class ProveStatementRequest (
    var constructorDefinitions: List<ConstructorDefinition>,
    var statementTree: StatementTreeVertex,
    var functionDefinitions: List<FunctionDefinition>,
    val additionalConstraints: List<AdditionalConstraint>
)