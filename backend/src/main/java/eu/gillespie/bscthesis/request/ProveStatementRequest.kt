package eu.gillespie.bscthesis.request

import eu.gillespie.bscthesis.model.ConstructorFunction
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.request.FunctionDefinition

class ProveStatementRequest (
    var constructors: List<ConstructorFunction>,
    var statementTree: StatementTreeVertex,
    var functionDefinitions: List<FunctionDefinition>,
    val additionalConstraints: List<AdditionalConstraint>
)