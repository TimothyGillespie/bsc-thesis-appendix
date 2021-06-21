package eu.gillespie.bscthesis.smt.v20.model;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20AssertableExpression;
import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@RequiredArgsConstructor
public class SmtV20ForAll implements SmtV20AssertableExpression {
    @NonNull SmtV20Expression expression;
    Map<String, String> bindings;

    public String toSmtV20() {
        if(bindings == null)
            return expression.toSmtV20();

        String sortList = bindings.entrySet().stream().map((entry) -> String.format("(%s %s)", entry.getKey(), entry.getValue())).collect(Collectors.joining(" "));
        return String.format("(forall (%s) %s)", sortList,expression.toSmtV20());
    }
}
