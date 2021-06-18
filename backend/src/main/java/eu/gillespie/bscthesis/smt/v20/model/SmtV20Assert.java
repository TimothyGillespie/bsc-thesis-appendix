package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class SmtV20Assert implements SmtV20AssertableExpression {

    String name = null;
    String assertion = null;

    @Override
    public String toSmtV20() {
        if(this.getName() == null)
            return String.format("(assert %s)", this.getAssertion());

        return String.format("(assert (%s) :named %s)", this.getAssertion(), this.getName());
    }

}
