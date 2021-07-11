package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression
import eu.gillespie.bscthesis.smt.v20.model.SmtV20File
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DeclareFunction
import eu.gillespie.bscthesis.smt.v20.model.SmtV20DefineSort
import lombok.Getter
import lombok.Setter
import lombok.experimental.Accessors
import java.lang.StringBuilder
import java.util.LinkedList

class SmtV20File(
    var produceUnsatCores: Boolean = false,
    var smtCoreMinimize: Boolean = false,
    var topLevelExpressions: MutableList<SmtV20TopLevelExpression> = LinkedList(),
) : SmtV20Expression {

    fun declareFunction(name: String?, outputType: String?, vararg parameterTypes: String?): SmtV20File {
        this.topLevelExpressions.add(SmtV20DeclareFunction(name, outputType, *parameterTypes))
        return this
    }

    fun defineSort(name: String?): SmtV20File {
        this.topLevelExpressions.add(SmtV20DefineSort(name))
        return this
    }

    fun addTopLevelExpression(topLevelExpression: SmtV20TopLevelExpression): Boolean {
        return this.topLevelExpressions.add(topLevelExpression)
    }

    override fun toSmtV20(): String {
        val sb = StringBuilder()
        sb.append(String.format(optionTemplate, ":produce-unsat-cores", this.produceUnsatCores.toString()))
        sb.append(String.format(optionTemplate, ":smt.core.minimize", this.smtCoreMinimize.toString()))
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