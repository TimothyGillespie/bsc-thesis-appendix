package eu.gillespie.bscthesis.smt.v20.model

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression

class SmtV20GetProof : SmtV20TopLevelExpression {
    override fun toSmtV20(): String {
        return "(get-proof)"
    }
}