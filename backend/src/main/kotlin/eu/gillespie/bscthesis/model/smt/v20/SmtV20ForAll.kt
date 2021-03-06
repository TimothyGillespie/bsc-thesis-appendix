package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20AssertableExpression
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20Expression
import eu.gillespie.bscthesis.model.StatementTreeVertex
import java.util.stream.Collectors

data class SmtV20ForAll(
    val expression: SmtV20Expression,
    val bindings: Map<String, AvailableTypes> = mapOf()
) : SmtV20AssertableExpression {
    override fun toSmtV20(): String {
        if (expression !is StatementTreeVertex) return expression.toSmtV20()
        val sortList = bindings.entries.stream()
            .filter { (key) ->
                expression.containsOrEquals(
                    StatementTreeVertex(
                        key,
                        emptyList()
                    )
                )
            }
            .map { (key, value) -> String.format("(%s %s)", key, value.smtName) }
            .collect(Collectors.joining(" "))

        if(sortList.isBlank())
            return expression.toSmtV20()
        else
            return String.format("(forall (%s) %s)", sortList, expression.toSmtV20())
    }
}