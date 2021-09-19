package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20TopLevelExpression

class SmtV20GetModel: SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        return "(get-model)"
    }
}