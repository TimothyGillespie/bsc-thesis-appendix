package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.AdditionalConstraint
import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.smt.v20.model.SmtV20ForAll
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression

fun generateAdditionalConstraints(request: ProveStatementRequest): List<SmtV20TopLevelExpression> {
    return request.additionalConstraints.map { generateAdditionalConstraint(it) }
}

fun generateAdditionalConstraint(additionalConstraint: AdditionalConstraint): SmtV20TopLevelExpression {
    return SmtV20NamedAssert(
        null,
        SmtV20ForAll(
            additionalConstraint.constraint,
            additionalConstraint.input_variables
        )
    )
}