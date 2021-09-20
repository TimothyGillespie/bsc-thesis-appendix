package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.information.AvailableTypes
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression

class SmtV20DefineSort(var type: AvailableTypes) : SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        return java.lang.String.format("(declare-sort %s)", type.smtName)
    }
}