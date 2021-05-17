package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20TopLevelExpression;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmtV20DefineSort implements SmtV20TopLevelExpression {

    String name;

    public SmtV20DefineSort(String name) {
        this.name = name;
    }

    @Override
    public String toSmtV20() {
        return String.format("(define-sort %s)", this.getName());
    }
}
