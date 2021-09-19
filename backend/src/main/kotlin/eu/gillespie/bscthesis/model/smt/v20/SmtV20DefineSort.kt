package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression

class SmtV20DefineSort(var name: String) : SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        return java.lang.String.format("(declare-sort %s)", name)
    }
}