package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression

data class SmtV20DeclareFunction(var name: String, var outputType: String, val parameterTypes: Array<String> = arrayOf()) :
    SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        val parameterTypeString: String = parameterTypes.joinToString(" ")
        return java.lang.String.format(
            "(declare-fun %s (%s) %s)",
            name,
            parameterTypeString,
            outputType
        )
    }

}