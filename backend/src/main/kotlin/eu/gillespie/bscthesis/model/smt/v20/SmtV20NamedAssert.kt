package eu.gillespie.bscthesis.model.smt.v20

import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20AssertableExpression
import eu.gillespie.bscthesis.model.smt.v20.interfaces.SmtV20Expression

data class SmtV20NamedAssert(
    var name: String? = null,
    var assertion: SmtV20Expression
) : SmtV20AssertableExpression {

    override fun toSmtV20(): String {
        return if (this.name == null) String.format(
            "(assert %s)",
            this.assertion.toSmtV20()
        ) else String.format(
            "(assert ( ! %s :named %s))",
            this.assertion.toSmtV20(),
            this.name
        )
    }
}