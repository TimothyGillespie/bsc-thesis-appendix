package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmtV20Assert implements SmtV20TopLevelExpression {

    String name = null;
    SmtV20AssertableExpression assertion = null;

    @Override
    public String toSmtV20() {
        if(this.getName() == null)
            return String.format("(assert %s)", this.getAssertion().toSmtV20());

        return String.format("(assert (%s) :named %s)", this.getAssertion().toSmtV20(), this.getName());
    }
}
