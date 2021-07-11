package eu.gillespie.bscthesis.request

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression
import java.util.LinkedList
import java.lang.StringBuilder
import com.rits.cloning.Cloner
import eu.gillespie.bscthesis.model.InfixOperator
import java.util.function.Predicate

data class StatementTreeVertex(
    var symbol: String,
    var parameters: List<StatementTreeVertex> = LinkedList()
) : SmtV20Expression {

    override fun toSmtV20(): String {
        val sb = StringBuilder()
        if (!parameters.isEmpty()) sb.append("(")
        sb.append(this.symbol)
        if (!parameters.isEmpty()) {
            for (singleParameter in parameters) {
                sb.append(" ")
                sb.append(singleParameter.toSmtV20())
            }
            sb.append(")")
        }
        return sb.toString()
    }

    fun containsOrEquals(tree: StatementTreeVertex): Boolean {
        return this == tree || this.contains(tree)
    }

    operator fun contains(tree: StatementTreeVertex): Boolean {
        return parameters.stream().anyMatch(Predicate { x: StatementTreeVertex -> x.containsOrEquals(tree) })
    }

    fun createClone(): StatementTreeVertex {
        return Cloner().deepClone(this)
    }

    override fun toString(): String {
        val sb = StringBuilder();
        val infixOperator = InfixOperator.byZ3Symbol(symbol)

        if(infixOperator == null)
            sb.append(symbol)

        if(!parameters.isEmpty()) {

            if(infixOperator != null) {
                sb.append(parameters.map { it.toString() }.joinToString(" ${infixOperator.toString()} "))
            } else {
                sb.append("(")
                sb.append(parameters.map { it.toString() }.joinToString(", "))
                sb.append(")")
            }
        }

        return sb.toString()
    }
}