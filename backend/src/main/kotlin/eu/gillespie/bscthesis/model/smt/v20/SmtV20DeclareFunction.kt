package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression

data class SmtV20DeclareFunction(var name: String, var outputType: AvailableTypes, val parameterTypes: Array<AvailableTypes> = arrayOf()) :
    SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        val parameterTypeString: String = parameterTypes.map { it.smtName }.joinToString(" ")
        return java.lang.String.format(
            "(declare-fun %s (%s) %s)",
            name,
            parameterTypeString,
            outputType.smtName
        )
    }

}