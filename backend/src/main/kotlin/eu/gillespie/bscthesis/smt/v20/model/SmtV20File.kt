package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import java.lang.StringBuilder
import java.util.LinkedList

class SmtV20File(
    var produceUnsatCores: Boolean = false,
    var smtCoreMinimize: Boolean = false,
    var produceProof: Boolean = false,
    var produceModels: Boolean = false,
    var topLevelExpressions: MutableList<SmtV20TopLevelExpression> = LinkedList(),
) : SmtV20Expression {
    override fun toSmtV20(): String {
        val sb = StringBuilder()
        sb.append("(set-logic ALL)\n")
        sb.append(String.format(optionTemplate, ":produce-unsat-cores", this.produceUnsatCores.toString()))
        sb.append(String.format(optionTemplate, ":smt.core.minimize", this.smtCoreMinimize.toString()))
        sb.append(String.format(optionTemplate, ":produce-proofs", this.produceProof.toString()))
        sb.append(String.format(optionTemplate, ":produce-models", this.produceProof.toString()))
        for (singleTopLevelExpression in topLevelExpressions) sb.append(singleTopLevelExpression.toSmtV20())
            .append("\n")
        sb.append("(exit)")
        return sb.toString()
    }

    companion object {
        private const val optionTemplate = "(set-option %s %s)\n"
    }

    init {
        this.topLevelExpressions = LinkedList<SmtV20TopLevelExpression>()
    }
}