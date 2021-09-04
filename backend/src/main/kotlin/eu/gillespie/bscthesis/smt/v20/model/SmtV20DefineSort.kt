package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression

class SmtV20DefineSort(var name: String) : SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        return java.lang.String.format("(declare-sort %s)", name)
    }
}