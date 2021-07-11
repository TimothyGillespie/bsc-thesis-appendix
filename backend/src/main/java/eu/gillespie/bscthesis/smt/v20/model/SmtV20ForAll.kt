package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression
import eu.gillespie.bscthesis.request.StatementTreeVertex
import java.util.stream.Collectors

data class SmtV20ForAll(
    val expression: SmtV20Expression,
    val bindings: Map<String, String> = mapOf()
) : SmtV20AssertableExpression {
    override fun toSmtV20(): String {
        if (expression !is StatementTreeVertex) return expression.toSmtV20()
        val sortList = bindings.entries.stream()
            .filter { (key) ->
                (expression as StatementTreeVertex).containsOrEquals(
                    StatementTreeVertex(
                        key,
                        emptyList()
                    )
                )
            }
            .map { (key, value) -> String.format("(%s %s)", key, value) }
            .collect(Collectors.joining(" "))
        return String.format("(forall (%s) %s)", sortList, expression.toSmtV20())
    }
}