package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@RequiredArgsConstructor
public class SmtV20NamedAssert implements SmtV20AssertableExpression {


    String name = null;
    @NonNull SmtV20Expression assertion;

    private SmtV20NamedAssert() {}

    @Override
    public String toSmtV20() {
        if(this.getName() == null)
            return String.format("(assert %s)", this.getAssertion().toSmtV20());

        return String.format("(assert ( ! %s :named %s))", this.getAssertion().toSmtV20(), this.getName());
    }

}
