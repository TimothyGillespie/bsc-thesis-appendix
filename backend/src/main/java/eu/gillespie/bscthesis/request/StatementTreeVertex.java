package eu.gillespie.bscthesis.request;

import eu.gillespie.bscthesis.smt.v20.model.interfaces.SmtV20Expression;
import lombok.*;
import lombok.experimental.Delegate;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@ToString
@Getter
@Setter
@AllArgsConstructor
public class StatementTreeVertex implements SmtV20Expression {
    @NonNull String symbol;

    @Delegate
    @NonNull List<StatementTreeVertex> parameters;

    public StatementTreeVertex(String symbol) {
        this.symbol = symbol;
        this.parameters = new LinkedList<>();
    }

    @Override
    public String toSmtV20() {
        StringBuilder sb = new StringBuilder();

        if(!getParameters().isEmpty())
            sb.append("(");

        sb.append(this.getSymbol());

        if(!getParameters().isEmpty()) {
            for (StatementTreeVertex singleParameter : this.getParameters()) {
                sb.append(" ");
                sb.append(singleParameter.toSmtV20());
            }
            sb.append(")");
        }

        return sb.toString();
    }
}
