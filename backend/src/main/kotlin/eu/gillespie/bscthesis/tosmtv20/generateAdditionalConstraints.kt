package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.model.AdditionalConstraint
import eu.gillespie.bscthesis.model.ProveStatementRequest
import eu.gillespie.bscthesis.model.smt.v20.SmtV20ForAll
import eu.gillespie.bscthesis.model.smt.v20.SmtV20NamedAssert
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression

fun generateAdditionalConstraints(request: ProveStatementRequest): List<SmtV20TopLevelExpression> {
    return (request.additionalConstraints ?: listOf()).mapIndexed { index, constraint -> generateAdditionalConstraint(constraint, index) }
}

fun generateAdditionalConstraint(additionalConstraint: AdditionalConstraint, number: Int? = null): SmtV20TopLevelExpression {
    return SmtV20NamedAssert(
        if (number == null) null else "additionalConstraint${number}",
        SmtV20ForAll(
            additionalConstraint.constraint,
            additionalConstraint.input_variables
        )
    )
}