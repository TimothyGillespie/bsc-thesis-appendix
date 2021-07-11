package eu.gillespie.bscthesis.tosmtv20

import eu.gillespie.bscthesis.request.ProveStatementRequest
import eu.gillespie.bscthesis.request.StatementTreeVertex
import eu.gillespie.bscthesis.smt.v20.model.SmtV20NamedAssert
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression

fun generateStatementToProof(request: ProveStatementRequest): SmtV20TopLevelExpression {
    return SmtV20NamedAssert(
        "statementToProve",
        StatementTreeVertex(
            "not",
            listOf(request.statementTree)
        )
    )
}